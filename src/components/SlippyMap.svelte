<script>
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "../../node_modules/maplibre-gl/dist/maplibre-gl.css";
    import { Protocol } from "pmtiles";
    import basemap from "../data/strib-basemap-light.json";
    import { cogProtocol } from "@geomatico/maplibre-cog-protocol";
    import { fromUrl } from "geotiff";

    maplibregl.addProtocol("cog", cogProtocol);

    let mapContainer;
    let map = $state(null);
    let popup
    let tiffImage = null;
    const cogUrl =
        "https://static.startribune.com/news/projects/all/202508XX-UPTOWN/results_cog.tif";

    const { isMobile } = $props();

    // Web Mercator projection helper
    function lonLatToMerc(lon, lat) {
        const R = 6378137;
        const x = (lon * Math.PI / 180) * R;
        const y =
        Math.log(Math.tan((90 + lat) * Math.PI / 360)) * R;
        return [x, y];
    }

     async function sampleRaster(lng, lat) {
        if (!tiffImage) return null;

        // 2. Project to meters
        const [xMerc, yMerc] = lonLatToMerc(lng, lat);

        // 3. Pull origin & resolution from the TIFF
        const [originX, originY] = tiffImage.getOrigin();
        const [resX, resY]       = tiffImage.getResolution();

        // 4. Compute pixel indices
        const px = Math.floor((xMerc - originX) / resX);
        const py = Math.floor((originY - yMerc) / Math.abs(resY));

        // 5. Bail if outside the raster extent
        const w = tiffImage.getWidth();
        const h = tiffImage.getHeight();
        if (px < 0 || px >= w || py < 0 || py >= h) {
        return null;
        }

        // 6. Read the single-pixel window
        const data = await tiffImage.readRasters({
        window: [px, py, px + 1, py + 1],
        });
        return data[0][0];  // first band, first (and only) pixel
    }

    function showValue(e) {
        sampleRaster(e.lngLat.lng, e.lngLat.lat).then((val) => {
            if (val == null) {
                popup.remove();
            } else {
                const rounded = Number(val).toFixed(1);
                popup
                    .setLngLat(e.lngLat)
                    .setHTML(`<strong>${rounded}%</strong> of submitters agreed this is Uptown`)
                    .addTo(map);
            }
        });
    }

    function hidePopup() {
        popup.remove();
    }

    $effect(() => {
        if (!map) return;
        popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        });

        if (!isMobile) {
            map.on("click", showValue);
            map.on("mousemove", showValue);
            map.getCanvas().addEventListener("mouseleave", hidePopup);
        }
    });

    onMount(async () => {
        const protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);

        const tiff = await fromUrl(cogUrl);
        tiffImage = await tiff.getImage();

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
                    `cog://${cogUrl}`,
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
