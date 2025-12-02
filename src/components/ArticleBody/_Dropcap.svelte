<!-- 
@component
### Dropcap component
Creates a dropcap to be used inside a Paragraph component. 
The typeface defaults to Publico Text Roman to match the Immersive Template Storybook {@link https://storybook-startribune-com.vercel.app/?path=/story/molecules-articletoolkit-c-a02-articlebody--immersive}, 
otherwise pass in a different typeface prop on ArticleBody. 
Some minor alterations to the size of the dropcap and 
top/left position might be necessary depending on both the 
typeface and how many lines the dropcap should span.

#### Example
```Svelte
<Dropcap dropcapTypeface="font-publico-headline-black">H</Dropcap><Paragraph>ello world!</Paragraph>
```
-->

<script>
  /** @type {{children?: function}} */
  let { children, dropcapTypeface = "font-publico-text-roman" } = $props();
</script>

<span
  class="md:text-[75px] md:pr-2 md:-top-[0.72rem] md:left-0 md:-mb-7 text-[70px] pr-4 -top-[9px] left-1 -mb-5 float-left relative {dropcapTypeface}"
  >{@render children?.()}
</span>
