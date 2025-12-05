<!-- 
@component
### Paragraph component
Renders a p tag in the style of the Immersive Template.  
Wrap this component around the markup you want rendered.

### Optional dropcap property
Styles the first letter of a paragraph. The property lines, 
a number, controls the number of lines the dropcap should
span (styled up to six lines).

### Properties
- dropcap: boolean;
- lines: number;
- dropcapTypeface: string;

#### Example
```svelte
<Paragraph>Hello world!</Paragraph>
```

#### Dropcap example
```svelte
<Paragraph dropCap={true} lines={3} dropcapTypeface={"font-publico-headline-black"}>Lorem ipsum</Paragraph>
```
-->

<script>
  /** @type {{children?: function}} */
  let {
    children,
    dropCap = false,
    lines = 2,
    dropcapTypeface = "font-publico-text-roman",
  } = $props();
</script>

<p
  class="font-editorial-body-reg-02 text-text-primary {dropCap
    ? `dropcap dropcap-${lines}`
    : ''} {dropCap && dropcapTypeface ? dropcapTypeface : ''}"
>
  {@render children?.()}
</p>

<style>
  .dropcap::first-letter {
    font-family: "publico-text-roman";
    float: left;
    position: relative;
    left: 0;
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
