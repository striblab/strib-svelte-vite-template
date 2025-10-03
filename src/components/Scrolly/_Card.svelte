<!-- 
 @component
 ### Card component
 This component renders a minimalist card with a header and footer. The body string can contain html markup. The optional property offset can be used
 to add padding to the card, which is helpful for triggering scrolly behavior before the card's visible contents arrive in the viewport.

 #### Optional properties
 - header: string;
 - body: string;
 - offset: number;
 -->

<script>
  let { header = "", body = "", offset = 0 } = $props();
</script>

<div style:padding-top={`${offset}%`}>
  <div class="border-2 rounded-lg bg-surface-panel border-border-strong-01 p-4">
    <div class="flex flex-col gap-5 rounded-md">
      <h2 class="font-utility-heading-05 text-text-primary">{header}</h2>

      <div
        class="font-utility-body-reg-03 text-text-primary flex flex-col gap-y-5"
      >
        {@html body}
      </div>
    </div>
  </div>
</div>
