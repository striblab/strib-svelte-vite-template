<script>
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "../../node_modules/maplibre-gl/dist/maplibre-gl.css";
    import { Protocol } from "pmtiles";
    import basemap from "../data/strib-basemap-light.json";
    import { cogProtocol } from "@geomatico/maplibre-cog-protocol";

    maplibregl.addProtocol("cog", cogProtocol);

    let mapContainer;
    let map = $state(null);

    const { isMobile } = $props();

    onMount(() => {
        const protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);

        map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: basemap,
            center: isMobile ? [-93.302, 44.959] : [-93.3, 44.95],
            zoom: isMobile ? 14 : 13.78,
            interactive: true,
        });

        map.on("load", () => {
            const nav = new maplibregl.NavigationControl({
                showCompass: true,
                visualizePitch: true,
            });
            map.addControl(nav, "top-right"); 
            
        //results raster
        map.addSource("results", {
            type: "raster",
            url: [
                "cog://https://static.startribune.com/news/projects/all/202508XX-UPTOWN/results_cog.tif",
                "#color:",
                "CartoPurpOr,0.1,99,c",
            ].join(""),
            tileSize: 256,
        });
        map.addLayer(
            {
                id: "resultsLayer",
                type: "raster",
                source: "results",
                paint: {
                    "raster-opacity": 0.7,
                },
            },
            "overture-buildings-3D",
        );
        });

      
    });
</script>

<div bind:this={mapContainer} class="w-full h-screen z-0"></div>
