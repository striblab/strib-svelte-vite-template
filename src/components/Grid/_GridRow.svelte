<!-- 
@component
### GridRow component
Renders a div that spans a configurable number of columns when used within a parent Grid component.  
Wrap this component around additional markup to control that markup's width and position within a parent's grid layout.

#### Optional properties
- variant: "default" | "inline" | "fullBleed";
- additionalClasses: string;

#### Variants
- default: GridRow spans the full width of its parent grid. This is the default behavior if the optional variant property is not passed in.  
- inline: GridRow spans the full width of its parent grid on mobile, and the middle six columns of its parent grid on tablet and desktop.
- fullBleed: GridRow spans the width of the page, up to a 1800px band (--width-bleed-max), centered.

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
    /** @type {{variant?: "default" | "inline" | "fullBleed"; additionalClasses?: string; children?: function}} */
    let { variant = "default", additionalClasses = "", children } = $props();

    let variantStyles = $derived.by(() => {
        switch (variant) {
            case "default":
                return "grid-row-default";
            case "inline":
                return "grid-row-inline grid";
            case "fullBleed":
                return "grid-row-full";
        }
    });
</script>

<div class="*:min-w-0 {variantStyles} {additionalClasses}">
    {@render children?.()}
</div>
