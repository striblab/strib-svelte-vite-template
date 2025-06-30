<!-- 
@component
### ImageCaption component
Renders a figcaption tag in the style of the Immersive Template's image captions.  
Accepts the optional property additionalClasses for customization.

#### Optional properties
- additionalClasses: string;

#### Example
```svelte
<ImageCaption additionalClasses="px-4">Hello world!</ImageCaption>
```
-->

<script>
  /** @type {{additionalClasses?: string; children?: function}} */
  let { additionalClasses = "", children } = $props();
</script>

<!-- ignoring svelte a11y checking since this component is the direct child of a <figure> tag once imported inside the Image component -->
<!-- svelte-ignore a11y_figcaption_parent -->
<figcaption
  class="font-utility-meta-reg-02 text-text-secondary {additionalClasses}"
>
  {@render children?.()}
</figcaption>
