<script>
  import Map from './components/Map.svelte';
  import Scrolly from './components/Scrolly.svelte';

  let scrollIndex = 0;
</script>

<main class="px-4 lg:px-20 pt-8">
  <!-- Pass the scrollIndex to the map -->
  <Map {scrollIndex} />
  
  <!-- The Scrolly component will update scrollIndex based on the currently visible slide -->
  <Scrolly bind:value={scrollIndex}>
    <div class="py-10">
      <h2 class="text-2xl font-bold">Slide 1</h2>
      <p>This text corresponds to dataset A.</p>
    </div>
    <div class="py-10">
      <h2 class="text-2xl font-bold">Slide 2</h2>
      <p>This text corresponds to dataset B.</p>
    </div>
    <div class="py-10">
      <h2 class="text-2xl font-bold">Slide 3</h2>
      <p>This text corresponds to dataset C.</p>
    </div>
  </Scrolly>
</main>
