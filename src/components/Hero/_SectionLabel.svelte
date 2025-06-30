<!-- 
@component
### SectionLabel component
Render a section label in the style of the Immersive Template with an optional link to a section page.

#### Optional properties
- href: string;

#### Example
```svelte
<SectionLabel>Economy</SectionLabel>
```
-->
<script>
  /** @type {{href?: string; children?: function}} */
  let { href = "", children } = $props();
</script>

{#if href}
  <a target="_blank" rel="noreferrer" {href}>
    <span
      class="break-words text-text-color-01 uppercase font-utility-label-bold-caps-02"
    >
      {@render children?.()}
    </span>
  </a>
{:else}
  <span
    class="break-words text-text-color-01 uppercase font-utility-label-bold-caps-02"
  >
    {@render children?.()}
  </span>
{/if}
