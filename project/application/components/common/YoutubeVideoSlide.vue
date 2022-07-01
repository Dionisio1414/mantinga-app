<template>
  <div class="video-slide">
    <div class="video-slide__mobile">
      <img class="video-slide__img" :src="mobileSrc" alt="" />
    </div>

    <div class="video-slide__desktop">
      <div class="swiper-slide__video-wrapper">
        <div class="swiper-slide__video">
          <youtube
            ref="youtube"
            :player-vars="playerOptions"
            :video-id="videoId"
            allow="fullscreen"
            @ready="playVideo"
          />
        </div>
      </div>
      <button
        class="btn btn--transparent swiper-slide__video-btn"
        @click="enableFullScreen"
      >
        <svg-icon name="volume" width="24" height="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentYoutubeVideoSlide extends Vue {
  @Prop()
  public src!: string

  @Prop()
  public mobileSrc!: string

  public $youtube: any
  public playerOptions = {
    autoplay: 1,
    autohide: 1,
    controls: 0,
    loop: 1,
    modestbranding: 1,
    rel: 1,
    showinfo: 0,
    fs: 1,
    playsinline: 1,
    iv_load_policy: 3,
    mute: 1,
    playlist: this.videoId,
    cc_load_policy: 0,
    listType: 'user_uploads',
  }

  public get playerRef(): any {
    // @ts-ignore
    return this.$refs?.youtube?.player || {}
  }

  public get videoId(): string {
    return this.$youtube.getIdFromUrl(this.src)
  }

  public enableFullScreen(): void {
    this.playerRef.getIframe().then((iframe: any) => {
      const requestFullScreen =
        iframe.requestFullScreen ||
        iframe.mozRequestFullScreen ||
        iframe.webkitRequestFullScreen

      if (requestFullScreen) {
        requestFullScreen.bind(iframe)()
      }
    })
  }

  public playVideo(): void {
    // @ts-ignore
    this.$refs.youtube?.player?.playVideo()
  }
}
</script>

<style lang="scss" scoped>
.video-slide {
  width: 100%;
  height: 100%;

  &__mobile {
    width: 100%;
    height: 100%;
  }

  &__desktop {
    display: none;
  }

  &__img {
    object-fit: cover;
    object-position: center ;
    width: 100%;
    height: 100%;

  }
}

.swiper {
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    overflow: hidden;
    max-width: 100%;

    &__text-container {
      position: absolute;
      left: 120px;
      top: 96px;
      color: $color-white;
    }

    &__heading {
      font-weight: 300;
    }

    &__text {
      margin-top: 16px;
      color: $color-golden-light;
    }

    &__video-wrapper {
      max-width: 100%;
      width: 100%;
      height: 100%;
      position: relative;
    }

    &__video {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 25px;
      width: 300%;
      left: -100%;
      height: 100%;

      ::v-deep iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 100;

        &:fullscreen {
          pointer-events: all;
        }
      }
    }

    &__video-btn {
      position: absolute;
      right: 120px;
      bottom: 48px;
      color: $color-white;
      z-index: 90099;
    }
  }
}

@include media-lg {
  .video-slide {
    height: 100%;

    &__desktop {
      display: block;
      height: 100%;
    }

    &__mobile {
      display: none;
    }
  }
}
</style>
