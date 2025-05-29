<script>
  import ImageCaption from "../Shared/_ImageCaption.svelte";

  let { img, caption } = $props();
</script>

<figure>
  <div
    class="{!img &&
      'bg-surface-panel'} aspect-square md:aspect-[4/3] lg:aspect-[5/3] xl:aspect-[6/3] xl:max-w-[1800px] mb-2"
  >
    {@render img()}
  </div>

  <figcaption class="xs:text-left md:text-center max-w-4xl mx-auto px-4">
    <ImageCaption>
      {@render caption()}
    </ImageCaption>
  </figcaption>
</figure>
