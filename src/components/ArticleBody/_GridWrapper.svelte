<script>
  let { variant = "default", children } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "default":
      variantStyles =
        "col-span-full md:col-span-6 md:col-start-2 lg:col-start-4";
      break;
    case "fullbleed":
      variantStyles = "col-span-full -mx-4 md:-mx-8 lg:mx-0";
      break;
  }
</script>

<div class={variantStyles}>
  {@render children()}
</div>
