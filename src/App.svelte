<script>
  import seo from "./config/seo.json";

  import Header from "./components/page/Header.svelte";
  import Footer from "./components/page/Footer.svelte";

  import GaTrackingHead from "./components/seo/GATracking.svelte";
  import Meta from "./components/seo/Meta.svelte";


  let message = "Hello world!"

</script>

<Meta
{seo}
/>

<GaTrackingHead
{seo}
/>


<Header/>

<main class="px-4 lg:px-20 pt-8">
  <h1 class="font-editorial-news-heading-02">{message}</h1>
</main>

<Footer/>

<style>

</style>
