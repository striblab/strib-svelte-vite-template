<script>
  import Map from './components/Map.svelte';
  import Scrolly from './components/Scrolly.svelte';
  import { mobile } from "./data/stores.js";

  let scrollIndex = 0;

  let innerWidth

  $: if (innerWidth < 768) {
    $mobile = true;
  } else {
    $mobile = false;
  }

</script>

<svelte:window bind:innerWidth />

<main class="relative" style="height: 400vh;">
  <Scrolly bind:value={scrollIndex}>
    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>When Europeans arrived in Minnesota, they found a prairie landscape that was far wetter than the farms they replaced it with.</p>
        <svg class="mt-2" width="300" height="30">
          <g>
            <rect x="0" y="10" width="20" height="20" fill="#B6E32B" />
            <text x="30" y="25" class="font-utility-label-reg-01">Prairie wetlands in the mid-1800s</text>
          </g>
        </svg>
      </div>
    </section>

    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>Settlers systematically dried out the wetlands with ditches and underground pipes known as tile drainage.</p>
        <svg class="mt-2" width="300" height="30">
          <g>
            <rect x="0" y="10" width="20" height="20" fill="#BAA8D7" />
            <text x="30" y="25" class="font-utility-label-reg-01">Subsurface tile drainage</text>
          </g>
        </svg>
        <svg width="300" height="30">
          <g>
            <rect x="0" y="10" width="20" height="20" fill="#D6FB65" fill-opacity=0.3 stroke="#8FB323" stroke-width=1/>
            <text x="30" y="25" class="font-utility-label-reg-01">Former wetlands</text>
          </g>
        </svg>
      </div>
    </section>

    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>Today, only 5% of the original wet prairies remain. The underground plumbing keeps today’s farm fields from turning into wetlands again.</p>
        <svg class="mt-2" width="300" height="30">
          <g>
            <rect x="0" y="10" width="20" height="20" fill="#B6E32B" />
            <text x="30" y="25" class="font-utility-label-reg-01">Remaining prairie wetlands</text>
          </g>
        </svg>
      </div>
    </section>

    <section class="h-screen flex flex-col justify-center items-center step">
      <div class="z-10 font-editorial-body-reg-01 bg-white p-4 md:p-7 h-min rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <p>Duck hunters have been instrumental in removing tile drainage to bring the wet prairies back. Ducks Unlimited has identified over 1.7 million acres of former wetlands that could still be restored.</p>
        <svg class="mt-2" width="300" height="30">
          <g>
            <rect x="0" y="10" width="20" height="20" fill="#A6D4C3" />
            <text x="30" y="25" class="font-utility-label-reg-01">Restorable wetlands</text>
          </g>
        </svg>
      </div>
    </section>
  </Scrolly>
  <div class="fixed top-0 w-full h-screen z-0">
    <Map {scrollIndex} />
  </div>
</main>