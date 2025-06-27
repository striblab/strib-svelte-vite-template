<!-- 
@component
- Renders a paragraph in the style of the Immersive Template
- This component accepts no props and renders markup slotted between component tags

@example
```svelte
<Paragraph>Hello world!</Paragraph>
```
-->

<script>
  let { children } = $props();
</script>

<p class="font-editorial-body-reg-02 text-text-primary">
  {@render children()}
</p>
