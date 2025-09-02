<!-- 
@component
### Timestamp component
Renders a timestamp in the style of the Immersive Template.   
Your string should use an abbreviated month, non-zero day and four digit year.
 
#### Example
```svelte
<Timestamp>
December 1, 1977
</Timestamp>
```
-->
<script>
  /** @type {{children?: function}} */
  let { children } = $props();
</script>

<span class="text-xs font-utility-label-reg-caps-02 text-text-black tracking-wider ">
  {@render children?.()}
</span>
