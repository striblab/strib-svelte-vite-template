<script>
  import "swiper/css";
  import "swiper/css/grid";
  import "swiper/css/navigation";
  import "swiper/css/effect-coverflow";
  import {
    Navigation,
    A11y,
    Pagination,
    EffectCoverflow,
  } from "swiper/modules";

  import IconButton from "../Button/IconButton.svelte";

  let {
    imgs = [
      {
        img: "https://arc.stimg.co/startribunemedia/5K6ZGY6TU5D4TH7O22FA452H2U.jpg",
        caption: "Caption 1 tk tk tk",
      },
    ],
  } = $props();

  //sort of weird, but 5 images is the fewest that can be gracefully looped
  //hence, this function, which effectively appends on image array to itself until it can be gracefully looped
  let paddedImgs = $derived(imgs.length < 5 ? padImgs(imgs) : imgs);

  let activeIndex = $state(0);

  const id = $props.id();
  const nextClass = `swiper-button-next-${id}`;
  const prevClass = `swiper-button-prev-${id}`;

  const swiperParams = {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    pagination: { dynamicBullets: true },
    modules: [Navigation, A11y, Pagination, EffectCoverflow],
    navigation: {
      nextEl: `.${nextClass}`,
      prevEl: `.${prevClass}`,
    },
    spaceBetween: 8,
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
      1160: {
        spaceBetween: 24,
      },
    },
    on: {
      init() {},
      slideChange() {
        //realIndex is appropriate for a looping gallery
        activeIndex = this.realIndex;
      },
    },
  };

  function setupSwiper(node) {
    Object.assign(node, swiperParams);
    node.initialize();
  }

  function padImgs(imgs) {
    let paddedImgs = [...imgs];

    while (paddedImgs.length < 5) {
      paddedImgs.push(...paddedImgs);
    }

    return paddedImgs;
  }
</script>

<div class="pt-5">
  <div class="mb-2">
    <swiper-container aria-live="polite" init="false" use:setupSwiper>
      {#each paddedImgs as img}
        {console.log(img)}
        <swiper-slide
          class="max-[389px]:w-[90%] max-w-[22.375rem] md:max-w-[33.4375rem] lg:max-w-[67.5rem]"
        >
          <img src={img.img} alt="" />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <div
    class="flex flex-row justify-between gap-5 max-w-[22.375rem] md:max-w-[33.4375rem] lg:max-w-[67.5rem] max-lg:px-4 mx-auto"
  >
    <div class=" font-utility-meta-reg-02 text-text-secondary">
      {paddedImgs[activeIndex].caption}
    </div>

    <div class="flex flex-row justify-end gap-1.5">
      <IconButton icon="/svg/chevron-left.svg" additionalClasses={prevClass} />
      <IconButton icon="/svg/chevron-right.svg" additionalClasses={nextClass} />
    </div>
  </div>
</div>
