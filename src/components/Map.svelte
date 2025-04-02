<script>
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import currentWetlands from '../data/current_wetlands.json';
  import formerWetlands from '../data/former_wetlands.json';
  import tiles from '../data/tiles.json';
  import restorableWetlands from '../data/restorable_wetlands.json';
  import basemap from '../data/strib-basemap.json';
  
  // Accept the scroll index as a prop from the parent
  export let scrollIndex = 0;
  
  let mapContainer;
  let map;
  
  onMount(() => {
    map = new maplibregl.Map({
      container: mapContainer,
      style: basemap,
      center: [-94, 46.5],
      zoom: 6.2,
      interactive: false
    });
    map.on('load', () => {
      map.addSource('formerWetlands', {
        type: 'geojson',
        data: formerWetlands
      });
      map.addLayer({
        id: 'former_wetlands_layer',
        type: 'fill',
        source: 'formerWetlands',
        paint: {
          'fill-color': '#B6E32B',
          'fill-opacity': 1
        }
      });
      map.addSource('currentWetlands', {
        type: 'geojson',
        data: currentWetlands
      });
      map.addLayer({
        id: 'current_wetlands_layer',
        type: 'fill',
        source: 'currentWetlands',
        paint: {
          'fill-color': '#B6E32B',
          'fill-opacity': 1
        }
      });
      map.addSource('restorableWetlands', {
        type: 'geojson',
        data: restorableWetlands
      });
      map.addLayer({
        id: 'restorable_wetlands_layer',
        type: 'fill',
        source: 'restorableWetlands',
        paint: {
          'fill-color': '#9D86C6',
          'fill-opacity': 1
        }
      });
      map.addSource('tiles', {
        type: 'geojson',
        data: tiles
      });
      map.addLayer({
        id: 'tiles_layer',
        type: 'fill',
        source: 'tiles',
        paint: {
          'fill-color': '#EA8B8B',
          'fill-opacity': 1
        }
      });
      map.addSource('formerWetlands2', {
        type: 'geojson',
        data: formerWetlands
      });
      map.addLayer({
        id: 'former_wetlands_layer_2',
        type: 'fill',
        source: 'formerWetlands2',
        paint: {
          'fill-color': '#969696',
          'fill-opacity': 0.3,
          'fill-outline-color': '#0D0D0D'
        }
      });
    map.setLayoutProperty('former_wetlands_layer', 'visibility', scrollIndex === 0 ? 'visible' : 'none');
    map.setLayoutProperty('current_wetlands_layer', 'visibility', scrollIndex === 1 ? 'visible' : 'none');
    map.setLayoutProperty('tiles_layer', 'visibility', scrollIndex === 2 ? 'visible' : 'none');
    map.setLayoutProperty('former_wetlands_layer_2', 'visibility', scrollIndex === 2 ? 'visible' : 'none');
    map.setLayoutProperty('restorable_wetlands_layer', 'visibility', scrollIndex === 3 ? 'visible' : 'none');
    
    })
  });
  
  $: if (map && map.isStyleLoaded()) {
    map.setLayoutProperty('former_wetlands_layer', 'visibility', scrollIndex === 0 ? 'visible' : 'none');
    map.setLayoutProperty('current_wetlands_layer', 'visibility', scrollIndex === 1 ? 'visible' : 'none');
    map.setLayoutProperty('tiles_layer', 'visibility', scrollIndex === 2 ? 'visible' : 'none');
    map.setLayoutProperty('former_wetlands_layer_2', 'visibility', scrollIndex === 2 ? 'visible' : 'none');
    map.setLayoutProperty('restorable_wetlands_layer', 'visibility', scrollIndex === 3 ? 'visible' : 'none');
  }

</script>

<div bind:this={mapContainer} class="w-full h-screen z-0"></div>