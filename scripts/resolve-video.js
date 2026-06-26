// Usage:
//   npm run resolve:video <uuid> [<uuid> ...]      # resolve one or more videos
//   npm run resolve:video <file.json> <key>        # resolve every uuid found at <key> in an array
//   npm run resolve:video                          # refresh every video already in videos.json
//
// Resolves one or more Arc ANS videos to static JSON, baked for prerender, and
// upserts them into a single store — `src/data/videos.json`, a JSON array of
// <Video> shapes: { uuid, description?, sources, poster, aspectRatio,
// captions?, parsedCaptions? }. Each entry spreads straight into the component:
// `<Video {...someVideo} />` (uuid and description are harmless extra props
// <Video> ignores). `captions` stays the canonical WEB_VTT URL (for a native
// <track>); `parsedCaptions` is that VTT pre-parsed to cues so the caption
// overlay renders without a runtime cross-origin fetch + parse. Both caption
// fields are present only when the asset has captions.
//
// All three input forms write the same store. Upsert is keyed by `uuid`: a
// video already in videos.json is replaced in place (keeping its position); a
// new one is appended. Re-running never duplicates. The no-arg form re-reads
// every uuid already in the store and refreshes them.
//
// Input detection is positional: if the first arg is UUID-shaped, every arg is
// treated as a uuid; otherwise the first arg is a JSON file and the second is
// the key holding each item's uuid (items missing a valid uuid are warned and
// skipped, so a mixed array like proj-data.json is fine).
//
// Each video's mp4 renditions become a <source> list: each but the largest gets
// a (max-width: {width}px) media query so the browser loads the smallest file
// whose pixel width covers the CSS viewport; the largest is the no-media
// fallback. NOTE: media queries key on CSS px, not device px, so high-DPR
// screens are served a slightly softer file — the intended trade for the data
// saving on an ambient loop. Resolving once at build time keeps the build
// hermetic (no network dependency in CI) — that's why this is a separate step
// rather than a fetch inside the build chain. Commit the JSON it writes.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

import { parseVTT } from "./parse-vtt.js";

const ANS_API_URL =
  "https://startribunemedia-prod-cdn.video-api.arcpublishing.com/api/v1/ansvideos/findByUuid?uuid=";
const OUT_DIR = "src/data";
const VIDEOS_FILE = join(OUT_DIR, "videos.json");
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Normalize a caught (unknown) throwable to a printable message.
 * @param {unknown} err
 * @returns {string}
 */
function errMsg(err) {
  return err instanceof Error ? err.message : String(err);
}

function usageAndExit() {
  console.error(
    "Usage:\n" +
      "  npm run resolve:video <uuid> [<uuid> ...]   # resolve one or more videos\n" +
      "  npm run resolve:video <file.json> <key>     # resolve every uuid at <key> in an array\n" +
      "  npm run resolve:video                       # refresh every video already in videos.json",
  );
  process.exit(1);
}

/**
 * Read a file as a JSON array or exit(1). Both a parse failure and a non-array
 * payload are fatal rather than silently tolerated, so a bad edit can't wipe or
 * corrupt the store. Callers guard existence themselves (the missing-file case
 * differs: empty store vs. usage error).
 * @param {string} path
 * @returns {any[]}
 */
function readJsonArrayOrExit(path) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    console.error(`✗ couldn't read ${path} — ${errMsg(err)}`);
    process.exit(1);
  }
  if (!Array.isArray(parsed)) {
    console.error(`✗ ${path} does not contain a JSON array`);
    process.exit(1);
  }
  return parsed;
}

/**
 * Read the current videos.json store as an array of already-baked <Video>
 * shapes. Missing file → empty store. A malformed/parse-failed file is fatal
 * rather than silently clobbered, so a bad edit can't wipe the store.
 * @returns {Record<string, unknown>[]}
 */
function readStore() {
  if (!existsSync(VIDEOS_FILE)) return [];
  return readJsonArrayOrExit(VIDEOS_FILE);
}

/**
 * One mp4 (or other) stream entry under an ANS doc's `streams`.
 * @typedef {Object} AnsStream
 * @property {string} [stream_type]
 * @property {string} [url]
 * @property {number} [width]
 * @property {number} [height]
 */

/**
 * One generated-subtitle entry under `subtitles.urls`.
 * @typedef {Object} AnsSubtitleUrl
 * @property {string} [format]
 * @property {string} [url]
 */

/**
 * The slice of an Arc ANS video document this script reads. Loosely typed — only
 * the fields we touch, all optional, since ANS payloads vary by asset.
 * @typedef {Object} AnsDoc
 * @property {AnsStream[]} [streams]
 * @property {{ url?: string }} [promo_image]
 * @property {{ basic?: { url?: string } }} [promo_items]
 * @property {{ urls?: AnsSubtitleUrl[] }} [subtitles]
 * @property {{ basic?: string }} [headlines]
 */

/**
 * Fetch an ANS document and reduce it to the bakeable shape. Throws on any
 * problem so the caller can report it per-uuid and keep going.
 * @param {string} uuid
 */
async function resolve(uuid) {
  const res = await fetch(ANS_API_URL + encodeURIComponent(uuid));
  if (!res.ok) throw new Error(`ANS fetch failed (${res.status})`);
  /** @type {AnsDoc | undefined} */
  const doc = (await res.json())?.[0];
  if (!doc) throw new Error("no ANS document returned");

  const mp4s = (doc.streams ?? [])
    .filter((s) => s.stream_type === "mp4" && s.url)
    .sort((a, b) => (a.width || 0) - (b.width || 0));
  if (!mp4s.length) throw new Error("no mp4 stream found");

  // Dedupe by width (Arc occasionally lists the same width twice).
  const seen = new Set();
  const renditions = mp4s.filter((s) => {
    if (!s.width || seen.has(s.width)) return false;
    seen.add(s.width);
    return true;
  });

  // Each rendition but the largest gets a (max-width) media query; the largest
  // is the no-media fallback. Browser loads the first match top-to-bottom.
  const sources = renditions.map((s, i) => ({
    src: s.url,
    ...(i === renditions.length - 1
      ? {}
      : { media: `(max-width: ${s.width}px)` }),
    width: s.width,
    height: s.height,
  }));

  const largest = renditions[renditions.length - 1];
  const poster = doc.promo_image?.url ?? doc.promo_items?.basic?.url ?? "";
  const description = doc.headlines?.basic ?? "";
  const aspectRatio =
    largest.width && largest.height
      ? `${largest.width} / ${largest.height}`
      : "";

  // Captions: Arc lists every generated format (SRT, DFXP, RAW_TEXT, WEB_VTT)
  // under subtitles.urls; only WEB_VTT is usable by a native <video> <track>.
  // Absent when the asset has no captions (subtitles is {}), so it's omitted
  // from the output rather than baked as "" — caption-less videos stay clean.
  const captions =
    (doc.subtitles?.urls ?? []).find((u) => u.format === "WEB_VTT")?.url ?? "";

  // Pre-parse the WEB_VTT to cues at build time so the caption overlay renders
  // without a runtime cross-origin fetch + parse. Additive — `captions` (the
  // URL) is still baked for a future native <track>. A caption fetch/parse
  // failure must not sink an otherwise-good video, so it's caught here and just
  // omits parsedCaptions rather than throwing out of resolve().
  /** @type {import("./parse-vtt.js").VTTCue[] | undefined} */
  let parsedCaptions;
  if (captions) {
    try {
      const vttRes = await fetch(captions);
      if (!vttRes.ok) throw new Error(`HTTP ${vttRes.status}`);
      const cues = parseVTT(await vttRes.text());
      if (!cues.length) throw new Error("no cues parsed");
      parsedCaptions = cues;
    } catch (err) {
      console.error(`    captions: WEB_VTT parse failed — ${errMsg(err)}`);
    }
  }

  return {
    uuid,
    description,
    poster,
    aspectRatio,
    sources,
    renditions,
    captions,
    parsedCaptions,
  };
}

// The bakeable <Video> shape only — drops `renditions`, which is just the
// console-logging detail from resolve(). `uuid` is always emitted (it's the
// asset's identifier and the store's upsert key); description/caption fields
// are omitted entirely when absent.
/**
 * @param {Awaited<ReturnType<typeof resolve>>} resolved
 */
function toVideoShape({
  uuid,
  poster,
  aspectRatio,
  sources,
  description,
  captions,
  parsedCaptions,
}) {
  return {
    uuid,
    ...(description ? { description } : {}),
    sources,
    poster,
    aspectRatio,
    ...(captions ? { captions } : {}),
    ...(parsedCaptions ? { parsedCaptions } : {}),
  };
}

/**
 * One-line captions status for the per-video console summary.
 * @param {string} captions
 * @param {import("./parse-vtt.js").VTTCue[] | undefined} parsedCaptions
 * @returns {string}
 */
function captionsSummary(captions, parsedCaptions) {
  if (!captions) return "none";
  if (parsedCaptions) return `WEB_VTT (${parsedCaptions.length} cues)`;
  return "WEB_VTT (unparsed)";
}

/**
 * Pull every valid uuid out of a JSON array file at `key`, warning and skipping
 * items that have no valid uuid there (so mixed arrays like proj-data.json,
 * where only some items are Arc videos, resolve cleanly).
 * @param {string} from
 * @param {string} key
 * @returns {string[]}
 */
function uuidsFromFile(from, key) {
  if (!existsSync(from)) {
    console.error(`✗ ${from} not found`);
    usageAndExit();
  }
  const parsed = readJsonArrayOrExit(from);

  /** @type {string[]} */
  const uuids = [];
  parsed.forEach((item, i) => {
    const uuid = item?.[key];
    if (typeof uuid !== "string") {
      console.warn(`  – item ${i}: no "${key}", skipping`);
      return;
    }
    if (!UUID_RE.test(uuid)) {
      console.warn(
        `  – item ${i}: "${key}" = ${JSON.stringify(uuid)} is not a uuid, skipping`,
      );
      return;
    }
    uuids.push(uuid);
  });

  if (!uuids.length) {
    console.error(`✗ no valid uuids at "${key}" in ${from}`);
    process.exit(1);
  }
  return uuids;
}

/**
 * Resolve the CLI args to the list of uuids to (re)resolve.
 *   (no args)          → refresh: every uuid already in videos.json
 *   <uuid> [<uuid>...]  → those uuids (validated in the resolve loop)
 *   <file.json> <key>   → every uuid at <key> in the array file
 * @param {string[]} argv
 * @returns {string[]}
 */
function collectUuids(argv) {
  if (!argv.length) {
    const uuids = readStore()
      .map((v) => v?.uuid)
      .filter((u) => typeof u === "string" && UUID_RE.test(u));
    if (!uuids.length) {
      console.error(
        `No videos to refresh — ${VIDEOS_FILE} is missing or has no resolved videos.`,
      );
      usageAndExit();
    }
    return /** @type {string[]} */ (uuids);
  }

  // First arg UUID-shaped → every arg is a uuid. Otherwise → <file> <key>.
  if (UUID_RE.test(argv[0])) return argv;

  const [from, key] = argv;
  if (!key) {
    console.error(`✗ file mode needs a key: npm run resolve:video ${from} <key>`);
    usageAndExit();
  }
  return uuidsFromFile(from, key);
}

const uuids = collectUuids(process.argv.slice(2));

mkdirSync(OUT_DIR, { recursive: true });

let failed = 0;
/** @type {ReturnType<typeof toVideoShape>[]} */
const resolved = [];
for (const uuid of uuids) {
  if (!UUID_RE.test(uuid)) {
    console.error(`✗ ${uuid} — not a valid UUID, skipping`);
    failed++;
    continue;
  }
  try {
    const video = await resolve(uuid);
    resolved.push(toVideoShape(video));
    const { poster, captions, parsedCaptions, renditions } = video;
    console.log(`✓ ${uuid}`);
    console.log(
      `    renditions: ${renditions.map((s) => `${s.width}x${s.height}`).join(", ")}`,
    );
    console.log(`    poster:     ${poster ? "ok" : "MISSING"}`);
    console.log(`    captions:   ${captionsSummary(captions, parsedCaptions)}`);
  } catch (err) {
    console.error(`✗ ${uuid} — ${errMsg(err)}`);
    failed++;
  }
}

// Upsert the successes into videos.json, keyed by uuid: an existing video is
// replaced in place (keeping its position), a new one is appended. Failures are
// left out but never remove what's already stored.
const store = readStore();
const indexByUuid = new Map(store.map((v, i) => [v?.uuid, i]));
let updated = 0;
let appended = 0;
for (const video of resolved) {
  const at = indexByUuid.get(video.uuid);
  if (at === undefined) {
    indexByUuid.set(video.uuid, store.push(video) - 1);
    appended++;
  } else {
    store[at] = video;
    updated++;
  }
}

writeFileSync(VIDEOS_FILE, JSON.stringify(store, null, 2) + "\n");
console.log(
  `\n${updated} updated, ${appended} appended → ${VIDEOS_FILE} (${store.length} total)`,
);

if (failed) process.exit(1);
