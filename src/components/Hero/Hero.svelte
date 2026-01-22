<!--
@component
### Hero component 
Renders a visual replica of the Immersive Template hero. 

#### Optional properties
- sectionLabel: string;
- headline: string;
- timestamp: string;
- heroImageUrl: string;
- heroImageCaption: string;
- heroImageAltText: string;
- dek: string;
- authorName: string;
- authorBioUrl: string;

#### Example
```svelte
<Hero
  sectionLabel = "Section label",
  headline = "Lorem ipsum dolor sit amet consectetur adipiscing elit",
  timestamp = "Dec. 1, 1977",
  heroImageUrl = "https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg",
  heroImageCaption = "",
  heroImageAltText = "",
  dek = "Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at montes vitae tempor enim, venenatis tristique feugiat arcu dis ridiculus.",
  authorName = "Bryan Brussee",
  authorBioUrl = "https://www.startribune.com/bryan-brussee/8455834",
>
```
-->

<script>
  import Grid from "../Grid/Grid.svelte";
  import GridRow from "../Grid/_GridRow.svelte";
  import SectionLabel from "./_SectionLabel.svelte";
  import Headline from "./_Headline.svelte";
  import Timestamp from "./_Timestamp.svelte";
  import Image from "../Image/Image.svelte";
  import Dek from "./_Dek.svelte";
  import Byline from "./_Byline.svelte";

  /** @type {{sectionLabel?: string; headline?: string; timestamp?: string; heroImageUrl?: string; heroImageCaption?: string; heroImageAltText?: string; dek?: string; authorName?: string; authorBioUrl?: string;}} */
  let {
    sectionLabel = "",
    headline = "",
    timestamp = "",
    heroImageUrl = "",
    heroImageCaption = "",
    heroImageAltText = "",
    dek = "",
    authorName = "",
    authorBioUrl = "",
  } = $props();
</script>

<Grid>



  <GridRow variant={"fullBleed"}
  >
  <div class="project-inner lg:max-w-8xl mx-auto pb-4">
			
			<!-- custom hero with absolute positioning -->
					<div class="block md:hidden bg-[#001E2B] pt-8 pl-2">
						 
			<h1 class="!max-w-[92vw] px-2 pb-4 block md:hidden font-[publico-banner-black] text-left text-[calc(1.8vw_+_1.5rem)] xl:text-7xl lg:text-7xl md:text-6xl leading-heading-extra-tight text-white">
				These Minnesota teens are<br>pushing back on ICE — and<br>telling their stories</h1>

			<div class="byline rt-Box col-span-full flex items-center gap-x-2 flex-wrap max-w-2xl px-2 mx-auto font-utility-label-reg-02 pt-1 pb-8 !text-[12px] ">
				<div class="rt-Box col-span-full flex items-center gap-x-2 flex-wrap">
					<div class="rt-Box w-full mb-3 flex items-center gap-x-2">
						<div class="rt-Box flex flex-col gap-y-0.5">
							<div class="rt-Box flex items-center">
						<p class="!text-[#acd1e1] !text-[12px] rt-Text font-utility-label-bold-02 text-text-primary relative mr-2">By <a class="!no-underline" href="https://www.startribune.com/author/laura-yuen/8127999" target="_blank">Laura Yuen</a>, photos by <a class="!no-underline" href="https://www.startribune.com/author/renee-jones-schneider/6370547" target="_blank">Renée Jones Schneider</a></p>
							</div>
					<span class="!text-[#acd1e1] !text-[12px] rt-Text text-text-secondary font-utility-label-reg-02">The Minnesota Star Tribune</span>
						</div>
					</div>
					<div class="rt-Flex flex rt-r-display-flex rt-r-jc-start">
				<span class="!text-[#acd1e1]  !text-[11px] rt-Text font-utility-label-reg-caps-03 text-text-secondary ">January 25, 2026 at 7:30am</span>
					</div>
				</div>
			</div>


					</div>
					<div class="block md:hidden aspect-[.9/1] bg-no-repeat bg-cover bg-center relative mx-auto" style="background-image: url('https://arc.stimg.co/startribunemedia/3QXYICNCLJHJDE2DTFQNJW7ZBE.jpg?dpr=2&amp;auto=format&amp;w=1800'); ">		</div>
			


					<div class="hidden md:block xl:aspect-[1.7/1] xl:max-w-full lg:aspect-[1.6/1] md:aspect-[5/3] bg-no-repeat bg-cover bg-top-right relative mx-auto" style="background-image: url('https://arc.stimg.co/startribunemedia/3QXYICNCLJHJDE2DTFQNJW7ZBE.jpg?dpr=2&amp;auto=format&amp;w=1800');">
						<div class="w-full pt-6 pl-6 pb-2 !text-left absolute top-[0px] left-[0px] bg-[rgb(197_222_224_/_0.6)] max-w-[53.5vw] shadow-[0_0px_40px_rgba(197_222_224_/_1)]">
					<h1 class="font-[publico-banner-black] text-left !text-[calc(3vw_+_0.5rem)] leading-heading-extra-tight !text-[#001e2b] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] ">
						These Minnesota teens are<br>pushing back on ICE — and<br>telling their stories</h1>
            			<h2 class="hidden md:block !text-[calc(.8vw_+_.8rem)] !leading-1.25 max-w-[35vw] ml-0 mr-auto font-editorial-body-reg-01 font-regular   text-left mt-6 mb-3 text-[#001e2b]">Students from across the Twin Cities describe walkouts, grocery runs and growing up fast amid immigration raids.</h2>

                  <p class="!text-[#001e2b] !text-[calc(.3vw_+_.6rem)] rt-Text font-utility-label-bold-02 text-text-primary relative mr-2">By <a class="!no-underline" href="https://www.startribune.com/author/laura-yuen/8127999" target="_blank">Laura Yuen</a>, photos by <a class="!no-underline" href="https://www.startribune.com/author/renee-jones-schneider/6370547" target="_blank">Renée Jones Schneider</a></p>
                  				<span class="!text-[#001e2b]  !text-[calc(.3vw_+_.5rem)] tracking-[1.75px] rt-Text font-utility-label-reg-caps-03 text-text-secondary ">January 25, 2026 at 7:30am</span>

						</div>
					</div>
					


			<h2 class="block md:hidden xs:!text-[22px] !leading-1.25 px-3 w-full max-w-2xl px-4 mx-auto font-editorial-body-reg-01 font-regular  pb-4 text-left mx-auto mt-12 text-primary">Students from across the Twin Cities describe walkouts, grocery runs and growing up fast amid immigration raids. </h2>
					</div>
            </GridRow>
</Grid>
