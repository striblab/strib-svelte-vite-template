<!--
@component
### Credits component
Renders a credits box with a top rule.
Each credit renders as a bold role label followed by its authors.

#### Optional properties
- credits: { label: string; authors: string }[];
- topRule: "strong" | "subtle"; defaults to "strong"
- additionalClasses: string;

#### Example
```svelte
<Credits
credits={[
  { label: "Reporting", authors: "Briana Bierschbach, Tom Nehil" },
  { label: "Design and development", authors: "Tom Nehil, Anna Boone" },
]}
/>
```
-->

<script>
  /**
   * @typedef {Object} Credit
   * @property {string} label Role, e.g. "Reporting" or "Graphics".
   * @property {string} authors Names credited for the role, as one string.
   */

  /**
   * @typedef {Object} CreditsProps
   * @property {Credit[]} [credits] Credit lines, rendered in order.
   * @property {"strong" | "subtle"} [topRule] Top rule color. Defaults to "strong".
   * @property {string} [additionalClasses] Extra classes for the outer wrapper.
   */

  /** @type {CreditsProps} */
  let { credits = [], topRule = "strong", additionalClasses = "" } = $props();
</script>

<section
  class="mx-auto w-full border-t {topRule === 'subtle'
    ? 'border-border-on-light-subtle-02'
    : 'border-border-on-light-strong-02'} pt-5 text-left {additionalClasses}"
>
  <h5
    class="mb-2 typography-utility-label-semibold-large-caps tracking-[1.25px] text-text-on-light-primary"
  >
    Credits
  </h5>
  {#each credits as { label, authors }}
    <p
      class="mb-1 typography-utility-text-regular-medium text-text-on-light-primary"
    >
      <span class="mr-1 typography-utility-text-semibold-medium">{label}</span>
      {authors}
    </p>
  {/each}
</section>
