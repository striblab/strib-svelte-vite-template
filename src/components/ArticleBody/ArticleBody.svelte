<!-- 
@component
### ArticleBody component
This is a general workspace illustrating what an article body might look like if you use only the components included in this template.  
ArticleBody doesn't accept any props. All contents will need to be hand-placed by a designer directly inside this component.  
In this example, Grid and GridRow help establish the width of the article body's contents. 
Documentation included with those components and accessed by VSCode tooltip explains each component in greater detail.

#### State in this component
- innerWidth: int - pixel width of the viewport.
- isMobile: boolean - derived from innerWidth, true if less than 768 pixels
- isTablet: boolean - derived from innerWidth, true if between 768 pixels inclusive and 1160 pixels exclusive
- isDesktop: boolean - derived from innerWidth, true if greater than 1160 pixels inclusive

#### Using state in this component
You can use any of the three derived states to render different variants of a GridRow component reactively.
The following example uses a ternary to render an image edge-to-edge on mobile but inline otherwise.

#### Example
```svelte
  <GridRow
    variant={isMobile ? "fullBleed" : "inline"}
  >
    <Image
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow>
```
-->

<script>
  import Grid from "../Grid/Grid.svelte";
  import GridRow from "../Grid/_GridRow.svelte";
  import Subhead from "./_Subhead.svelte";
  import Paragraph from "./_Paragraph.svelte";
  import Dropcap from "./_Dropcap.svelte";
  import Image from "../Image/Image.svelte";
  import Gallery from "../Image/Gallery.svelte";
  import ScrollySection from "../Scrolly/ScrollySection.svelte";
  import JWPlayer from "../Video/JWPlayer.svelte";

  let innerWidth = $state(0);
  let isMobile = $derived(innerWidth < 768);
  let isTablet = $derived(innerWidth >= 768 && innerWidth < 1160);
  let isDesktop = $derived(innerWidth >= 1160);
</script>

<svelte:window bind:innerWidth />
<Grid additionalClasses={"gap-y-5"}>
  <GridRow variant={"inline"} additionalClasses={"gap-y-5"}>
    <Paragraph>
      <Dropcap dropCapLines={3}>L</Dropcap>orem ipsum dolor sit amet consectetur
      adipisicing elit.
      <a href="https://www.startribune.com/" target="_blank" rel="noreferrer"
        >Debitis quas</a
      >, facilis itaque minus totam repudiandae magnam esse asperiores
      temporibus sed laborum nisi ut corporis ab officiis dolorum odio, porro
      eveniet. Quis quaerat tempore adipisci nostrum quia non.</Paragraph
    >

    <Paragraph
      >Voluptate molestiae, perferendis iusto dolor officiis eaque cum quisquam
      quidem, doloremque dicta temporibus fuga ducimus voluptatum excepturi
      ratione laborum ab omnis quibusdam, accusamus vel eum culpa repellendus
      exercitationem. Fugit, consequatur!</Paragraph
    >

    <Paragraph
      >Voluptate molestiae, perferendis iusto dolor officiis eaque cum quisquam
      quidem, doloremque dicta temporibus fuga ducimus voluptatum excepturi
      ratione laborum ab omnis quibusdam, accusamus vel eum culpa repellendus
      exercitationem. Fugit, consequatur!</Paragraph
    >
  </GridRow>

  <GridRow variant="fullBleed">
    <Gallery />
  </GridRow>

  <GridRow variant={"fullBleed"}>
    <Image
      variant={"captionCentered"}
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow>

  <GridRow variant="inline">
    <Paragraph
      >Voluptate molestiae, perferendis iusto dolor officiis eaque cum quisquam
      quidem, doloremque dicta temporibus fuga ducimus voluptatum excepturi
      ratione laborum ab omnis quibusdam, accusamus vel eum culpa repellendus
      exercitationem. Fugit, consequatur!</Paragraph
    >
  </GridRow>

  <GridRow variant={isMobile ? "fullBleed" : "inline"}>
    <Image
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow>

  <GridRow variant={"fullBleed"}>
    <ScrollySection
      data={[
        {
          step: 0,
          color: "#143D11",
          text: "In response to this card's appearance in the viewport, the background color is now #143D11.",
        },
        {
          step: 1,
          color: "#5E95D6",
          text: "In response to this card's appearance in the viewport, the background color is now #5E95D6.",
        },
        {
          step: 2,
          color: "#CCCCCC",
          text: "In response to this card's appearance in the viewport, the background color is now #CCCCCC.",
        },
        {
          step: 3,
          color: "#B13B5B",
          text: "In response to this card's appearance in the viewport, the background color is now #B13B5B.",
        },
        {
          step: 4,
          color: "#804316",
          text: "In response to this card's appearance in the viewport, the background color is now #804316.",
        },
        {
          step: 5,
          color: "#B28333",
          text: "In response to this card's appearance in the viewport, the background color is now #B28333.",
        },
        {
          step: 6,
          color: "#052949",
          text: "In response to this card's appearance in the viewport, the background color is now #052949.",
        },
      ]}
    />
  </GridRow>

  <GridRow variant="inline" additionalClasses={"gap-y-5"}>
    <Subhead>Subhead</Subhead>

    <Paragraph
      >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non quam
      suscipit omnis asperiores cupiditate, a eos, aliquid libero, reprehenderit
      rerum excepturi ex. Eius perferendis rem fugit nostrum eveniet magnam.</Paragraph
    >

    <JWPlayer
      mediaid={"hvh0xHRH"}
      aspectRatio="9:16"
      showOverlay={true}
      loop={false}
    />

    <JWPlayer
      mediaid={"0CljWbDv"}
      aspectRatio="1:1"
      showOverlay={true}
      loop={false}
    />

    <Paragraph
      >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non quam
      suscipit omnis asperiores cupiditate, a eos, aliquid libero, reprehenderit
      rerum excepturi ex. Eius perferendis rem fugit nostrum eveniet magnam.</Paragraph
    >

    <Paragraph
      >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non quam
      suscipit omnis asperiores cupiditate, a eos, aliquid libero, reprehenderit
      rerum excepturi ex. Eius perferendis rem fugit nostrum eveniet magnam.</Paragraph
    >
  </GridRow>

  <GridRow variant={isMobile ? "fullBleed" : "default"}>
    <Image
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow>
</Grid>

<style>
  a {
    text-decoration-line: underline;
    text-decoration-color: #00854b;
    text-underline-offset: 2px;
  }

  a:hover {
    color: #00854b;
  }
</style>
