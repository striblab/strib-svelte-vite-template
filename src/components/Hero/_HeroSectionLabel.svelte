<script>
  let { variant = "stacked", children } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "stacked":
      variantStyles = "text-text-color-01";
      break;
    case "overlayed":
      variantStyles = "text-text-reversed bg-surface-reversed p-2";
      break;
  }
</script>

<a
  data-testid="link-button"
  class="{variantStyles} block font-utility-label-bold-caps-02 uppercase no-underline break-word whitespace-nowrap"
  href="https://www.startribune.com/"
  target="_blank"
>
  {@render children()}
</a>
