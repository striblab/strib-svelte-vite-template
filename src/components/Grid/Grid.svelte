<script>
  let { children, additionalClasses = "" } = $props();
</script>

<div
  class="grid grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-6 max-w-[67.5rem] mx-auto {additionalClasses}"
>
  {@render children()}
</div>
