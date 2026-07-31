<!--
@component
### Video component
Native `<video>` playing Arc-hosted progressive MP4(s) over CloudFront. Fully
prop-driven: pass a `sources` ladder (+ `poster` / `aspectRatio`) resolved at
build time by `scripts/resolve-video.js`, which writes one `<uuid>.json` per
video whose keys ARE these props — so you spread it straight in:
`<Video {...someClip} />`.

 The browser loads the first `<source>` whose media query matches (smallest file
covering the viewport), else the no-media fallback: responsive payload that works
from prerendered HTML — no JS selection, no adaptive-bitrate ramp.

#### Optional properties
- `sources`: Array<{ src: string; media?: string }> — MP4 renditions; the browser
  picks the first whose `media` matches, else the no-`media` fallback. Keys on
  CSS px, not device px (high-DPR screens get a slightly softer file — the trade
  for the data saving on an ambient loop).
- `poster`: string — still shown before playback (Arc promo_image). Baked into
  the prerendered HTML so there's no blank flash above the fold.
- `aspectRatio`: string — e.g. "9 / 16". Reserves the box, so no layout shift.
- `variant`: "ambient" | "inline" — `ambient` (default) renders just the bare
  video; `inline` adds the overlay (mute / replay / countdown) + caption.
- `loop`: boolean — defaults to true for `ambient`, false for `inline`.
- `credit`: string — caption text (inline only).
- `autoplayInView`: boolean — play/pause as it scrolls in/out of view (default true).
- `parsedCaptions`: Array<{ start: number; end: number; text: string }> — VTT cues
  pre-parsed at build time by `resolve-video.js`. Drives the `activeCaption` derived
  (the cue text for the current playback moment).

#### Getting Arc video data
To generate the data this component expects from an Arc Video Center asset, find your asset's UUID {@link https://startribunemedia.arcpublishing.com/videocenter/x/vodxsearch here}.
Then from the CLI, use the command:

```
npm run resolve:video YOURUUID
```

This places a JSON named after your UUID in the src/data directory. 
Import that file into the Video.svelte's parent component, and spread its attributes
over your Video.svelte instance as in the eaxmples below.

#### Example
```svelte
<Video {...someClip} />

<Video {...someClip} variant="inline" credit="Video by Star Tribune" />
```

Autoplay note: `video.muted` is set as a *property* in JS (Svelte may not
reliably apply the markup attribute) before `play()`, because the browser
autoplay policy blocks unmuted autoplay. `playsinline` keeps iOS inline.
-->

<script>
  import { onMount } from "svelte";
  import Overlay from "./_Overlay.svelte";
  import ImageCaption from "../Image/_ImageCaption.svelte";
  import ElevatedCaption from "./_ElevatedCaption.svelte";

  /**
   * @type {{
   *   sources?: Array<{ src: string; media?: string }>;
   *   poster?: string;
   *   aspectRatio?: string;
   *   variant?: "ambient" | "inline";
   *   loop?: boolean;
   *   credit?: string;
   *   autoplayInView?: boolean;
   *   parsedCaptions?: Array<{ start: number; end: number; text: string }>;
   * }}
   */
  let {
    sources = [],
    poster = "",
    aspectRatio = "",
    variant = "ambient",
    loop = undefined,
    credit = "",
    autoplayInView = true,
    parsedCaptions = [],
  } = $props();

  /** @type {HTMLVideoElement | null} */
  let video = $state(null);
  /** @type {HTMLElement | null} */
  let container = $state(null);

  // Overlay state (inline only).
  let isMuted = $state(true);
  let isPlaying = $state(false);
  let duration = $state(0);
  let currentTime = $state(0);
  let showReplay = $state(false);

  // loop defaults to true for ambient, false for inline (the prop default is
  // undefined so the variant can decide). Drives both the <video loop> attr and
  // onEnded's replay logic.
  const shouldLoop = $derived(loop ?? variant === "ambient");
  const timeRemaining = $derived(
    duration && !isNaN(currentTime) ? Math.round(duration - currentTime) : 0,
  );
  const showTimer = $derived(
    variant === "inline" && duration > 0 && !showReplay,
  );

  // Active caption: the text of the cue whose [start, end) window contains the
  // current playback time, else "". parsedCaptions is baked at build time by
  // resolve-video.js (see its `parsedCaptions` output); currentTime is fed by
  // the <video> ontimeupdate handler.
  const activeCaption = $derived(
    parsedCaptions.find((c) => currentTime >= c.start && currentTime < c.end)
      ?.text ?? "",
  );

  // Ambient clips get torn down and rebuilt on every Arc client re-render
  // (main.js's watchdog re-mounts the hero from the freshly re-injected
  // fragment). Under preload="none", WebKit/Firefox keep each new <video>
  // lazily un-initialized and defer the poster paint for ~120-190ms, so the
  // re-mount burst reads as a flicker. preload="metadata" kicks off media init
  // on insert, which paints the poster immediately — verified on WebKit +
  // Firefox even with the video bytes still downloading. Inline clips aren't in
  // that churn, so they keep preload="none" to honor the ambient data-saving
  // intent (no metadata fetch until they scroll into view).
  const preloadMode = $derived(variant === "ambient" ? "metadata" : "none");

  // Poster underlay (ambient only). The `poster` ATTRIBUTE is gated by the
  // media pipeline — WebKit only paints it once a freshly-mounted <video>
  // re-reaches readyState>=HAVE_METADATA. During the Arc re-render burst the
  // element is re-created faster than it can re-init, so each cold element sits
  // at readyState 0 with no poster painted and the box renders WHITE.
  // A CSS background paints on normal layout timing
  // — independent of the media pipeline — so the box is never white; the video's own
  // frames composite over it once playback has data. Inline isn't in the churn.
  const posterBg = $derived(
    variant === "ambient" && poster
      ? `center / cover no-repeat url("${poster}")`
      : undefined,
  );

  function play() {
    const p = video?.play();
    if (p && p.then) p.then(() => (isPlaying = true)).catch(() => {});
  }

  function pause() {
    video?.pause();
    isPlaying = false;
  }

  function enterView() {
    // Re-entering a non-looping inline clip that already finished: start over.
    if (variant === "inline" && (showReplay || video?.ended)) {
      showReplay = false;
    }
    if (video) video.currentTime = 0;
    play();
  }

  function toggleMute() {
    if (!video) return;
    video.muted = !video.muted;
    isMuted = video.muted;
  }

  function replay() {
    if (!video) return;
    video.currentTime = 0;
    showReplay = false;
    play();
  }

  // --- video element events (only meaningful for the inline overlay) ---
  function onMeta() {
    if (video) duration = video.duration;
  }
  function onTime() {
    if (video) currentTime = video.currentTime;
  }
  function onEnded() {
    if (!shouldLoop) {
      isPlaying = false;
      showReplay = true;
    }
  }

  onMount(() => {
    if (!video) return;
    video.muted = true; // property, not attribute — required for autoplay
    isMuted = true;

    /** @type {IntersectionObserver | undefined} */
    let io;
    if (autoplayInView) {
      io = new IntersectionObserver(
        (entries) => (entries[0].isIntersecting ? enterView() : pause()),
        //Pause ambient videos only when completely out of viewport
        //else pause inline-playing videos when half way out of viewport
        { threshold: variant === "ambient" ? 0 : 0.5 },
      );
      if (container) io.observe(container);
    } else {
      play();
    }

    return () => {
      io?.disconnect();
      video?.pause();
    };
  });
</script>

{#snippet player()}
  <!-- svelte-ignore a11y_media_has_caption -->
  <!-- No `src` attribute on <video>: the <source> children drive selection (the
       browser loads the first matching media query, else the no-media fallback).
       preload: ambient clips use "metadata" so the freshly-mounted <video>
       initializes immediately; inline clips keep "none" so nothing downloads
       until they scroll into view. See preloadMode above.
       background: ambient clips also carry the poster as a CSS background
       (posterBg) so the box paints the poster on layout — not gated by the
       media pipeline — and never flashes white across the Arc re-mount churn;
       the video's frames composite over it once playback has data. -->
  <video
    bind:this={video}
    class="block w-full h-full"
    {poster}
    style:aspect-ratio={aspectRatio}
    style:background={posterBg}
    muted
    playsinline
    preload={preloadMode}
    loop={shouldLoop}
    onloadedmetadata={onMeta}
    ontimeupdate={onTime}
    onended={onEnded}
  >
    {#each sources as source (source.src)}
      <source src={source.src} media={source.media} type="video/mp4" />
    {/each}
  </video>
{/snippet}

{#if variant === "inline"}
  <figure class="mx-auto w-full">
    <div class="mb-2 flex flex-col gap-4 overflow-hidden rounded-2xl">
      <div class="relative" bind:this={container}>
        <Overlay
          {isMuted}
          {isPlaying}
          {showReplay}
          {showTimer}
          {timeRemaining}
          onMute={toggleMute}
          onReplay={replay}
        />
        {@render player()}
      </div>
    </div>
    {#if credit}
      <ImageCaption>{credit}</ImageCaption>
    {/if}

    {#if activeCaption}
      <ElevatedCaption>{activeCaption}</ElevatedCaption>
    {/if}
  </figure>
{:else}
  <div bind:this={container}>
    {@render player()}
  </div>
{/if}
