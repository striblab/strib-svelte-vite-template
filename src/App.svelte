<script>
  import StackedHero from "./components/Hero/StackedHero.svelte";
  import OverlayedHero from "./components/Hero/OverlayedHero.svelte";
  import ArticleBody from "./components/ArticleBody/ArticleBody.svelte";
</script>

<main class="col-span-full">
  <div class="project">
    <div class="project-inner lg:max-w-8xl mx-auto pb-4">
      <!-- <StackedHero /> -->
      <OverlayedHero />
      <ArticleBody />
    </div>
  </div>
</main>
