<script>
  import { onMount } from "svelte";
  import maplibregl from "maplibre-gl";
  import currentWetlands from "../data/current_wetlands.json";
  import formerWetlands from "../data/former_wetlands.json";
  import tiles from "../data/tiles.json";
  import restorableWetlands from "../data/restorable_wetlands.json";
  import basemap from "../data/strib-basemap.json";
  import notStudied from "../data/not_studied.json";
  import lakeChristina from "../data/lake_christina.json";
  import lakeButler from "../data/butler_lake.json";
  import { mobile } from "../data/stores.js";

  // Accept the scroll index as a prop from the parent
  export let scrollIndex = 0;

  let mapContainer;
  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: mapContainer,
      // @ts-ignore
      style: basemap,
      center: [-94, 46.5],
      zoom: $mobile ? 5.4 : 6.2,
      interactive: false,
    });
    map.on("load", () => {
      map.addSource("formerWetlands", {
        type: "geojson",
        data: formerWetlands,
      });
      map.addLayer(
        {
          id: "former_wetlands_layer",
          type: "fill",
          source: "formerWetlands",
          paint: {
            "fill-color": "#B6E32B",
            "fill-opacity": 1,
          },
        },
        "waterway",
      );
      map.addSource("tiles", {
        type: "geojson",
        data: tiles,
      });
      map.addLayer(
        {
          id: "tiles_layer",
          type: "fill",
          source: "tiles",
          paint: {
            "fill-color": "#BAA8D7",
            "fill-opacity": 0, // Changed to 0
          },
        },
        "waterway",
      );
      map.addSource("formerWetlands2", {
        type: "geojson",
        data: formerWetlands,
      });
      map.addLayer(
        {
          id: "former_wetlands_layer_2",
          type: "fill",
          source: "formerWetlands2",
          paint: {
            "fill-color": "#D6FB65",
            "fill-opacity": 0.3,
            "fill-outline-color": "#8FB323",
          },
        },
        "waterway",
      );
      map.addSource("currentWetlands", {
        type: "geojson",
        data: currentWetlands,
      });
      map.addLayer(
        {
          id: "current_wetlands_layer",
          type: "fill",
          source: "currentWetlands",
          paint: {
            "fill-color": "#B6E32B",
            "fill-opacity": 0,
          },
        },
        "waterway",
      );
      map.addSource("restorableWetlands", {
        type: "geojson",
        data: restorableWetlands,
      });
      map.addLayer(
        {
          id: "restorable_wetlands_layer",
          type: "fill",
          source: "restorableWetlands",
          paint: {
            "fill-color": "#A6D4C3",
            "fill-opacity": 0,
          },
        },
        "waterway",
      );
      map.addSource("notStudied", {
        type: "geojson",
        data: notStudied,
      });
      map.addLayer({
        id: "not_studied_label",
        type: "symbol",
        source: "notStudied",
        layout: {
          "text-field": ["get", "label"],
          "text-size": 14,
          "text-font": ["Graphik Web Regular"],
          "text-offset": [0, 1.2],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#666666",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
          "text-opacity": 0,
        },
      });
      map.addSource("lakeChristina", {
        type: "geojson",
        data: lakeChristina,
      });
      map.addLayer({
        id: "lakeChristina_dot",
        type: "circle",
        source: "lakeChristina",
        paint: {
          "circle-radius": 4,
          "circle-color": "#7e7e7e",
        },
      });
      map.addLayer({
        id: "lakeChristina",
        type: "symbol",
        source: "lakeChristina",
        layout: {
          "text-field": ["get", "label"],
          "text-size": 14,
          "text-font": ["Graphik Web Semibold"],
          "text-offset": [0.3, -1.4],
          "text-anchor": "top-left",
        },
        paint: {
          "text-color": "#7e7e7e",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
          "text-opacity": 1,
        },
      });
      map.addSource("lakeButler", {
        type: "geojson",
        data: lakeButler,
      });
      map.addLayer({
        id: "lakeButler_dot",
        type: "circle",
        source: "lakeButler",
        paint: {
          "circle-radius": 4,
          "circle-color": "#7e7e7e",
        },
      });
      map.addLayer({
        id: "lakeButler",
        type: "symbol",
        source: "lakeButler",
        layout: {
          "text-field": ["get", "label"],
          "text-size": 14,
          "text-font": ["Graphik Web Semibold"],
          "text-offset": [0.3, -1.4],
          "text-anchor": "top-left",
        },
        paint: {
          "text-color": "#7e7e7e",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
          "text-opacity": 1,
        },
      });
    });
  });

  function fadeLayerOpacity(layerId, targetOpacity, duration = 500) {
    if (!map.getLayer(layerId)) return;

    // Determine appropriate opacity property
    const layerType = map.getLayer(layerId).type;
    const opacityProp = {
      fill: "fill-opacity",
      line: "line-opacity",
      circle: "circle-opacity",
      symbol: "text-opacity",
      background: "background-opacity",
      heatmap: "heatmap-opacity",
    }[layerType];

    if (!opacityProp) return;

    const start = performance.now();
    const initialOpacity = map.getPaintProperty(layerId, opacityProp) || 0;

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress * (2 - progress); // ease-out

      const current = initialOpacity + (targetOpacity - initialOpacity) * eased;
      map.setPaintProperty(layerId, opacityProp, current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  $: if (map && map.isStyleLoaded()) {
    fadeLayerOpacity("former_wetlands_layer", scrollIndex === 0 ? 1 : 0);
    fadeLayerOpacity("current_wetlands_layer", scrollIndex === 2 ? 1 : 0);
    fadeLayerOpacity("tiles_layer", scrollIndex === 1 ? 1 : 0);
    fadeLayerOpacity("former_wetlands_layer_2", scrollIndex === 1 ? 0.3 : 0);
    fadeLayerOpacity("restorable_wetlands_layer", scrollIndex === 3 ? 1 : 0);
    fadeLayerOpacity("not_studied_label", scrollIndex === 3 ? 1 : 0);
  }
  $: if (map && map.isStyleLoaded()) {
    map.setZoom($mobile ? 5.4 : 6.2);
  }
</script>

<div bind:this={mapContainer} class="w-full h-screen z-0"></div>
