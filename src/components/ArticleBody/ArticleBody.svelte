<script>
  import Image from "./_Image.svelte";
  import Paragraph from "./_Paragraph.svelte";
  import GridWrapper from "./_GridWrapper.svelte";
</script>

<section class="max-w-[1140px] mx-4 md:mx-8 lg:mx-auto">
  <div
    class="grid grid-cols-4 grid-rows-1 gap-x-4 gap-y-5 md:grid-cols-8 lg:grid-cols-12"
  >
    <GridWrapper>
      <Paragraph
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. <a
          href="https://www.startribune.com/"
          target="_blank"
          rel="noreferrer">Debitis quas</a
        >, facilis itaque minus totam repudiandae magnam esse asperiores
        temporibus sed laborum nisi ut corporis ab officiis dolorum odio, porro
        eveniet.</Paragraph
      >

      <Paragraph
        >Voluptate molestiae, perferendis iusto dolor officiis eaque cum
        quisquam quidem, doloremque dicta temporibus fuga ducimus voluptatum
        excepturi ratione laborum ab omnis quibusdam, accusamus vel eum culpa
        repellendus exercitationem. Fugit, consequatur!</Paragraph
      >

      <Paragraph
        >Voluptate molestiae, perferendis iusto dolor officiis eaque cum
        quisquam quidem, doloremque dicta temporibus fuga ducimus voluptatum
        excepturi ratione laborum ab omnis quibusdam, accusamus vel eum culpa
        repellendus exercitationem. Fugit, consequatur!</Paragraph
      >
    </GridWrapper>

    <GridWrapper variant={"wide"}>
      <Image variant={"inlineCaption"} />
    </GridWrapper>

    <GridWrapper>
      <Paragraph
        >Quam consectetur iure impedit consequatur deleniti esse asperiores
        corrupti et facilis debitis aut aspernatur consequuntur, ipsum
        repellendus maiores, vero harum quis non eum voluptates. Ex quis
        repudiandae reiciendis sunt neque?</Paragraph
      >

      <Image />

      <Paragraph
        >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non
        quam suscipit omnis asperiores cupiditate, a eos, aliquid libero,
        reprehenderit rerum excepturi ex. Eius perferendis rem fugit nostrum
        eveniet magnam.</Paragraph
      >

      <Paragraph
        >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non
        quam suscipit omnis asperiores cupiditate, a eos, aliquid libero,
        reprehenderit rerum excepturi ex. Eius perferendis rem fugit nostrum
        eveniet magnam.</Paragraph
      >

      <Paragraph
        >Quis quaerat tempore adipisci nostrum quia non. Provident, eum! Non
        quam suscipit omnis asperiores cupiditate, a eos, aliquid libero,
        reprehenderit rerum excepturi ex. Eius perferendis rem fugit nostrum
        eveniet magnam.</Paragraph
      >
      <Image />
    </GridWrapper>
  </div>
</section>

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
