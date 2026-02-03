<!-- 
@component
### ScrollySection component
This component uses reactive state to update a div's background color depending on which Card component is in view.

#### Optional properties
- data: array - Generally speaking, this prop expects an array of objects. For this example, each object has text, color and step properties.

#### How it works
ScrollySection imports the Scrolly component which tracks which of its immediate children is on screen and increments its interal 'value' property accordingly.
This component leverage {@link https://svelte.dev/docs/svelte/bind Svelte's two-way binding directive} to expose Scrolly's value property and assign it to this component's scrollIndex state.
We derive from this scrollIndex state the color string we wish to apply to our sticky-positioned div. 
This pattern — observe a series of elements on screen, reactively update state and manipulate a sticky-positioned background element accordingly — can be good starting point for most scrollytelling formats.

#### Scrollytelling in the Hero component
This component is designed to work inside any fullBleed variant GridRow, including fullBleed GridRow instances from within the Hero component.
Just import the ScrollySection component and include it as follows inside of the Hero markup's Grid wrapper.

```Svelte

  <GridRow variant={"fullBleed"}>
    <ScrollySection
      data={yourHeroScrollyData}
    />
  </GridRow>

```
-->
<script>
  import GridRow from "../Grid/_GridRow.svelte";
  import Grid from "../Grid/Grid.svelte";
  import Card from "./_Card.svelte";
  import Scrolly from "./_Scrolly.svelte";

  let { data = [] } = $props();

  let scrollIndex = $state(null);
  let activeColor = $derived(
    typeof scrollIndex === "number" ? data[scrollIndex].color : "#F2F2F2",
  );
</script>

<div class="relative">
  <div
    class="sticky top-0 w-full h-svh"
    style:background-color={activeColor}
  ></div>
  <Grid additionalClasses="relative px-4 md:px-6 min-[1080px]:px-0">
    <GridRow variant="inline">
      <Scrolly
        bind:value={scrollIndex}
        additionalClasses="flex flex-col gap-y-[100svh] mb-[50svh]"
      >
        {#each data as d}
          <Card header={`Scrolly card #${d.step}`} body={d.text} />
        {/each}
      </Scrolly>
    </GridRow>
  </Grid>
</div>
