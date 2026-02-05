<!-- 
@component
### Dropcap component
Renders type in the style of a dropcap when wrapped around text.  

#### Optional properties
- dropCapLines: a number between 2 and 6 inclusive that determines how many lines of text that drop cap will span;
- dropCapFontFamily: a string corresponding to a font's font-family attribute as defined in the this project's typography.css file. Note, this must be an actual CSS font-family string, not a Tailwind utility class name;

#### Example
```svelte
<Paragraph><Dropcap dropCapLines={3}>H</Dropcap>ello world!</Paragraph>
```
-->

<script>
  /** @type {{dropCapLines?: 2|3|4|5|6; dropCapFontFamily?: String; children?: function}} */
  let {
    dropCapLines = 2,
    dropCapFontFamily = "publico-headline-condensed-light",
    children,
  } = $props();
</script>

<span
  class="dropcap dropcap-{dropCapLines}"
  style:--dropcap-typeface={dropCapFontFamily}
>
  {@render children?.()}
</span>

<style>
  .dropcap {
    float: left;
    font-family: var(--dropcap-typeface, "sans-serif");
    line-height: 1.25;
  }
  /* desktop dropcap styles */
  .dropcap-2 {
    font-size: 50px;
    margin-top: -8px;
    margin-bottom: -28px;
    padding-right: 8px;
  }
  .dropcap-3 {
    font-size: 75px;
    margin-top: -11px;
    margin-bottom: -28px;
    padding-right: 8px;
  }
  .dropcap-4 {
    font-size: 109px;
    margin-top: -20.3px;
    margin-bottom: -48px;
    padding-right: 12px;
  }
  .dropcap-5 {
    font-size: 140px;
    margin-top: -31.4px;
    margin-bottom: -48px;
    padding-right: 12px;
  }
  .dropcap-6 {
    font-size: 200px;
    margin-top: -43.2px;
    margin-bottom: -48px;
    padding-right: 12px;
  }
  @media screen and (max-width: 768px) {
    .dropcap-2 {
      margin-top: -7px;
      margin-bottom: -20px;
      padding-right: 6px;
    }
    .dropcap-3 {
      font-size: 77px;
      margin-top: -11px;
      margin-bottom: -20px;
      padding-right: 12px;
    }
    .dropcap-5 {
      margin-top: -30px;
    }
    .dropcap-6 {
      font-size: 168px;
      margin-top: -36px;
      margin-bottom: -60px;
    }
  }
</style>
