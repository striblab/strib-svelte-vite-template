<!-- 
@component
### Dek component
Renders a h2 tag in the style of the Immersive Template.
Wrap this component around the markup you want rendered.

#### Example
```svelte
<Dek>Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at montes vitae tempor enim, venenatis tristique feugiat arcu dis ridiculus.</Dek>
```
-->

<script>
  /** @type {{children?: function;}} */
  let { children } = $props();
</script>

<h2
  class="font-editorial-non-news-heading-05 md:font-editorial-non-news-heading-04 text-text-primary"
>
  {@render children?.()}
</h2>
