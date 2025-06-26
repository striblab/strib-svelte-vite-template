<script>
  import ImageCaption from "./_ImageCaption.svelte";

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
      break;
    case "fullBleed":
      variantStylesFigure = "w-screen max-w-[1800px] justify-self-center";
      variantStylesCaption = "md:text-center";
      break;
  }
</script>

<figure class="-mx-4 md:mx-0 {variantStylesFigure}">
  <img src={imgUrl} alt="" class="{variantStylesImg} w-full mb-2" />
  <div class="px-4 md:px-0 {variantStylesCaption}">
    <ImageCaption>{caption}</ImageCaption>
  </div>
</figure>
