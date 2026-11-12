<!--
@component
### Methodology component
Renders a methodology box with a top rule.
Wrap this component around the markup you want rendered. Child HTML
(paragraphs, links, emphasis) inherits the body type style, and each
`<p>` gets bottom spacing.

#### Optional properties
- topRule: "strong" | "subtle"; defaults to "strong"
- additionalClasses: string;

#### Example
```svelte
<GridRow variant="inline">
<Methodology>
  <p>The Minnesota Star Tribune chose the closest races based on...</p>
  <p>For the House, the <a href="https://www.startribune.com/">2024 result</a> was weighted at two-thirds...</p>
</Methodology>
</GridRow>
```
-->

<script>
  /**
   * @typedef {Object} MethodologyProps
   * @property {import("svelte").Snippet} [children] Methodology copy as HTML markup, typically one or more `<p>` tags.
   * @property {"strong" | "subtle"} [topRule] Top rule color. Defaults to "strong".
   * @property {string} [additionalClasses] Extra classes for the outer wrapper.
   */

  /** @type {MethodologyProps} */
  let { children, topRule = "strong", additionalClasses = "" } = $props();
</script>

<section
  class="mx-auto w-full border-t {topRule === 'subtle'
    ? 'border-border-on-light-subtle-02'
    : 'border-border-on-light-strong-02'} pt-5 text-left {additionalClasses}"
>
  <h5
    class="mb-2 typography-utility-label-semibold-large-caps tracking-[1.25px] text-text-on-light-primary"
  >
    Methodology
  </h5>
  <div
    class="typography-utility-text-regular-medium text-text-on-light-primary [&_p]:mb-2"
  >
    {@render children?.()}
  </div>
</section>
