#!/bin/bash

DEPLOY_PATH=""
DEPLOYTO=""

SKIP_FRESHNESS=0
BLOCK_ONLY=0
COPY_WHICH=""
DRY_RUN=0
DRY_FLAG=""

while [ $# -gt 0 ]; do
  case $1 in
  --environment)
    # `shift 2` with only one positional left FAILS and shifts NOTHING, so the
    # enclosing `while [ $# -gt 0 ]` spins forever. A hung deploy script reads as
    # a slow upload, which is the same failure shape this script's own prerender
    # fallback exists to prevent. Verify there IS a value before consuming two.
    [ $# -ge 2 ] || { echo "⚠ --environment needs a value (production|staging)"; exit 2; }
    DEPLOYTO="$2"
    shift 2
    ;;
  --force|--skip-freshness)
    SKIP_FRESHNESS=1
    shift 1
    ;;
  --dry-run|--dryrun)
    # Print the planned S3 changes and upload nothing. The ONLY safe way to
    # exercise this script — see the note at the sync step.
    DRY_RUN=1
    DRY_FLAG="--dryrun"
    shift 1
    ;;
  --block-only)
    # Regenerate + re-copy the CMS block without touching S3. For when the paste
    # got lost in terminal scrollback, or the block needs re-copying later.
    BLOCK_ONLY=1
    shift 1
    ;;
  --copy)
    # See the --environment note: a missing value would hang the loop, not error.
    [ $# -ge 2 ] || { echo "⚠ --copy needs a value (hero|body|none)"; exit 2; }
    # Which block to put on the clipboard: hero | body | none.
    # A SVELTE-hero/SVELTE-body project produces TWO blocks for TWO separate ARC
    # code blocks, and only one thing can be on the clipboard at a time — so this
    # is explicit rather than guessed. Default is hero when both exist.
    COPY_WHICH="$2"
    shift 2
    ;;
  *) shift 1 ;;
  esac
done

# ── Freshness check ──────────────────────────────────────────────────────────
# WHY (2026-07-30): this script does not build. It syncs whatever is sitting in
# dist/, and said nothing at all if that build was older than the source. Hit for
# real today: Hero.svelte was edited at 12:03, dist/ was from 11:47, and
# `npm run deploy-production` would have cheerfully pushed the previous hero and
# printed a success message. A stale deploy is indistinguishable from a good one
# from the outside, which is the exact silent-degradation this shop forbids.
#
# So: compare the newest source mtime against the newest dist/ mtime and REFUSE
# when source is newer. Refuse rather than auto-build — a deploy script that
# silently builds for you is a different kind of surprise, and `build` vs
# `build:hero` vs `build:body` is a real choice only the author can make.
# Override with --force when you know the mismatch is harmless.
# ⚠ arc-*-block.html is EXCLUDED, and that exclusion is the whole point.
# Those files are written BY THIS SCRIPT into dist/, so without the exclusion they
# become the newest thing in dist/ and the freshness check below stops measuring the
# BUILD at all. Measured: bundle 11:00 + source 12:00 correctly refuses, but add a
# 12:30 block file and the same stale bundle reports "✅ Build is current".
# That made --block-only (a feature of this very script) silently re-arm the exact
# failure the guard exists to catch — worse than no guard, because it prints a green
# line while shipping a stale bundle. Anything generated here, not by the build,
# must be invisible to this comparison.
NOT_BUILD_OUTPUT='-name .DS_Store -o -name arc-hero-block.html -o -name arc-body-block.html'
newest_mtime() {  # newest mtime (epoch seconds) among existing paths, recursively
  find "$@" -type f -not \( $NOT_BUILD_OUTPUT \) -print0 2>/dev/null \
    | xargs -0 stat -f '%m' 2>/dev/null | sort -rn | head -1
}
newest_file() {   # path of the newest file among existing paths, recursively
  find "$@" -type f -not \( $NOT_BUILD_OUTPUT \) -print0 2>/dev/null \
    | xargs -0 stat -f '%m %N' 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-
}

if [ "$SKIP_FRESHNESS" -eq 0 ] && [ -d "dist" ]; then
  SRC_PATHS=""
  for p in src index.html vite.config.js package.json public; do
    [ -e "$p" ] && SRC_PATHS="$SRC_PATHS $p"
  done
  if [ -n "$SRC_PATHS" ]; then
    SRC_M=$(newest_mtime $SRC_PATHS)
    DIST_M=$(newest_mtime dist)
    if [ -n "$SRC_M" ] && [ -n "$DIST_M" ] && [ "$SRC_M" -gt "$DIST_M" ]; then
      # `-newer <reference file>`, NOT `-newermt @epoch` — BSD/macOS find rejects
      # the @epoch form and silently lists nothing, which quietly drops the most
      # useful line of this whole message.
      DIST_REF=$(newest_file dist)
      NEWEST_FILE=$(find $SRC_PATHS -type f -not \( $NOT_BUILD_OUTPUT \) -newer "$DIST_REF" -print 2>/dev/null | head -3)
      echo ""
      echo "❌ STALE BUILD — refusing to deploy."
      echo ""
      echo "   Source is NEWER than dist/, so this would ship the previous build:"
      echo "     newest source : $(date -r "$SRC_M" '+%Y-%m-%d %H:%M:%S')"
      echo "     dist/ built   : $(date -r "$DIST_M" '+%Y-%m-%d %H:%M:%S')"
      echo ""
      if [ -n "$NEWEST_FILE" ]; then
        echo "   Changed since the last build:"
        echo "$NEWEST_FILE" | sed 's/^/     /'
        echo ""
      fi
      echo "   Build first, then deploy:"
      echo "     npm run build:hero      # hero-only project (or build:body / build)"
      echo "     npm run deploy-production"
      echo ""
      echo "   To deploy this dist/ anyway: ./strib-deploy.sh --environment $DEPLOYTO --force"
      echo ""
      exit 1
    fi
    echo "✅ Build is current (dist/ newer than source)."
  fi
fi

PROJ_NAME=$(pwd | xargs basename)
echo "Project Name: $PROJ_NAME"
echo "Deploying to: $DEPLOYTO"

if [ "$DEPLOYTO" == "production" ]; then
  DEPLOY_PATH="s3://static.startribune.com/news/projects/all/$PROJ_NAME"
elif [ "$DEPLOYTO" == "staging" ]; then
  DEPLOY_PATH="s3://static.startribune.com/staging/news/projects/all/$PROJ_NAME"
fi

echo "Deployment Path: $DEPLOY_PATH"

if [ "$DEPLOY_PATH" != "" ]; then
  if [ -d "dist/" ]; then

    FONTS_PATH="$DEPLOY_PATH/fonts/"

    if [ "$BLOCK_ONLY" -eq 1 ]; then
      echo "(--block-only: skipping the S3 sync, just regenerating the CMS block)"
    else
    # --dry-run: show exactly what WOULD be uploaded and touch nothing.
    # WHY (2026-07-30): this script had no safe way to be exercised. It derives
    # PROJ_NAME from the CURRENT DIRECTORY NAME and deploys to
    # .../all/$PROJ_NAME — so running it from a scratch clone to "just see what it
    # prints" publishes real objects to the production CDN bucket under a path
    # named after that scratch folder. That happened while testing this very
    # change (3 junk files under .../all/tmpl-fresh/, removed immediately).
    # A tool that cannot be tested without side effects WILL be tested with them.
    if [ "$DRY_RUN" -eq 1 ]; then
      echo "🅳 --dry-run: NOTHING will be uploaded to S3 — planned changes only."
      echo "   (dist/arc-*-block.html IS still written; the clipboard is NOT touched"
      echo "    unless you passed --copy explicitly.)"
    fi
    echo "Syncing general assets..."
    aws s3 sync ./dist/ $DEPLOY_PATH \
      $DRY_FLAG \
      --profile default \
      --exclude ".DS_Store" \
      --exclude "strib-webfonts/*" \
      --exclude "assets/*" \
      --exclude "assets/fonts/*" \
      --exclude "fragments/*" \
      --exclude "arc-hero-block.html" \
      --exclude "arc-body-block.html"

    echo "Syncing JavaScript files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      $DRY_FLAG \
      --exclude "*" \
      --include "*.js" \
      --profile default \
      --content-type "application/javascript" \

    echo "Syncing CSS files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      $DRY_FLAG \
      --exclude "*" \
      --include "*.css" \
      --profile default \
      --content-type "text/css" \

    fi

    JS_BUNDLE=$(basename dist/assets/index-*.js)
    CSS_BUNDLE=$(basename dist/assets/index-*.css)
    ASSET_BASE="${DEPLOY_PATH/s3:/https:}"

    HERO_HTML=""
    BODY_HTML=""
    if [ -f "dist/fragments/hero.html" ]; then
      HERO_HTML=$(cat dist/fragments/hero.html)
    fi
    if [ -f "dist/fragments/body.html" ]; then
      BODY_HTML=$(cat dist/fragments/body.html)
    fi

    echo ""
    if [ "$BLOCK_ONLY" -eq 1 ]; then
      echo "    Block regenerated (nothing was deployed)."
    else
      echo "    Deploy complete!"
    fi
    echo ""

    # ── Write the CMS blocks to FILES and put one on the clipboard ─────────────
    # WHY (2026-07-30): these blocks were printed to the terminal only. The hero
    # block is ~3KB on ONE line, so selecting it out of scrollback is awkward and
    # very easy to truncate — and a half-copied block pasted into ARC is a broken
    # hero that looks like a code problem. Writing files means you can open, diff
    # or re-copy them later; pbcopy means the common case needs no selecting.
    #
    # ⚠ TWO BLOCKS, TWO ARC CODE BLOCKS. A SVELTE-hero/SVELTE-body project
    # prerenders BOTH fragments (npm run build → "Both", or prerender.js both) and
    # each one goes into its OWN ARC code block — hero into the hero area, body
    # into the body area. Only one thing fits on the clipboard, so when both exist
    # this copies the HERO and tells you exactly how to copy the body next. It does
    # not concatenate them: pasted as one blob into a single code block, the body
    # would render inside the hero slot.
    #
    # The <link> and <script> ride with the HERO block whenever a hero exists, and
    # move to the BODY block only when there is no hero — one bundle load per page,
    # never two. That rule is inherited from the original script; don't "fix" it by
    # putting the script in both blocks.
    HERO_BLOCK_FILE="dist/arc-hero-block.html"
    BODY_BLOCK_FILE="dist/arc-body-block.html"

    if [ -n "$HERO_HTML" ]; then
      {
        printf '<link rel="stylesheet" href="%s/assets/%s">\n' "$ASSET_BASE" "$CSS_BUNDLE"
        printf '<div id="proj-hero">%s</div>\n' "$HERO_HTML"
        printf '<script type="module" crossorigin src="%s/assets/%s"></script>\n' "$ASSET_BASE" "$JS_BUNDLE"
      } > "$HERO_BLOCK_FILE"
    fi

    if [ -n "$BODY_HTML" ]; then
      {
        if [ -z "$HERO_HTML" ]; then
          printf '<link rel="stylesheet" href="%s/assets/%s">\n' "$ASSET_BASE" "$CSS_BUNDLE"
        fi
        printf '<div id="proj-body">%s</div>\n' "$BODY_HTML"
        if [ -z "$HERO_HTML" ]; then
          printf '<script type="module" crossorigin src="%s/assets/%s"></script>\n' "$ASSET_BASE" "$JS_BUNDLE"
        fi
      } > "$BODY_BLOCK_FILE"
    fi

    # Decide what goes on the clipboard. Default: hero if present, else body.
    # EXCEPT under --dry-run, which must not touch the pasteboard: a "nothing will
    # happen" run that silently replaces your clipboard is a lie, and during this
    # PR's own testing it meant passing --copy none by hand to protect a block
    # waiting to be pasted. Needing an extra flag to make a dry run safe is the
    # tell that the default was wrong. An explicit --copy still wins.
    if [ -z "$COPY_WHICH" ]; then
      if [ "$DRY_RUN" -eq 1 ]; then
        COPY_WHICH="none"
      elif [ -n "$HERO_HTML" ]; then COPY_WHICH="hero"
      else COPY_WHICH="body"
      fi
    elif [ "$DRY_RUN" -eq 1 ] && [ "$COPY_WHICH" != "none" ]; then
      echo "    ⚠ --dry-run with an explicit --copy $COPY_WHICH: the clipboard WILL be replaced."
    fi

    copy_block() {  # $1 = label, $2 = file
      if [ ! -f "$2" ]; then
        echo "    ⚠ asked to copy the $1 block, but $2 does not exist."
        echo "      Did the build prerender that fragment? (npm run build:$1)"
        return 1
      fi
      if command -v pbcopy >/dev/null 2>&1; then
        # LC_CTYPE=UTF-8 is NOT optional and NOT cosmetic. pbcopy decodes stdin
        # using the current locale's charset, and this shell runs with LANG=""
        # / LC_CTYPE="C" — under which pbcopy falls back to Mac OS Roman. That
        # read every UTF-8 em-dash and curly quote in the block as THREE Roman
        # characters and put the mangled text on the pasteboard, so the block
        # pasted into ARC published as "places ‚Äî until his owner and ‚Äúwing
        # woman‚Äù". Confirmed live on LloydTurkey 2026-07-30 and reproduced
        # byte-for-byte (e2 80 9a c3 84 c3 ae).
        # ⚠ A pbcopy→pbpaste round trip CANNOT detect this: both directions use
        # the same wrong charset, so the bytes come back identical and look fine.
        # To actually see it, read the pasteboard as UTF-8: LC_CTYPE=UTF-8 pbpaste.
        LC_CTYPE=UTF-8 pbcopy < "$2"
        echo "    📋 CLIPBOARD = $1 block — paste into the ARC $1 code block."
        # Fail loud if non-ASCII got mangled on the way to the pasteboard.
        if ! diff -q <(LC_CTYPE=UTF-8 pbpaste) "$2" >/dev/null 2>&1; then
          echo "    ⚠ CLIPBOARD DOES NOT MATCH $2 — do NOT paste this into ARC."
          echo "      Likely a locale/charset mangle (see the LC_CTYPE note above)."
          echo "      Copy the file's contents by hand instead."
        fi
      else
        # Fail loud rather than implying the clipboard worked.
        echo "    ⚠ pbcopy not found — clipboard NOT set. Copy from $2."
      fi
    }

    if [ -n "$HERO_HTML" ]; then
      echo "    === HERO CODE BLOCK → ARC hero code block ==="
      echo "    📄 $HERO_BLOCK_FILE  ($(wc -c < "$HERO_BLOCK_FILE" | tr -d ' ') bytes)"
      echo ""
    fi

    if [ -n "$BODY_HTML" ]; then
      echo "    === BODY CODE BLOCK → ARC body code block (SEPARATE block) ==="
      echo "    📄 $BODY_BLOCK_FILE  ($(wc -c < "$BODY_BLOCK_FILE" | tr -d ' ') bytes)"
      echo ""
    fi

    if [ -n "$HERO_HTML" ] && [ -n "$BODY_HTML" ]; then
      echo "    ⚠ TWO blocks — they go into TWO SEPARATE ARC code blocks."
      echo "      The stylesheet + script ride with the HERO block only (one bundle load)."
      echo ""
    fi

    case "$COPY_WHICH" in
      hero) copy_block hero "$HERO_BLOCK_FILE" ;;
      body) copy_block body "$BODY_BLOCK_FILE" ;;
      none) echo "    (--copy none: clipboard left alone)" ;;
      *)    echo "    ⚠ unknown --copy value '$COPY_WHICH' (use hero | body | none); clipboard left alone." ;;
    esac

    if [ -n "$HERO_HTML" ] && [ -n "$BODY_HTML" ]; then
      OTHER="body"; [ "$COPY_WHICH" = "body" ] && OTHER="hero"
      echo "    🔁 Then copy the $OTHER block:"
      echo "        ./strib-deploy.sh --environment $DEPLOYTO --block-only --copy $OTHER"
    else
      echo "    🔁 Re-copy later, without deploying:"
      echo "        ./strib-deploy.sh --environment $DEPLOYTO --block-only"
    fi
    echo ""

  else
    echo "No 'dist/' directory found. Do you need to run the build command?"
  fi
else
  echo "No valid deployment environment specified. Taking no further action."
fi
