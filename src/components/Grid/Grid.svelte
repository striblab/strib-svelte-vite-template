<!-- 
@component
### Grid component 
Renders a grid layout in the style of the Immersive Template.  
Renders eight columns for mobile and tablet viewports and twelve columns for desktop viewports.  
Wrap this component around additional markup. The GridRow component helps style the width of wrapped markup.  
Grid accepts the optional property additionalClasses for customization.

#### Optional properties
- variant: "default" | "immersiveWrapper";
- additionalClasses: string;

#### Variants
- default: Renders a grid that renders eight columns for mobile and tablet viewports and twelve columns for desktop viewports with column spacing consistent with grids used in startribune-com's immersive template
- immersiveWrapper: This variant renders the same styles as the default template but with outer padding and row spacing styles. Intended to wrap your entire design if seeking to replicate exactly the immersive template's element spacing.

#### immersiveWrapper example
```svelte
<Grid variant="immersiveWrapper">
  <GridRow>
    <Hero
      sectionLabel="Section label"
      headline="Lorem ipsum dolor sit amet consectetur adipiscing elit"
      timestamp="December 1, 1977"
      heroImageUrl="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      heroImageCaption="Lorem ipsum dolor"
      heroImageAltText=""
      dek="Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at montes vitae tempor enim, venenatis tristique feugiat arcu dis ridiculus."
      authorName="Bryan Brussee"
      authorBioUrl="https://www.startribune.com/bryan-brussee/8455834"
    />
  </GridRow>

  <GridRow>
    <ArticleBody />
  </GridRow>
</Grid>
```

#### Default example
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
  /** @type {{variant?: "default" | "immersiveWrapper", additionalClasses?: string, children?: function}} */
  let { variant = "default", additionalClasses = "", children } = $props();

  let variantStyles = $derived.by(() => {
    switch (variant) {
      case "default":
        return;
      case "immersiveWrapper":
        return "gap-y-8 md:gap-y-10 px-4 md:px-6 min-[1080px]:px-0";
    }
  });
</script>

<div
  class="grid grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 max-w-[67.5rem] mx-auto {variantStyles} {additionalClasses}"
>
  {@render children?.()}
</div>
