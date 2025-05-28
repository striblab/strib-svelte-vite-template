<script>
  import StoryBody from "./components/StoryBody.svelte";
  import FeaturedMedia from "./components/FeaturedMedia.svelte";
  import HeadlineByline from "./components/HeadlineByline.svelte";
</script>

<main class="col-span-full">
  <div class="project">
    <div class="project-inner lg:max-w-8xl mx-auto pb-4">
      <FeaturedMedia />
      <HeadlineByline />
      <StoryBody />
    </div>
  </div>
</main>

<style></style>
