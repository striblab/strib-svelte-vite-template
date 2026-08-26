<!--
@component
### LazyMount
Mounts its children only while its wrapper is near the viewport, and unmounts
them again on the way out. An IntersectionObserver with a generous
`rootMargin` decides "near", so children are ready before they're visible.

Use it to bound what a page holds open at once — media elements, canvases,
map instances, anything whose cost is per-live-instance rather than per-byte.
Browsers cap concurrent media players per renderer (far lower on mobile), and
past the cap loads fail silently rather than erroring.

#### Required properties
- `children`: Snippet — rendered while near the viewport.

#### Optional properties
- `placeholder`: Snippet — rendered while children are unmounted. Give it the
  same box as the children (an aspect-ratio, a min-height) or the page will
  jump as things mount. Rendered during SSR/prerender, since the observer is
  client-only — so this is what lands in prerendered HTML.
- `rootMargin`: string — how far outside the viewport counts as near, as an
  IntersectionObserver `rootMargin`. **px or % only**; unitless throws.
  Default `"200%"` (two viewports in every direction).
- `threshold`: number 0-1 — how much of the wrapper must be inside that
  margin. Clamped, because out-of-range throws a `RangeError`. Default `0`.
- `once`: boolean — mount on first approach and never unmount (plain lazy
  loading). Default `false`: unmount on the way out, which is what actually
  frees anything.
- `enabled`: boolean — `false` mounts children immediately and skips the
  observer entirely. Default `true`.
- `class`: string — applied to the wrapper element the observer watches. The
  wrapper needs a layout box, so `display: contents` will not work here.
- `onRelease`: () => void — called just before children unmount, while the
  consumer's `bind:this` refs are still live (Svelte nulls them as it
  unmounts). Unmounting a `<video>` does NOT release its media resource — a
  detached element holds its player until GC — so anything needing a
  deterministic teardown does it here.

#### Example
```svelte
<LazyMount rootMargin="150%" placeholder={posterBox} onRelease={releaseVideo}>
  <video bind:this={video} {poster}>...</video>
</LazyMount>
```
-->

<script>
  import { onMount } from "svelte";

  /**
   * @type {{
   *   children: import('svelte').Snippet;
   *   placeholder?: import('svelte').Snippet;
   *   rootMargin?: string;
   *   threshold?: number;
   *   once?: boolean;
   *   enabled?: boolean;
   *   class?: string;
   *   onRelease?: () => void;
   * }}
   */
  let {
    children,
    placeholder,
    rootMargin = "200%",
    threshold = 0,
    once = false,
    enabled = true,
    class: className = "",
    onRelease,
  } = $props();

  /** @type {HTMLElement | null} */
  let anchor = $state(null);
  let hasEnteredRange = $state(false);
  const isMounted = $derived(!enabled || hasEnteredRange);

  onMount(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          hasEnteredRange = true;
          if (once) observer.disconnect();
          return;
        }
        // Fire before flipping this: the callback runs synchronously, ahead
        // of the DOM update, so the consumer's refs still point at live nodes.
        if (hasEnteredRange) onRelease?.();
        hasEnteredRange = false;
      },
      // Out-of-range throws a RangeError here, hence clamp.
      { rootMargin, threshold: Math.min(Math.max(threshold, 0), 1) },
    );

    if (anchor) observer.observe(anchor);
    return () => observer.disconnect();
  });
</script>

<div bind:this={anchor} class={className}>
  {#if isMounted}
    {@render children()}
  {:else if placeholder}
    {@render placeholder()}
  {/if}
</div>
