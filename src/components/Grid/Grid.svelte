<!--
@component
### Grid component
Renders a grid layout in the style of the Immersive Template.
Renders eight columns for mobile and tablet viewports and twelve columns for desktop viewports.
Wrap this component around additional markup. The GridRow component helps style the width of wrapped markup.
Grid accepts the optional property additionalClasses for customization.

The grid owns the page's horizontal gutters and both width caps — the content
column maxes out at `--width-content-max`, full-bleed rows at `--width-bleed-max`.
Pass row spacing (`gap-y-*`) through additionalClasses; horizontal padding is
already handled and adding it will inset full-bleed rows.

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

<div class="page-grid {additionalClasses}">
  {@render children?.()}
</div>
