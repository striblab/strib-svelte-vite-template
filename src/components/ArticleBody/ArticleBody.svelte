<!-- 
@component
### ArticleBody component
This is a general workspace illustrating what an article body might look like if you use only the included components.  
ArticleBody doesn't accept any props. All contents will need to be hand-placed by a designer directly inside this component.  
In this example, Grid and GridRow help establish the width of the article body's contents. Documentation included with those components and accessed by VSCode tooltip explains each component in greater detail detail.
-->

<script>
  import ResultsScrolly from "../ResultsScrolly.svelte";
  import Grid from "../Grid/Grid.svelte";
  import GridRow from "../Grid/_GridRow.svelte";
  import Subhead from "./_Subhead.svelte";
  import Paragraph from "./_Paragraph.svelte";
  import Image from "../Image/Image.svelte";

  const {
    isMobile,
  } = $props();

</script>

<Grid additionalClasses={"gap-y-5"}>

  <GridRow variant={"default"} additionalClasses={"gap-y-5"}>
    <ResultsScrolly
      {isMobile}
    />
  </GridRow>

  <!-- <GridRow variant={"inline"} additionalClasses={"gap-y-5"}>
    <Paragraph
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. <a
        href="https://www.startribune.com/"
        target="_blank"
        rel="noreferrer">Debitis quas</a
      >, facilis itaque minus totam repudiandae magnam esse asperiores
      temporibus sed laborum nisi ut corporis ab officiis dolorum odio, porro
      eveniet.</Paragraph
    > -->

    <!-- <Paragraph
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

  <GridRow>
    <Image
      variant={"fullBleed"}
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow>

  <GridRow variant={"inline"} additionalClasses={"gap-y-5"}>
    <Paragraph
      >Quam consectetur iure impedit consequatur deleniti esse asperiores
      corrupti et facilis debitis aut aspernatur consequuntur, ipsum repellendus
      maiores, vero harum quis non eum voluptates. Ex quis repudiandae
      reiciendis sunt neque?</Paragraph
    >

    <Image
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />

    <Subhead>Subhead</Subhead>

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

    <Paragraph
      >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non quam
      suscipit omnis asperiores cupiditate, a eos, aliquid libero, reprehenderit
      rerum excepturi ex. Eius perferendis rem fugit nostrum eveniet magnam.</Paragraph
    >
  </GridRow>

  <GridRow>
    <Image
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow> -->
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
