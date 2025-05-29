<script>
  import HeroImage from "./_HeroImage.svelte";
  import HeroSectionLabel from "./_HeroSectionLabel.svelte";
  import HeroHeadline from "./_HeroHeadline.svelte";
  import HeroDek from "./_HeroDek.svelte";
  import HeroByline from "./_HeroByline.svelte";
  import HeroTimestamp from "./_HeroTimestamp.svelte";
</script>

<section>
  <div class="mb-16">
    <HeroImage>
      {#snippet img()}
        <img
          class="w-full h-full object-cover"
          src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg?dpr=2&auto=format&w=1800&fit=crop"
          alt="A placeholder asset featuring a dark gray icon of a photograph against a light gray background."
        />
      {/snippet}
      {#snippet caption()}
        Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at
        montes vitae tempor enim, venenatis tristique feugiat arcu dis
        ridiculus.
      {/snippet}
    </HeroImage>
  </div>

  <div class="mx-auto px-4 max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
    <div class="text-center block mb-5">
      <HeroSectionLabel>Section label</HeroSectionLabel>
    </div>
    <div
      class="flex flex-col gap-8 max-w-[800px] mx-auto mb-8 px-3 text-center"
    >
      <HeroHeadline>
        Lorem ipsum dolor sit amet consectetur adipiscing elit
      </HeroHeadline>
      <HeroDek>
        Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at
        montes vitae tempor enim, venenatis tristique feugiat arcu dis
        ridiculus.
      </HeroDek>
    </div>
  </div>

  <div class="flex flex-col gap-3 flex-wrap max-w-2xl px-4 mx-auto mb-8">
    <HeroByline>
      By <a
        class="no-underline"
        href="https://www.startribune.com/staff-directory/"
        target="_blank">Author Name</a
      >, photos by
      <a
        class="no-underline"
        href="https://www.startribune.com/staff-directory/"
        target="_blank"
      >
        Photographer Name
      </a>
    </HeroByline>
    <HeroTimestamp>Month 00, 0000 at 12:01am</HeroTimestamp>
  </div>
</section>
