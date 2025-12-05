<!-- 
@component
### Dropcap component
Renders a `<span>` tag to be wrapped around the first character of a Paragraph component. 
The typeface defaults to Publico Text Roman in the style of the Immersive Template {@link https://storybook-startribune-com.vercel.app/?path=/story/molecules-articletoolkit-c-a02-articlebody--immersive}, 
otherwise pass in a different typeface prop on ArticleBody. Dropcap also accepts lines, 
a number, for the number of lines the dropcap should span (styled up to six lines).

#### Properties
- dropcapTypeface: string;
- lines: number;

#### Example
```Svelte
<Dropcap dropcapTypeface="font-publico-headline-black lines={3}">H</Dropcap><Paragraph>ello world!</Paragraph>
```
-->

<script>
  /** @type {{children?: function}} */
  let {
    children,
    dropcapTypeface = "font-publico-text-roman",
    lines = undefined,
  } = $props();

  let style =
    lines === 2
      ? "md:text-[50px] md:pr-2 md:-top-[8px] md:-mb-7 text-[50px] pr-3 -top-[7px] -mb-5"
      : lines === 3
        ? "md:text-[75px] md:pr-2 md:-top-[11.5px] md:-mb-7 text-[70px] pr-4 -top-[9px] -mb-5"
        : lines === 4
          ? "md:text-[109px] md:pr-3 md:-top-[20.3px] md:-mb-12 text-[105px] pr-4 -top-[20px] -mb-11"
          : lines === 5
            ? "md:text-[145px] md:pr-3 md:-top-[30.4px] md:-mb-12 text-[138px] pr-4 -top-[28px] -mb-16"
            : lines === 6
              ? "md:text-[200px] md:pr-3 md:-top-[43.2px] md:-mb-12 text-[168px] pr-4 -top-[36px] -mb-20"
              : "md:text-[50px] md:pr-2 md:-top-[8px] md:-mb-7 text-[50px] pr-3 -top-[7px] -mb-5";
</script>

<span class="float-left relative md:left-0 left-1  {style} {dropcapTypeface}"
  >{@render children?.()}
</span>
