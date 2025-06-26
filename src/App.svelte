<script>
  import Grid from "./components/Grid/Grid.svelte";
  import GridRow from "./components/Grid/_GridRow.svelte";
  import ArticleBody from "./components/ArticleBody/ArticleBody.svelte";
  import Hero from "./components/Hero/Hero.svelte";
</script>

<Grid additionalClasses="gap-y-8 md:gap-y-10 px-4">
  <GridRow>
    <Hero />
  </GridRow>

  <GridRow>
    <ArticleBody />
  </GridRow>
</Grid>
