<script>
  let { children } = $props();
</script>

<a
  data-testid="link-button"
  class="break-words text-text-color-01 uppercase font-utility-label-bold-caps-02"
  href="https://www.startribune.com/"
  target="_blank"
>
  {@render children()}
</a>
