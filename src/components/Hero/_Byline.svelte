<script>
  let { href, children } = $props();
</script>

<a class="flex w-fit h-fit" {href}
  ><div class="rt-Box flex items-center gap-0.5">
    <p
      data-testid="Chris Hine"
      class=" font-utility-label-bold-02 text-text-primary relative"
    >
      {@render children()}
    </p>
  </div></a
>
