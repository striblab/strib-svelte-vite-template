<script>
  let { children } = $props();
</script>

<div class="flex flex-col gap-y-0.5">
  <p class="font-utility-label-bold-02 text-text-primary">
    {@render children()}
  </p>
  <span class="text-text-secondary font-utility-label-reg-02">
    The Minnesota Star Tribune
  </span>
</div>
