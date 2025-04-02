<script>
  import Map from './components/Map.svelte';
  import Scrolly from './components/Scrolly.svelte';

  let scrollIndex = 0;
</script>

<main class="relative" style="height: 400vh;">
  <Scrolly bind:value={scrollIndex}>
    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>Before Europeans arrived in Minnesota, wetlands filled the state’s prairies.</p>
      </div>
    </section>

    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>Today, only 5% of those wet prairies remain.</p>
      </div>
    </section>

    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>They were systemically drained by ditches and tile drains, an underground system of plumbing that keeps today’s farm fields from becoming wetlands again.</p>
      </div>
    </section>

    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>Duck hunting groups have been instrumental in bringing the wet prairies back. Ducks Unlimited has identified over 1.7 million acres of former wet prairies that could still be restored.</p>
      </div>
    </section>
  </Scrolly>
  <div class="fixed top-0 w-full h-screen z-0">
    <Map {scrollIndex} />
  </div>
</main>