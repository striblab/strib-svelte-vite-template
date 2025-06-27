<!-- 
@component 
- Renders a string in the style of an Immersive Template headline
- This component accepts no props and renders markup slotted between component tags

@example
```svelte
<Headline>Lorem ipsum dolor sit amet consectetur adipiscing elit</Headline>
```
-->

<script>
  let { children } = $props();
</script>

<h1 class="font-editorial-news-heading-01 text-text-primary">
  {@render children()}
</h1>
