<script>
  import StoryBody from './templates/StoryBody.svelte';
  import FeaturedMedia from './templates/FeaturedMedia.svelte';
  import HeadlineByline from './templates/HeadlineByline.svelte';
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
