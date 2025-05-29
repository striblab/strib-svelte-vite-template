<script>
  let { variant = "default", children } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "default":
      variantStyles = "text-text-primary";
      break;
    case "overlayed":
      variantStyles =
        "drop-shadow-[0px_2px_3px_rgba(102,102,102,1)] text-text-reversed uppercase text-4xl md:text-6xl lg:text-7xl";
      break;
  }
</script>

<h1 class="{variantStyles} font-editorial-news-heading-01">
  {@render children()}
</h1>
