<!-- 
@component
### Grid component 
Renders a grid layout in the style of the Immersive Template.  
Implements four columns for mobile, eight columns for tablet and twelve columns for desktop viewports.  
Wrap this component around additional markup. The GridRow component helps style the width of wrapped markup.  
Grid accepts the optional property additionalClasses for customization.

#### Optional properties
- additionalClasses: string;

#### Example
```svelte
<Grid additionalClasses="gap-y-5">
  <GridRow>
    <Paragraph>
      This paragraph will span the full width of the grid with the default GridRow.
    </Paragraph>
  </GridRow>
</Grid>
```
-->

<script>
  /** @type {{additionalClasses?: string, children?: function}} */
  let { additionalClasses = "", children } = $props();
</script>

<div
  class="grid grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-6 max-w-[67.5rem] mx-auto {additionalClasses}"
>
  {@render children?.()}
</div>
