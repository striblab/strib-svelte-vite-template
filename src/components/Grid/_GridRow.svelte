<!-- 
@component
- To be used inside of the Grid component, the GridRow component establishes how many columns a given row of the grid spans
- Two variants are supported
- The first variant will always span the width of the grid
- A full-width GridRow is a good idea for high-impact images or larger graphics

@example
```svelte
<Grid>
  <GridRow>
    <Paragraph>Running a paragraph at full width, like I am here, is likely impractical but hopefully a helpful example</Paragraph>
  </GridRow>
</Grid>
```

- The second variant, "inline", will span the full width of the grid on mobile but only take up the center six columns on tablet and desktop
- This is perfect for article body paragraphs and lower-impact images
@example
```svelte
<Grid>
  <GridRow variant="inline">
    <Paragraph>This is a much more reasonable presentation for a humble paragraph</Paragraph>
  </GridRow>
</Grid>
```

- Lastly, GridRow accepts any number of additional classes. For example, you can pass in a Tailwind Class to establish vertical spacing between child elements.
```svelte
<Grid>
  <GridRow variant="inline" additionalClasses="gap-y-5">
    <Paragraph>This is a paragraph.</Paragraph>
    <Paragraph>And here is yet another paragraph, spaced 20 pixels below the one above.</Paragraph>
    <Paragraph>Configured this way, the GridRow becomes a very reasonable article body, with spacing controlled by the 'gap-y-5' Tailwind class rather than its chilren's margins and padding.</Paragraph>
    <Paragraph>You can place Image components or any HTML in here as you wish.</Paragraph>
  </GridRow>
</Grid>
```
-->

<script>
  import { onMount } from "svelte";

  let { children, variant = "default", additionalClasses = "" } = $props();

  let variantStyles = $state("");

  onMount(() => {
    switch (variant) {
      case "default":
        variantStyles = "col-span-full";
        break;
      case "inline":
        variantStyles =
          "col-span-full grid md:col-start-2 md:col-span-6 lg:col-start-4";
        break;
    }
  });
</script>

<div class="{variantStyles} {additionalClasses}">
  {@render children()}
</div>
