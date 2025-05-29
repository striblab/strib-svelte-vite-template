<script>
  import HeroSectionLabel from "./Hero/_HeroSectionLabel.svelte";
</script>

<!-- custom hero with absolute positioning -->

<div
  class="aspect-[1/1.2] xl:aspect-[6.5/3] xl:max-w-[1800px] lg:aspect-[5.5/3] md:aspect-[4.5/3] bg-no-repeat bg-cover bg-center relative mx-auto"
  style="background-image: url('https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg?dpr=2&auto=format&w=1800');"
>
  <div
    class="w-full px-4 lg:w-[835px] md:w-[705px] absolute bottom-[24px] md:bottom-[64px] left-1/2 -translate-x-1/2"
  >
    <div class="mb-4 mx-auto w-min">
      <HeroSectionLabel variant={"overlayed"} />
      <!-- <a
        href="/"
        target="_blank"
        class="uppercase !text-[white] bg-[black] p-2 font-utility-label-bold-caps-02 tracking-normal whitespace-nowrap !no-underline"
        >Section label</a
      > -->
    </div>
    <h1
      class="font-editorial-news-heading-01 text-center drop-shadow-[0px_2px_3px_rgba(102,102,102,1)] text-4xl xl:text-7xl lg:text-7xl md:text-6xl leading-heading-extra-tight uppercase text-[white]"
    >
      Lorem ipsum dolor sit amet consectetur adipiscing elit
    </h1>
  </div>
  <div
    class="rt-Box absolute bottom-[12px] right-[16px] opacity-60 font-utility-meta-reg-02"
  >
    Photo by photographer, The Minnesota Star Tribune
  </div>
</div>

<!-- end custom hero with absolute positioning -->

<!-- regular hero image -->

<div
  class="xl:max-w-[1800px] xl:aspect-[6/3] lg:aspect-[5/3] md:aspect-[4/3] xs:aspect-[3/3] bg-no-repeat bg-cover xs:bg-right mx-auto relative mb-2"
  style="background-size:cover;background-position:center;background-image: url('https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg?dpr=2&auto=format&w=1800&fit=crop');"
>
  <div
    class="rt-Box absolute bottom-[12px] right-[16px] opacity-60 font-utility-meta-reg-02"
  >
    Photo by photographer, The Minnesota Star Tribune
  </div>
</div>
<div
  class="caption font-utility-meta-reg-02 text-tertiary xs:text-left md:text-center max-w-4xl mx-auto mb-8 px-4"
>
  Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at montes
  vitae tempor enim, venenatis tristique feugiat arcu dis ridiculus. <span
    class="whitespace-nowrap !font-utility-meta-reg-02 !text-tertiary"
    >(Photographer, The Minnesota Star Tribune)</span
  >
</div>

<!-- end regular hero image -->
