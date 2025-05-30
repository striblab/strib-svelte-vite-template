<script>
  import ImageCaption from "../Shared/_ImageCaption.svelte";

  let {
    imgUrl = "https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg",
    caption = "Caption tk tk tk",
    variant = "default",
  } = $props();

  let variantStylesFigure = $state("");
  let variantStylesImg = $state("");
  let variantStylesCaption = $state("");

  switch (variant) {
    case "default":
      variantStylesFigure = "";
      variantStylesImg = "";
      variantStylesCaption = "";
      break;
    //several assumptins about the configuration of the article body's grid container here;
    case "inlineCaption":
      variantStylesCaption =
        "pl-4 md:pl-[calc(((100vw-64px)/8)+32px)] lg:max-w-[calc(min(100vw,1140px)/2)] lg:mx-auto lg:pl-0";
      break;
  }
</script>

<figure class={variantStylesFigure}>
  <img class="{variantStylesImg} mb-2" src={imgUrl} alt="" />
  <div class={variantStylesCaption}>
    <ImageCaption>{caption}</ImageCaption>
  </div>
</figure>
