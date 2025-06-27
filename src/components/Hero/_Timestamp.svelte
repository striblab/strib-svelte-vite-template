<!-- 
@component
- Renders a string in the style of the Immersive Template's timestamp. 
- Your string should use an abbreviated month, non-zero day and four digit year.
- This component accepts no props and renders markup slotted between component tags
 
@example
```svelte
<Timestamp>
Dec. 1, 1977
</Timestamp>
```
-->
<script>
  let { children } = $props();
</script>

<span class="font-utility-label-reg-caps-02 text-text-tertiary">
  {@render children()}
</span>
