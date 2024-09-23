<script>

  import { Child } from "pym.js";
  import { onMount } from "svelte";

  let message = "Hello world!"

  onMount(() => {
        const pymChild = new Child({ polling: 500});
        pymChild.sendHeight();
    })

</script>

<main class="px-4 lg:px-20 pt-8">
  <h1 class="font-editorial-news-heading-02">{message}</h1>
</main>

<style>

</style>
