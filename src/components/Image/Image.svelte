<!-- 
@component
### Image component
Renders a figure tag with nested image and figcaption tags in the style of the Immersive Template.  

#### Optional properties
- src: string;
- alt: string;
- caption: string;
- variant: "default" | "fullBleed";

#### Variants
- default: Figure tag renders renders edge-to-edge on mobile (i.e. full width inside its container plus 32 pixels in negative margin). Figure renders the width of its parent container on tablet and desktop.
- fullBleed: Figure tag renders edge-to-edge across mobile, tablet and desktop up to 1800 pixels. 

#### Example
```svelte
<Image
src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
alt="Please don't leave out the alt text!"
caption="This image will render as the fullBleed variant"
variant="fullBleed"
>
```
-->

<script>
  import ImageCaption from "./_ImageCaption.svelte";

  /** @type {{src?: string; alt?: string; caption?: string; variant?: "default" | "fullBleed"}} */
  let {
    src = "",
    alt = "",
    caption = "Caption tk tk tk",
    variant = "default",
  } = $props();

  let variantStylesFigure = $state("");
  let variantStylesImg = $state("");
  let variantStylesCaption = $state("");

  switch (variant) {
    case "default":
      break;
    case "fullBleed":
      variantStylesFigure = "w-screen max-w-[1800px] justify-self-center";
      variantStylesCaption = "md:text-center";
      break;
  }
</script>

<figure class="-mx-4 md:mx-0 {variantStylesFigure}">
  {#if src}
    <img {src} {alt} class="{variantStylesImg} w-full mb-2" />
  {/if}
  <ImageCaption additionalClasses="px-4 md:px-0 {variantStylesCaption}">
    {caption}
  </ImageCaption>
</figure>
