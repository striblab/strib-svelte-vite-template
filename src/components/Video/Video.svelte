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
- `showControls`: boolean — `true` (default) wraps the video in a `<figure>`
  with the overlay (mute / replay / countdown) and captions. `false` renders
  just the bare video — the ambient/background-loop case.
- `shouldLoop`: boolean — loop playback continuously (default false). A clip
  that doesn't loop shows the replay control, if `showControls` is on.
- `credit`: string — caption text (rendered only when `showControls`).
- `autoplayInView`: boolean — play/pause as it scrolls in/out of view (default true).
- `autoplayThreshold`: number 0-1 — how much of the video must be visible before
  `autoplayInView` starts it (and below which it pauses). Default `0`: play as
  soon as any part scrolls in, pause only once fully off screen.
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
<Video {...someClip} credit="Video by Star Tribune" />

<Video {...someClip} showControls={false} shouldLoop />
```

Autoplay note: `video.muted` is set as a *property* in JS on mount (Svelte may
not reliably apply the markup attribute) before playback starts, because the
browser autoplay policy blocks unmuted autoplay. `playsinline` keeps iOS inline.
-->

<script>
  import { onMount } from "svelte";
  import Overlay from "./_Overlay.svelte";
  import ImageCaption from "../Image/_ImageCaption.svelte";
  import ElevatedCaption from "./_ElevatedCaption.svelte";
  import LazyMount from "../LazyMount/LazyMount.svelte";

  /**
   * @type {{
   *   sources?: Array<{ src: string; media?: string }>;
   *   poster?: string;
   *   aspectRatio?: string;
   *   showControls?: boolean;
   *   shouldLoop?: boolean;
   *   credit?: string;
   *   autoplayInView?: boolean;
   *   autoplayThreshold?: number;
   *   preloadMargin?: string;
   *   parsedCaptions?: Array<{ start: number; end: number; text: string }>;
   * }}
   */
  let {
    sources = [],
    poster = "",
    aspectRatio = "",
    showControls = true,
    shouldLoop = false,
    credit = "",
    autoplayInView = true,
    autoplayThreshold = 0,
    preloadMargin = "200%",
    parsedCaptions = [],
  } = $props();

  /** @type {HTMLElement | null} */
  let container = $state(null);
  /** @type {HTMLVideoElement | null} */
  let video = $state(null);

  // Overlay state (only read when showControls).
  let isMuted = $state(true);
  let isPaused = $state(true);
  let duration = $state(0);
  let currentTime = $state(0);
  let hasEnded = $state(false);

  const timeRemaining = $derived(
    duration && !isNaN(currentTime) ? Math.round(duration - currentTime) : 0,
  );
  const showReplay = $derived(showControls && !shouldLoop && hasEnded);
  const showTimer = $derived(showControls && duration > 0 && !showReplay);

  const activeCaption = $derived(
    parsedCaptions.find((c) => currentTime >= c.start && currentTime < c.end)
      ?.text ?? "",
  );

  function restart() {
    currentTime = 0;
    isPaused = false;
  }

  // Unmounting alone would not free anything — a detached <video> holds its
  // player until GC. load() with the sources gone drops it to NETWORK_EMPTY.
  function releaseVideo() {
    video?.pause();
    video?.load();
  }

  onMount(() => {
    isMuted = true;
    /** @type {IntersectionObserver | undefined} */
    let io;
    if (autoplayInView) {
      io = new IntersectionObserver(
        (entries) =>
          entries[0].isIntersecting ? restart() : (isPaused = true),
        // Out-of-range throws a RangeError here, hence clamp
        { threshold: Math.min(Math.max(autoplayThreshold, 0), 1) },
      );
      if (container) io.observe(container);
    } else {
      isPaused = false;
    }
    return () => io?.disconnect();
  });
</script>

{#snippet player()}
  <!-- svelte-ignore a11y_media_has_caption -->
  <video
    bind:this={video}
    bind:duration
    bind:currentTime
    bind:paused={isPaused}
    bind:ended={hasEnded}
    bind:muted={isMuted}
    class="block w-full h-full"
    {poster}
    style:aspect-ratio={aspectRatio}
    style:background={poster && `center / cover no-repeat url("${poster}")`}
    playsinline
    preload="metadata"
    loop={shouldLoop}
    onended={() => {
      if (!shouldLoop) isPaused = true;
    }}
  >
    <LazyMount
      target={container}
      rootMargin={preloadMargin}
      onRelease={releaseVideo}
    >
      {#each sources as source (source.src)}
        <source src={source.src} media={source.media} type="video/mp4" />
      {/each}
    </LazyMount>
  </video>
{/snippet}

{#if showControls}
  <figure class="mx-auto w-full">
    <div class="mb-2 flex flex-col gap-4 overflow-hidden rounded-2xl">
      <div class="relative" bind:this={container}>
        <Overlay
          {isMuted}
          {isPaused}
          {showReplay}
          {showTimer}
          {timeRemaining}
          onMute={() => {
            isMuted = !isMuted;
          }}
          onReplay={restart}
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
