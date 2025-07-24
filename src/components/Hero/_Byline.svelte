<!--
@component 
### Byline component
Renders a single author name, optionally hyperlinked to an author bio page.  
Wrap this component around the markup you want rendered.

#### Optional properties
- href: string;

#### Example
```svelte
<Byline
href="https://www.startribune.com/author/bryan-brussee/8455834"
>By Bryan Brussee
</Byline>
```
-->

<script>
  /** @type {{href?: string; children?: function;}} */
  let { href = "", children } = $props();
</script>

{#if href}
  <a target="_blank" rel="noreferrer" class="flex w-fit h-fit" {href}>
    <div class="flex items-center gap-0.5">
      <p class=" font-utility-label-bold-02 text-text-primary relative">
        {@render children?.()}
      </p>
    </div>
  </a>
{:else}
  <div class="flex items-center gap-0.5">
    <p class=" font-utility-label-bold-02 text-text-primary relative">
      {@render children?.()}
    </p>
  </div>
{/if}
