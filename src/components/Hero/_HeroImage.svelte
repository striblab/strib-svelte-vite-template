<script>
  import ImageCaption from "../Shared/_ImageCaption.svelte";

  let { variant = "captionUnder", img, caption } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "captionUnder":
      variantStyles = "px-4 mx-auto";
      break;
    case "captionOver":
      variantStyles = "absolute bottom-2 right-4";
      break;
  }
</script>

<figure class="relative">
  <div
    class="{!img &&
      'bg-surface-panel'} relative aspect-square md:aspect-[4/3] lg:aspect-[5/3] xl:aspect-[6/3] xl:max-w-[1800px] mb-2"
  >
    {@render img()}
  </div>

  <figcaption class="{variantStyles} max-w-4xl">
    <ImageCaption>
      {@render caption()}
    </ImageCaption>
  </figcaption>
</figure>
