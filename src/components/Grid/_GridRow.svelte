<!-- 
@component
### GridRow component
Renders a div that spans a configurable number of columns when used within a parent Grid component.  
Wrap this component around additional markup to control that markup's width and position within its grid layout.

#### Optional properties
- variant: "default" | "inline";
- additionalClasses: string;

#### Variants
- default: GridRow spans the full width of its parent grid. This is the default behavior if the optional variant property is not passed in.  
- inline: GridRow spans the full width of its parent grid on mobile, and the middle six columns of its parent grid on tablet and desktop.

#### Example
```svelte
<Grid>
  <GridRow variant="inline" >
    <Paragraph>This is a paragraph.</Paragraph>
    <Paragraph>Configured this way, the GridRow becomes a very reasonable article body, with spacing controlled by the 'gap-y-5' Tailwind class rather than its chilren's margins and padding.</Paragraph>
    <Paragraph>You can place Image components or any HTML in here as you to render additional inline assets separated by 20 pixels of vertical space.</Paragraph>
  </GridRow>
</Grid>
```
-->

<script>
  /** @type {{variant?: "default" | "inline"; additionalClasses?: string; children?: function}} */
  let { variant = "default", additionalClasses = "", children } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "default":
      variantStyles = "col-span-full";
      break;
    case "inline":
      variantStyles =
        "col-span-full grid md:col-start-2 md:col-span-6 lg:col-start-4";
      break;
  }
</script>

<div class="{variantStyles} {additionalClasses}">
  {@render children?.()}
</div>
