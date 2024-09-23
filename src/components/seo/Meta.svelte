<script>
    //expects data from /src/config/seo.json passed as prop
    export let seo;
</script>

<svelte:head>
        <!-- Additional meta tags -->
        <link rel="canonical" href={seo.canonicalURL}/>
        <meta itemprop="name" content= {seo.pageName}/>
        <meta name="description" content= {seo.articleDescription}/>
        <meta itemprop="description" content={seo.articleDescription} />
        <meta
            itemprop="image"
            content={seo.shareImageURL}
        />
        <meta name="twitter:site" content="@StarTribune" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Star Tribune" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Star Tribune" />
        <meta property="og:title" content={seo.pageName} />
        <meta property="og:description" content={seo.articleDescription} />
        <meta property="og:url" content={seo.shareImageURL} />
        <meta
            property="og:image"
            content={seo.shareImageURL}
        />
        <meta property="og:image:width" content="1680" />
        <meta property="og:image:height" content="876" />
        <!-- end additional meta tags -->
</svelte:head>