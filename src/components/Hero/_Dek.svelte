<!-- 
@component
- Renders a dek/subhead in the style of the Immersive Template
- This component accepts no props and renders markup slotted between component tags

@example
```svelte
<Dek>Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at montes vitae tempor enim, venenatis tristique feugiat arcu dis ridiculus.</Dek>
```
-->

<script>
  let { children } = $props();
</script>

<h2
  class="font-editorial-non-news-heading-05 md:font-editorial-non-news-heading-04 text-text-primary"
>
  {@render children()}
</h2>
