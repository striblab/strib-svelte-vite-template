<script>
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import { Protocol } from "pmtiles";
    import style from "./map-components/strib-basemap-light.json";

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    let mapContainer;
    let map;

    const isMobile = $derived(innerWidth < 640);
    const initialView = {
        center: [-93.265, 44.98],
        zoom: 12,
    };
    const mobileZoom = 5;

    onMount(() => {
        map = new maplibregl.Map({
            container: mapContainer,
            // @ts-ignore
            style: style,
            // @ts-ignore
            center: initialView.center,
            zoom: isMobile ? mobileZoom : initialView.zoom,
            cooperativeGestures: true,
            maxZoom: 17,
            // maxBounds: [
            //     [-94, 44], // Southwest coordinates
            //     [-92, 46], // Northeast coordinates
            // ],
        });
    });

</script>

<div
    bind:this={mapContainer}
    class="map-container mx-auto h-[100vh] w-full max-w-7xl mb-20 relative"
>
</div>