<script>
  import { onMount } from "svelte";
  import maplibregl from "maplibre-gl";
  import "../../node_modules/maplibre-gl/dist/maplibre-gl.css";
  import { Protocol } from "pmtiles";
  import basemap from "../data/strib-basemap-light.json";
  import { fromUrl } from 'geotiff';

  const {
    scrollIndex,
    isMobile
  } = $props();

  $inspect(scrollIndex)

  let mapContainer;
  let map = $state(null);

  function fadeLayerOpacity(layerId, targetOpacity, duration = 600) {
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

  $effect(() => {
    if (!map) return;

    // Reset all layers to initial opacity
    fadeLayerOpacity("submissions_outline", 0);
    fadeLayerOpacity("10pct_outline", 0);
    fadeLayerOpacity("50pct_outline", 0);
    fadeLayerOpacity("90pct_outline", 0);
    fadeLayerOpacity("98pct_outline", 0);

    // Apply scroll-based opacity changes
    if (scrollIndex === 0) {
    } else if (scrollIndex === 1) {
      fadeLayerOpacity("submissions_outline", 0.25);
    } else if (scrollIndex === 2) {
      fadeLayerOpacity("10pct_outline", 1);
      fadeLayerOpacity("50pct_outline", 1);
      fadeLayerOpacity("90pct_outline", 1);
      fadeLayerOpacity("98pct_outline", 1);
    } else if (scrollIndex === 3) {
    }
  });

    onMount(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    map = new maplibregl.Map({
      container: mapContainer,
      // @ts-ignore
      style: basemap,
      center: isMobile ? [-93.302, 44.959] : [-93.30, 44.95],
      zoom: isMobile ? 14 : 13.78,
      interactive: false,
    });

    map.on("load", () => {

      //submissions
      map.addSource("submissions", {
        type: "vector",
        url: "pmtiles://https://static.startribune.com/news/projects/all/202508XX-UPTOWN/submissions.pmtiles",
      });
      map.addLayer({
        id: "submissions_outline",
        type: "line",
        source: "submissions",
        "source-layer": "submissions",
        paint: {
          "line-color": "#000000",
          "line-width": 0.5,
          "line-opacity": 0
        }
      }, "roads_labels_light_rail");

      //10pct
      map.addSource("10pct", {
        type: "vector",
        url: "pmtiles://https://static.startribune.com/news/projects/all/202508XX-UPTOWN/all_10pct.pmtiles",
      });
      map.addLayer({
        id: "10pct_outline",
        type: "line",
        source: "10pct",
        "source-layer": "all_10pct",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0
        }
      }, "roads_labels_light_rail");    
      
      //50pct
      map.addSource("50pct", {
        type: "vector",
        url: "pmtiles://https://static.startribune.com/news/projects/all/202508XX-UPTOWN/all_50pct.pmtiles",
      });
      map.addLayer({
        id: "50pct_outline",
        type: "line",
        source: "50pct",
        "source-layer": "all_50pct",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0
        }
      }, "roads_labels_light_rail");  

      //90pct
      map.addSource("90pct", {
        type: "vector",
        url: "pmtiles://https://static.startribune.com/news/projects/all/202508XX-UPTOWN/all_90pct.pmtiles",
      });
      map.addLayer({
        id: "90pct_outline",
        type: "line",
        source: "90pct",
        "source-layer": "all_90pct",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0
        }
      }, "roads_labels_light_rail");

      //98pct
      map.addSource("98pct", {
        type: "vector",
        url: "pmtiles://https://static.startribune.com/news/projects/all/202508XX-UPTOWN/all_98pct.pmtiles",
      });
      map.addLayer({
        id: "98pct_outline",
        type: "line",
        source: "98pct",
        "source-layer": "all_98pct",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
          "line-opacity": 0
        }
      }, "roads_labels_light_rail");

    });
  });
</script>

<div bind:this={mapContainer} class="w-full h-screen z-0"></div>
