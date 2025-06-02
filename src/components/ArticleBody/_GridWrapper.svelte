<script>
  let { variant = "default", children } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "default":
      variantStyles = "md:col-span-6 md:col-start-2 lg:col-start-4";
      break;
    case "wide":
      variantStyles = "-mx-4 md:-mx-8 lg:mx-0";
      break;
  }
</script>

<div class="{variantStyles} col-span-full grid gap-y-5">
  {@render children()}
</div>
