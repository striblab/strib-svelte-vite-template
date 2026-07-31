<!-- 
@component
### Paragraph component
Renders a p tag in the style of the Immersive Template.  
Wrap this component around the markup you want rendered.

#### Example
```svelte
<Paragraph>Hello world!</Paragraph>
```
-->

<script>
  /** @type {{additionalClasses: String; children?: function}} */
  let { additionalClasses = "", children } = $props();
</script>

<p class="font-editorial-body-reg-02 text-text-primary {additionalClasses}">
  {@render children?.()}
</p>
