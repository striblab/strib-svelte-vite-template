<!-- 
@component
### Paragraph component
Renders a p tag in the style of the Immersive Template.  
Wrap this component around the markup you want rendered.

#### Optional properties
- dropCap: a boolean denoting whether to make the first character of the paragraph a drop cap;
- dropCapLines: a number between 2 and 6 inclusive that determines how many lines of text that drop cap will span;
- dropCapFontFamily: a string corresponding to a font's font-family attribute as defined in the this project's typography.css file. Note, this must be an actual CSS font-family string, not a Tailwind utility class name;

#### Example
```svelte
<Paragraph>Hello world!</Paragraph>
```

#### Dropcap example
```svelte
<Paragraph dropCap={true} dropCapLines={3} dropCapFontFamily={"publico-headline-black"}>Lorem ipsum</Paragraph>
```
-->

<script>
  /** @type {{dropCap?: Boolean; dropCapLines?: 2|3|4|5|6; dropCapFontFamily?: String; children?: function}} */
  let {
    dropCap = false,
    dropCapLines = 2,
    dropCapFontFamily = "publico-headline-condensed-light",
    children,
  } = $props();
</script>

<p
  class="font-editorial-body-reg-02 text-text-primary
  {dropCap ? `dropcap dropcap-${dropCapLines}` : ''}"
  style:--dropcap-typeface={dropCapFontFamily}
>
  {@render children?.()}
</p>

<style>
  .dropcap::first-letter {
    float: left;
    font-family: var(--dropcap-typeface, "sans-serif");
  }
  /* desktop dropcap styles */
  .dropcap-2::first-letter {
    font-size: 50px;
    margin-top: -8px;
    margin-bottom: -28px;
    padding-right: 8px;
  }
  .dropcap-3::first-letter {
    font-size: 75px;
    margin-top: -11px;
    margin-bottom: -28px;
    padding-right: 8px;
  }
  .dropcap-4::first-letter {
    font-size: 109px;
    margin-top: -20.3px;
    margin-bottom: -48px;
    padding-right: 12px;
  }
  .dropcap-5::first-letter {
    font-size: 140px;
    margin-top: -31.4px;
    margin-bottom: -48px;
    padding-right: 12px;
  }
  .dropcap-6::first-letter {
    font-size: 200px;
    margin-top: -43.2px;
    margin-bottom: -48px;
    padding-right: 12px;
  }
  @media screen and (max-width: 768px) {
    .dropcap-2::first-letter {
      margin-top: -7px;
      margin-bottom: -20px;
      padding-right: 6px;
    }
    .dropcap-3::first-letter {
      font-size: 77px;
      margin-top: -11px;
      margin-bottom: -20px;
      padding-right: 12px;
    }
    .dropcap-5::first-letter {
      margin-top: -30px;
    }
    .dropcap-6::first-letter {
      font-size: 168px;
      margin-top: -36px;
      margin-bottom: -60px;
    }
  }
</style>
