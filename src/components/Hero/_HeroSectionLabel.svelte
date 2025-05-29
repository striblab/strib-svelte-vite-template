<script>
  let { variant = "eyebrow", children } = $props();

  let variantStyles = $state("");

  switch (variant) {
    case "eyebrow":
      variantStyles = "text-text-color-01";
      break;
    case "pill":
      variantStyles =
        "text-text-reversed bg-surface-reversed px-[6px] py-[3px] rounded-[6px] md:py-1 md:px-2";
      break;
  }
</script>

<a
  data-testid="link-button"
  class="{variantStyles} block font-utility-label-bold-caps-03 md:font-utility-label-bold-caps-02 no-underline break-word whitespace-nowrap"
  href="https://www.startribune.com/"
  target="_blank"
>
  {@render children()}
</a>
