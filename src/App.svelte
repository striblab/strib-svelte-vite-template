<script>
    import Grid from "./components/Grid/Grid.svelte";
    import GridRow from "./components/Grid/_GridRow.svelte";
    import ArticleBody from "./components/ArticleBody/ArticleBody.svelte";
    import Hero from "./components/Hero/Hero.svelte";
</script>

<Grid additionalClasses="gap-y-8 md:gap-y-10 px-4">
    <GridRow>
        <Hero
            sectionLabel="Section label"
            headline="Lorem ipsum dolor sit amet consectetur adipiscing elit"
            timestamp="Dec. 1, 1977"
            heroImageUrl="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
            heroImageCaption="Lorem ipsum dolor"
            heroImageAltText=""
            dek="Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce sociis at montes vitae tempor enim, venenatis tristique feugiat arcu dis ridiculus."
            authorName="Bryan Brussee"
            authorBioUrl="https://www.startribune.com/bryan-brussee/8455834"
        />
    </GridRow>

    <GridRow>
        <ArticleBody />
    </GridRow>
</Grid>
