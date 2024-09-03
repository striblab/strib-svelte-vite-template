<script>
  import Header from "./components/page/Header.svelte";
  import Footer from "./components/page/Footer.svelte";

  let message = "Hello world!"
</script>

<Header/>

<main class="grid lg:grid-cols-12 gap-4 md:gap-6 lg:mx-auto md:mx-6 max-w-[67.5rem] grid-cols-8 px-4 md:px-0">
  <h1 class="font-editorial-news-heading-02">{message}</h1>
</main>

<Footer/>

<style>

</style>
