<!-- 
@component
- Replicates the grid layout used by the Immersive Template
- Uses four columns for mobile, eight columns for tablet and twelve columns for desktop viewports
- Gaps between columns are 16 pixels wide on mobile and tablet and 20 pixels wide on desktop
- The prop 'additionalClasses' can recieve any number of addtional classes
- Some common uses are passing in a Tailwind class for padding or establishing gaps between rows
- This component is best used with the GridRow component, which helps establish how many columns each row in the grid spans.

@example
```svelte
<Grid additionalClasses="gap-y-5">
 <GridRow>
    <Paragraph>
      This paragraph will span the full width of the grid
    </Paragraph>
 </GridRow>
</Grid>
```
 
-->

<script>
  let { children, additionalClasses = "" } = $props();
</script>

<div
  class="grid grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-6 max-w-[67.5rem] mx-auto {additionalClasses}"
>
  {@render children()}
</div>
