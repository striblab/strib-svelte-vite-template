<script>
    import { onMount } from "svelte";

    //expects data from /src/config/seo.json passed as prop
    export let seo;

    onMount(() => {
        //Initialize data layer
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        window.dataLayer.push({
            event: "dataLayer-initialized",
            pageLevel: "story",
            pageSection: seo.pageSection,
            subsection: seo.subsection,
            author: seo.author,
            contentSource: "star tribune",
            pageName: seo.pageName,
            articleId: seo.articleId,
        });
        //End initialize data layer

        //Google Tag Manager
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
            // @ts-ignore
            j.async = true;
            // @ts-ignore
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-KD2KG7V");
        //End Google Tag Manager
    });
</script>

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KD2KG7V"
        title=""
        height="0"
        width="0"
        style="display:none;visibility:hidden"
    ></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
