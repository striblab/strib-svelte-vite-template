<script>
  let { icon = "", additionalClasses = "" } = $props();
</script>

<button
  class="h-8 w-8 border border-solid border-border-strong-02 rounded-full flex justify-center items-center {additionalClasses}"
>
  <div class="w-4 h-4">
    <img src={icon} alt="" />
  </div>
</button>
