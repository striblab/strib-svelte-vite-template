<script>
  import { onMount } from "svelte";

  let { children, variant = "default", additionalClasses = "" } = $props();

  let variantStyles = $state("");

  onMount(() => {
    switch (variant) {
      case "default":
        variantStyles = "col-span-full";
        break;
      case "inline":
        variantStyles =
          "col-span-full grid md:col-start-2 md:col-span-6 lg:col-start-4";
        break;
    }
  });
</script>

<div class="{variantStyles} {additionalClasses}">
  {@render children()}
</div>
