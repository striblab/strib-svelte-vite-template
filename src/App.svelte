<script>
  import Header from "./components/page/Header.svelte";
  import Footer from "./components/page/Footer.svelte";

  let message = "Hello world!"
</script>

<Header/>

<main class="px-4 lg:px-20 pt-8">
  <h1 class="font-editorial-news-heading-02">{message}</h1>
</main>

<Footer/>

<style>

</style>
