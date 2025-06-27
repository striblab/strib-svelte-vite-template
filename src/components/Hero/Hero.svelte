<!--
@component 
- Renders a visual replica of the Immersive Template hero 
- This component accepts the following props

@example 
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

  let {
    sectionLabel,
    headline,
    timestamp,
    heroImageUrl,
    heroImageCaption,
    heroImageAltText,
    dek,
    authorName,
    authorBioUrl,
  } = $props();
</script>

<Grid additionalClasses="gap-y-8 md:gap-y-10 md:justify-items-center">
  <GridRow>
    <div class="flex justify-center my-6">
      <SectionLabel>{sectionLabel}</SectionLabel>
    </div>
    <div class="flex flex-col gap-y-6 md:gap-y-8 text-center">
      <Headline>{headline}</Headline>
      <Timestamp>{timestamp}</Timestamp>
    </div>
  </GridRow>

  <GridRow>
    <Image
      imgUrl={heroImageUrl}
      caption={heroImageCaption}
      altText={heroImageAltText}
      variant={"fullBleed"}
    />
  </GridRow>

  <GridRow additionalClasses="md:max-w-[535px] md:text-center lg:max-w-[712px]">
    <div class="flex flex-col gap-y-5 md:justify-items-center md:items-center">
      <Dek>
        {dek}
      </Dek>
      <div class="flex items-center w-full gap-x-2 md:justify-center">
        <div class="flex flex-col gap-y-0.5 gap-x-1 md:flex-row">
          <div class="flex">
            <Byline author={authorName} href={authorBioUrl} />
          </div>

          <span class="text-text-secondary font-utility-label-reg-02">
            The Minnesota Star Tribune
          </span>
        </div>
      </div>
    </div>
  </GridRow>
</Grid>
