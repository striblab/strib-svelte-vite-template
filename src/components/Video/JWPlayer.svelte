<!-- 
@component
### JWPlayer component
Renders a configurable video player that will autoplay when it enters the viewport by leveraging the JW Player JavaScript library. Several props allow for out-of-the-box customization for displaying a video overlay, looping the video upon end and setting the desired aspect ratio among the several supported. 

#### Optional properties
- mediaid: String;
- aspectRatio: "2:1" | "16:9" | "5:3" | "4:3" | "1:1" | "9:13" | "2:3" | "9:16";
- credit: String;
- showOverlay: Boolean
- loop: Boolean

#### Setting up your video
To render a video with this component, you need to upload your video to the {@link https://dashboard.jwplayer.com/| JW Player Dashboard}, find its media ID and pass that value into this component's mediaid prop.
You will need an account to upload video.

#### Example
```svelte
<GridRow>
    <JWPlayer
      mediaid={"hvh0xHRH"}
      aspectRatio="9:16"
      showOverlay={true}
      loop={false}
    />
</GridRow>
```
-->

<script>
  import { onMount } from "svelte";
  import Overlay from "./_Overlay.svelte";
  import ImageCaption from "../Image/_ImageCaption.svelte";

  /** @type {{mediaid?: String; aspectRatio?: "2:1" | "16:9" | "5:3" | "4:3" | "1:1" | "9:13" | "2:3" | "9:16"; credit?: String; showOverlay?: Boolean; loop?: Boolean;}} */
  let {
    mediaid = "",
    aspectRatio = "16:9",
    credit = "Caption tk tk tk",
    showOverlay = true,
    loop = false,
  } = $props();

  // @ts-ignore
  let thisPlayer = $state(null);
  let thisVideo = $state(null);

  let duration = $state(null);
  let currentTime = $state(0);
  let timeRemaining = $derived.by(() => {
    if (duration && !isNaN(currentTime)) {
      return duration - currentTime;
    }
  });

  let showReplay = $state(false);
  let isMuted = $state(true);
  let isPlaying = $state(false);
  let frameCallbackHandle = null;

  function instantiatePlayer() {
    // @ts-ignore
    thisPlayer = jwplayer(mediaid).setup({
      playlist: `https://cdn.jwplayer.com/v2/media/${mediaid}`,
      image: false,
      controls: false,
      mute: true,
      aspectratio: aspectRatio,
      autostart: false,
    });

    thisPlayer.on("ready", () => {
      thisVideo = document.getElementById(mediaid).querySelector(".jw-video");
    });

    thisPlayer.on("meta", () => {
      duration = thisPlayer.getDuration();
    });

    // resets player when it leaves viewport
    thisPlayer.on("viewable", () => {
      if (thisPlayer.getViewable()) {
        //handle in view
        handlePlayFromStart();
        showReplay = false;
      } else {
        //handle out of view
        handlePause();
      }
    });
  }

  //play video, update component state
  function handlePlay() {
    thisPlayer.play();
    isPlaying = true;
  }

  function handlePlayFromStart() {
    thisPlayer.seek(0);
    currentTime = 0;
    thisPlayer.play();
    isPlaying = true;
  }

  //pause video, update component state
  function handlePause() {
    thisPlayer.pause();
    isPlaying = false;
  }

  //rewind video to start, update component state
  //does not affect play/pause state
  function handleReset() {
    thisVideo.currentTime = 0;
    currentTime = 0;
  }

  function toggleMute() {
    if (isMuted) {
      thisPlayer.setMute(false);
      isMuted = false;
    } else {
      thisPlayer.setMute(true);
      isMuted = true;
    }
  }

  function trackVideo(now, metadata) {
    //update time state
    currentTime = metadata.mediaTime;
    //if at final few frames...
    if (isPlaying && duration - metadata.mediaTime <= 0.1) {
      if (loop) {
        //rewind video to start and proceed to next frame to continue tracking loop
        handleReset();
      } else {
        //pause video, set showReplay boolean and break tracking loop
        handlePause();
        showReplay = true;
        return;
      }
    }
    //otherwise re-run for next frame
    if (isPlaying && thisVideo) {
      frameCallbackHandle = thisVideo.requestVideoFrameCallback(trackVideo);
    }
  }

  $effect.pre(() => {
    if (thisVideo && isPlaying && !frameCallbackHandle) {
      frameCallbackHandle = thisVideo.requestVideoFrameCallback(trackVideo);
    }

    // Svelte calls this whenever isPlaying/thisVideo changes OR component unmounts
    return () => {
      if (frameCallbackHandle && thisVideo) {
        thisVideo.cancelVideoFrameCallback(frameCallbackHandle);
        frameCallbackHandle = null;
      }
    };
  });

  onMount(() => {
    // @ts-ignore
    if (!Boolean(window.jwplayer)) {
      const script = document.createElement("script");
      script.src = "https://cdn.jwplayer.com/libraries/VcewZuaJ.js";
      script.onload = () => {
        instantiatePlayer();
      };
      document.head.appendChild(script);
    } else {
      instantiatePlayer();
    }

    return () => {
      if (thisPlayer) thisPlayer.remove();
      if (thisVideo) thisVideo.cancelVideoFrameCallback(frameCallbackHandle);
    };
  });
</script>

<figure class="mx-auto w-full">
  <div class="flex flex-col gap-4 rounded-2xl overflow-hidden mb-2">
    <div class="relative">
      {#if showOverlay}
        <Overlay
          timeRemaining={Math.round(timeRemaining)}
          showTimer={!isNaN(timeRemaining)}
          {showReplay}
          {isPlaying}
          {isMuted}
          onMute={toggleMute}
          onReplay={() => {
            handleReset();
            handlePlay();
            showReplay = false;
          }}
        />
      {/if}
      <div id={mediaid}></div>
    </div>
  </div>
  <ImageCaption>{credit}</ImageCaption>
</figure>
