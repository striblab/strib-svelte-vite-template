<!--
@component
### LazyMount
Mounts its children only while `target` is near the viewport, and unmounts
them again on the way out. An IntersectionObserver with a generous
`rootMargin` decides "near", so children are ready before they're visible.

Use it to bound what a page holds open at once — media sources, canvases, map
instances, anything whose cost is per-live-instance rather than per-byte.
Browsers cap concurrent media players per renderer (far lower on mobile), and
past the cap loads fail silently rather than erroring.

Renders no wrapper element of its own, so it's safe in places where the
parent's content model is strict — `<source>` inside `<video>`, `<td>` inside
`<tr>`. That's why the observed element comes in as `target` rather than
being one this component owns.

#### Required properties
- `children`: Snippet — rendered while `target` is near the viewport.
- `target`: HTMLElement | null — the element to observe. Pass a `bind:this`
  ref from the consumer; nothing is observed while it's null.

#### Optional properties
- `rootMargin`: string — how far outside the viewport counts as near, as an
  IntersectionObserver `rootMargin`. **px or % only**; unitless throws.
  Default `"200%"` (two viewports in every direction).
- `threshold`: number 0-1 — how much of `target` must be inside that margin.
  Clamped, because out-of-range throws a `RangeError`. Default `0`.
- `once`: boolean — mount on first approach and never unmount (plain lazy
  loading). Default `false`: unmount on the way out, which is what actually
  frees anything.
- `enabled`: boolean — `false` mounts children immediately and skips the
  observer entirely. Default `true`.
- `onRelease`: () => void — called after the children have been removed from
  the DOM, for teardown that unmounting alone doesn't do. It runs *after* the
  update on purpose: a consumer releasing a media element has to do it once
  its `<source>` children are already gone, or `load()` just re-selects the
  sources it was trying to release.

#### Example
```svelte
<video bind:this={video} {poster}>
  <LazyMount target={container} onRelease={releaseVideo}>
    {#each sources as source (source.src)}
      <source src={source.src} type="video/mp4" />
    {/each}
  </LazyMount>
</video>
```
-->

<script>
  /**
   * @type {{
   *   children: import('svelte').Snippet;
   *   target: HTMLElement | null;
   *   rootMargin?: string;
   *   threshold?: number;
   *   once?: boolean;
   *   enabled?: boolean;
   *   onRelease?: () => void;
   * }}
   */
  let {
    children,
    target,
    rootMargin = "200%",
    threshold = 0,
    once = false,
    enabled = true,
    onRelease,
  } = $props();

  let hasEnteredRange = $state(false);
  const isMounted = $derived(!enabled || hasEnteredRange);

  // Effects run after the DOM updates, which is the whole point: the children
  // are already gone by the time a consumer tears anything down.
  $effect(() => {
    if (!isMounted) onRelease?.();
  });

  // Reactive rather than onMount: a bind:this ref on an ancestor is not
  // assigned yet when a descendant component mounts, so waiting for target to
  // arrive is the difference between observing it and observing nothing.
  $effect(() => {
    if (!enabled || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        hasEnteredRange = entries[0].isIntersecting;
        if (hasEnteredRange && once) observer.disconnect();
      },
      // Out-of-range throws a RangeError here, hence clamp.
      { rootMargin, threshold: Math.min(Math.max(threshold, 0), 1) },
    );

    observer.observe(target);
    return () => observer.disconnect();
  });
</script>

{#if isMounted}
  {@render children()}
{/if}
