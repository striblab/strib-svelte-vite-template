<script>
    import Grid from "./components/Grid/Grid.svelte";
    import GridRow from "./components/Grid/_GridRow.svelte";
    import ArticleBody from "./components/ArticleBody/ArticleBody.svelte";
    import Hero from "./components/Hero/Hero.svelte";

    let isMobile = $derived(innerWidth < 640);
</script>

<Grid additionalClasses="gap-y-8 md:gap-y-10 px-4">
    <GridRow>
        <!-- <Hero
            sectionLabel="Section label"
            headline="We asked where Uptown is; 2,000 of you responded. Here's what you said."
            timestamp="Aug. XX, 2025"
            heroImageUrl="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
            heroImageCaption="Lorem ipsum dolor"
            heroImageAltText=""
            dek='WANT THIS TO PUBLISH BEFORE THE STATE FAIR //// A visual-and-map-driven story with results of our "where is uptown" data collection.'
            authorName="Jake Steinberg, Jeff Hargarten, Zoë Jackson and Star Tribune readers."
            authorBioUrl="https://www.startribune.com/bryan-brussee/8455834"
        /> -->
    </GridRow>

    <GridRow>
        <ArticleBody
        {isMobile} />
    </GridRow>
</Grid>
