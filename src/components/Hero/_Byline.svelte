<!--
@component 
- Renders a single author name hyperlinked to their author bio page
- This component accepts the following props

@example 
```svelte
<Byline
author="Bryan Brussee"
href="https://www.startribune.com/author/bryan-brussee/8455834"
/>
```
-->

<script>
  let { author, href } = $props();
</script>

<a class="flex w-fit h-fit" {href}
  ><div class="flex items-center gap-0.5">
    <p class=" font-utility-label-bold-02 text-text-primary relative">
      By {author}
    </p>
  </div></a
>
