<script>
  import VolumeIcon from "./_VolumeIcon.svelte";
  import MuteIcon from "./_MuteIcon.svelte";
  import ReplayIcon from "./_ReplayIcon.svelte";

  let {
    isMuted,
    onReplay = () => {},
    onMute = () => {},
    timeRemaining,
    showReplay = false,
    showTimer = false,
    isPlaying = true,
  } = $props();

  let minutes = $derived(Math.floor(timeRemaining / 60));
  let seconds = $derived(String(timeRemaining % 60).padStart(2, "0"));
</script>

<div
  class="absolute h-full w-full z-10 transition-colors duration-300"
  style:background-color={isPlaying ? "rgba(0,0,0,0)" : "rgba(0,0,0,.4)"}
>
  <div class="h-full flex flex-col justify-between">
    <div class="p-4 flex flex-row justify-between">
      <button
        class="bg-surface-reversed rounded-full w-10 h-10 flex justify-center items-center"
        onclick={() => {
          onMute();
        }}
      >
        {#if isMuted}
          <MuteIcon />
        {:else}
          <VolumeIcon />
        {/if}
      </button>

      {#if showReplay}
        <button
          class="bg-surface-reversed rounded-full w-10 h-10 flex justify-center items-center"
          onclick={() => {
            onReplay();
          }}
        >
          <ReplayIcon />
        </button>
      {:else if showTimer}
        <span
          class="font-utility-label-reg-01 py-[5px] px-[10px] rounded-xl tabular-nums text-text-reversed bg-surface-reversed self-center h-auto"
        >
          {minutes}:{seconds}
        </span>
      {/if}
    </div>
    <div class="p-4"></div>
  </div>
</div>
