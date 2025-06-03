<script>
  import HeroSectionLabel from "./_SectionLabel.svelte";
  import Headline from "./_Headline.svelte";
  import Timestamp from "./_Timestamp.svelte";
  import Image from "../Image/Image.svelte";
  import Dek from "./_Dek.svelte";
  import Byline from "./_Byline.svelte";
</script>

<div class="mb-8 px-4">
  <div
    class="grid grid-cols-8 lg:grid-cols-12 md:justify-items-center gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-8 md:gap-y-10 max-w-[67.5rem] mx-auto"
  >
    <div class="col-span-full">
      <div>
        <div class="flex justify-center my-6">
          <HeroSectionLabel>Section label</HeroSectionLabel>
        </div>
        <div>
          <div class="col-span-full">
            <div class="flex flex-col gap-y-6 md:gap-y-8 text-center">
              <Headline
                >Lorem ipsum dolor sit amet consectetur adipiscing elit</Headline
              >
              <Timestamp>Dec. 1, 1977</Timestamp>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-span-full w-screen md:text-center -mx-4 md:mx-0 max-w-[1800px]"
    >
      <Image caption={"Tk tk tk tk"} variant={"inlineCaption"} />
    </div>

    <div
      class="col-span-full lg:grid lg:max-w-[712px] md:max-w-[535px] md:text-center"
    >
      <div
        class="flex flex-col gap-y-5 md:justify-items-center md:items-center"
      >
        <Dek>
          Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis
          at montes vitae tempor enim, venenatis tristique feugiat arcu dis
          ridiculus.
        </Dek>

        <div class="flex items-center w-full gap-x-2 md:justify-center">
          <div class="flex flex-col gap-y-0.5 gap-x-1 md:flex-row">
            <div class="flex">
              <Byline href="https://www.startribune.com/bryan-brussee/8455834"
                >By Bryan Brussee</Byline
              >
            </div>

            <span class="text-text-secondary font-utility-label-reg-02">
              The Minnesota Star Tribune
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
