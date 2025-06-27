<!-- 
@component
- Renders a figure with image and caption in the style of the Immersive Template. Two variants are supported. 
- The default variant renders an image that fills its container on tablet and desktop. On mobile, the default variant will expand slightly beyond its container, to create an edge to edge presentation.

@example
```svelte
<Image
imgUrl="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
caption="This is my caption"
altText="Please don't leave out the alt text!"
>
```

- The other variant, fullBleed, renders an image the width of the viewport across mobile, tablet and desktop monitors up to 1800px.
- This variant is appropriate for both Hero images and full bleed images further down in the body.

```svelte
<Image
variant="fullbleed"
imgUrl="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
caption="This is my caption"
altText="Please don't leave out the alt text!"
>
```
 
-->

<script>
  import ImageCaption from "./_ImageCaption.svelte";

  let { imgUrl, caption, altText, variant = "default" } = $props();

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
  <img src={imgUrl} alt={altText} class="{variantStylesImg} w-full mb-2" />
  <ImageCaption additionalClasses="px-4 md:px-0 {variantStylesCaption}">
    {caption}
  </ImageCaption>
</figure>
