<!-- 
@component
### Image component
Renders a figure tag with nested image and figcaption tags in the style of the Immersive Template.  

#### Optional properties
- src: string;
- alt: string;
- caption: string;
- variant: "default" | "captionCentered";

#### Variants
- default: Figure tag renders to the size of its parent container. On mobile, caption will be indented. On tablet and desktop, caption will align with left edge of container. Recommended for use inside "fullBleed" GridRow variant at mobile sizes and "default" and "inline" GridRow variants at all viewport sizes.
- captionCentered: Figure tag renders to the size of its parent container. On mobile, caption will be indented. On tablet and desktop, caption will be centered. Ideal inside "fullBleed" GridRow variant at all viewport sizes.

#### Example
```svelte
<GridRow variant="fullBleed">
<Image
src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
alt="Please don't leave out the alt text!"
caption="This image will render as the fullBleed variant"
variant="captionCentered"
>
</GridRow>
```
-->

<script>
  import ImageCaption from "./_ImageCaption.svelte";

  /** @type {{src?: string; alt?: string; caption?: string; variant?: "default" | "captionCentered", additionalClasses?: String}} */
  let {
    src = "",
    alt = "",
    caption = "Caption tk tk tk",
    variant = "default",
    additionalClasses = "",
  } = $props();

  let variantStylesFigure = $state("");
  let variantStylesImg = $state("");
  let variantStylesCaption = $state("");

  switch (variant) {
    case "default":
      variantStylesCaption = "md:px-0";
      break;
    case "captionCentered":
      variantStylesCaption = "md:text-center";
      break;
  }
</script>

<figure class="pt-5 {variantStylesFigure} {additionalClasses}">
  {#if src}
    <img {src} {alt} class="{variantStylesImg} w-full mb-2" />
  {/if}
  <ImageCaption additionalClasses="px-4 {variantStylesCaption}">
    {caption}
  </ImageCaption>
</figure>
