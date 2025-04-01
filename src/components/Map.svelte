<script>
    import { onMount } from 'svelte';
    import maplibregl from 'maplibre-gl';
  
    let mapContainer;
  
    onMount(() => {
      const map = new maplibregl.Map({
        container: mapContainer,
        style: 'https://api.maptiler.com/maps/landscape/style.json?key=vEtG6YUag2WpDIiNOgGm',
        center: [-94, 47],
        zoom: 6,
        interactive: false

      });
      });
</script>

<div bind:this={mapContainer} class="w-full h-screen"></div>