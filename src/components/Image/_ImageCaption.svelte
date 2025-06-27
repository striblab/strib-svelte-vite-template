<!-- 
@component
- Renders an image caption in the style of the Immersive Template
- This component accepts no props and renders markup slotted between component tags

@example
```svelte
<Paragraph>Hello world!</Paragraph>
```
-->

<script>
  let { additionalClasses = "", children } = $props();
</script>

<!-- ignoring svelte a11y checking since this component is the direct child of a <figure> tag once imported inside the Image component -->
<!-- svelte-ignore a11y_figcaption_parent -->
<figcaption
  class="font-utility-meta-reg-02 text-text-secondary {additionalClasses}"
>
  {@render children()}
</figcaption>
