<!-- 
@component
### Gallery component
This component implements a swipable, mobile-friendly gallery via {@link https://swiperjs.com/element| Swiper}, the same JS library that the Immersive Template uses.
Its default design and behavior aims to mimic that of the Immersive Template, but designers are encouraged to modify as needed.

#### Properties
- imgs: An array of objects, each of which represents an image and contains the following properties: src, caption and alt. These properties expect strings and determine that image's source url, caption and alt text.

#### One Swiper quirk
Swiper galleries will not loop correctly across all viewports if they contain fewer than five images. To mitigate this behavior, this component will duplicate the passed-in image objects to pad out the gallery create the illusion of a looping gallery. 

#### Example
```svelte
  <GridRow variant="fullBleed">
      <Gallery imgs={[
        {src: "myUrl.jpg", caption="My caption.", alt="Don't forget the alt text!"},
        {src: "myUrl.jpg", caption="My caption.", alt="Don't forget the alt text!"},
        {src: "myUrl.jpg", caption="My caption.", alt="Don't forget the alt text!"},
        {src: "myUrl.jpg", caption="My caption.", alt="Don't forget the alt text!"},
        {src: "myUrl.jpg", caption="My caption.", alt="Don't forget the alt text!"},
      ]}/>
  </GridRow>
 ```  
-->

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

  import { register } from "swiper/element/bundle";

  import IconButton from "../Button/IconButton.svelte";
  let {
    imgs = [
      {
        src: "https://placehold.co/1080x720",
        caption: "Caption 1 tk tk tk",
        alt: "A grey placeholder image with white centered text that reads '1080x720' to denote the placeholder's pixel dimensions.",
      },
      {
        src: "https://placehold.co/405x720",
        caption: "Caption 2 tk tk tk",
        alt: "A grey placeholder image with white centered text that reads '405x720' to denote the placeholder's pixel dimensions.",
      },
      {
        src: "https://placehold.co/720x720",
        caption: "Caption 3 tk tk tk",
        alt: "A grey placeholder image with white centered text that reads '720x720' to denote the placeholder's pixel dimensions.",
      },
      {
        src: "https://placehold.co/1080x540",
        caption: "Caption 4 tk tk tk",
        alt: "A grey placeholder image with white centered text that reads '1080x540' to denote the placeholder's pixel dimensions.",
      },
    ],
  } = $props();

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
    },
  };

  function setupSwiper(node) {
    $effect(() => {
      if (!customElements.get("swiper-container")) {
        register();
      }

      if (!node.swiper) {
        Object.assign(node, swiperParams);
        node.initialize();
      }

      return () => {
        node.swiper.destroy(true, true);
      };
    });
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
    <swiper-container
      aria-live="polite"
      init="false"
      use:setupSwiper
      onswiperslidechange={(e) => {
        activeIndex = e.detail[0].realIndex;
      }}
    >
      {#each paddedImgs as img}
        {@const aspectRatio = (() => {
          const imageEl = new Image();
          imageEl.src = img.src;
          return imageEl.width / imageEl.height;
        })()}

        <swiper-slide
          class="aspect-[3/2] flex items-center justify-center max-[389px]:w-[90%] max-w-[22.375rem] md:max-w-[33.4375rem] lg:max-w-[67.5rem] bg-surface-reversed"
        >
          <img
            class={aspectRatio > 1.5 ? "w-full" : "h-full"}
            src={img.src}
            alt={img.alt}
          />
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <div
    class="flex flex-row justify-between gap-5 max-w-[22.375rem] md:max-w-[33.4375rem] lg:max-w-[67.5rem] max-lg:px-4 mx-auto"
  >
    <div class="font-utility-meta-reg-02 text-text-secondary">
      {paddedImgs[activeIndex].caption}
    </div>

    <div class="flex flex-row justify-end gap-1.5">
      <IconButton icon="/svg/chevron-left.svg" additionalClasses={prevClass} />
      <IconButton icon="/svg/chevron-right.svg" additionalClasses={nextClass} />
    </div>
  </div>
</div>
