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

  //sort of weird that three is the mimnimum supported here
  let {
    imgs = [
      "https://arc.stimg.co/startribunemedia/5K6ZGY6TU5D4TH7O22FA452H2U.jpg",
      "https://arc.stimg.co/startribunemedia/5K6ZGY6TU5D4TH7O22FA452H2U.jpg",
      "https://arc.stimg.co/startribunemedia/5K6ZGY6TU5D4TH7O22FA452H2U.jpg",
      "https://arc.stimg.co/startribunemedia/5K6ZGY6TU5D4TH7O22FA452H2U.jpg",
    ],
  } = $props();

  const id = $props.id();
  const nextClass = `swiper-button-next-${id}`;
  const prevClass = `swiper-button-prev-${id}`;

  //TODO: Fit this to dynamic behavior defined at https://github.com/MinneapolisStarTribune/startribune-web/blob/main/src/molecules/ArticleToolkit/PhotoGallery/PhotoGallery.tsx
  const gallerySpaceBetween = 24;

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
    spaceBetween: gallerySpaceBetween,
    on: {
      init() {},
    },
  };

  function setupSwiper(node) {
    Object.assign(node, swiperParams);
    node.initialize();
  }
</script>

<div class="">
  <div class="mb-2">
    <swiper-container aria-live="polite" init="false" use:setupSwiper>
      {#each imgs as img}
        <swiper-slide class="max-w-[1080px]">
          <img src={img} alt="" />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <div class="flex flex-row justify-end gap-1.5 max-w-[1080px] mx-auto">
    <IconButton icon="/svg/chevron-left.svg" additionalClasses={prevClass} />
    <IconButton icon="/svg/chevron-right.svg" additionalClasses={nextClass} />
  </div>
</div>
