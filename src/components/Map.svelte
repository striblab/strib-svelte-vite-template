<script>
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import { Protocol } from "pmtiles";
    import basemap from "../data/strib-basemap-light.json";

    let { isMobile } = $props();

    let mapContainer;
    let map = $state(null);

    onMount(() => {
        const protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);

        // Map initialization
        map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: basemap,
            center: isMobile ? [-93.295, 44.95] : [-93.3, 44.95],
            zoom: isMobile ? 14 : 13,
            maxBounds: null,
            maxZoom: 22,
            minZoom: 0,
            interactive: false,
            pitchWithRotate: false,
            dragRotate: false,
            cooperativeGestures: false,
        });
        map.on("load", () => {
            const nav = new maplibregl.NavigationControl({
                showCompass: true,
                visualizePitch: true,
            });
            map.addControl(nav, "top-right");
        });
    });
</script>

<div bind:this={mapContainer} class="w-full h-screen z-0"></div>
