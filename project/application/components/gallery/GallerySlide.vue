<template>
  <div
    class="swiper-slide gallery-slide"
    :class="{ 'gallery-slide--thumb': isThumb }"
  >
    <div class="gallery-slide__wrapper">
      <img
        v-if="slide.length && !youtubeUrl.length"
        class="gallery-slide__img"
        :src="slide"
        alt=""
      />
      <div v-if="youtubeUrl.length" class="gallery-slide__video">
        <YoutubeBlock
          v-if="!isThumb"
          :url="youtubeUrl"
          :custom-thumbnail-url="youtubeThumbnail"
        />

        <div v-else class="gallery-slide__video-preview">
          <img
            class="gallery-slide__img"
            :src="youtubeThumbnail || getYoutubeThumbnail"
          />
          <svg-icon class="gallery-slide__icon" name="play-button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import YoutubeBlock from '~/components/common/YouTubeBlock.vue'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import youtubeThumbnail from 'youtube-thumbnail'

@Component({
  components: {
    Swiper,
    SwiperSlide,
    YoutubeBlock,
  },
})
export default class ComponentGallerySlide extends Vue {
  @Prop({ default: '' })
  public slide!: string

  @Prop({ default: '' })
  public youtubeUrl!: string

  @Prop({ default: '' })
  public youtubeThumbnail!: string

  @Prop({ default: false })
  public isThumb!: boolean

  @Prop()
  public virtualIndex!: number

  public playerOptions = {
    autoplay: 0,
    autohide: 1,
    controls: 2,
    loop: this.videoId,
    modestbranding: 1,
    rel: 1,
    showinfo: 1,
    fs: 1,
    playsinline: 1,
    iv_load_policy: 3,
    mute: 1,
  }

  public $youtube: any

  public get videoId(): string {
    return this.$youtube.getIdFromUrl(this.youtubeUrl)
  }

  public get getYoutubeThumbnail(): string | null {
    if (!this.youtubeUrl || this.youtubeThumbnail) {
      return null
    }

    return youtubeThumbnail(this.youtubeUrl)?.medium?.url || ''
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide.gallery-slide--thumb .gallery-slide__wrapper {
  border: 1px solid rgba(57, 71, 79, 0.05);
  border-radius: 8px;
  box-shadow: $shadow-100;
  height: 100%;
  overflow: hidden;
}
.swiper-slide-active.gallery-slide--thumb .gallery-slide__wrapper {
  border: 1px solid rgba(57, 71, 79, 0.37);
  box-shadow: $shadow-300;
}

.gallery-slide {
  &--thumb {
    padding: 8px;
    height: 100%;
    overflow: hidden;
  }

  &__wrapper {
    height: 100%;
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
    @include media-md {
      border-radius: 8px;
    }
  }

  &__video {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    ::v-deep iframe {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__video-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__icon {
    position: absolute;
    color: $color-secondary;
    width: 24px;
    height: 24px;
  }
}

@include media-lg {
  .gallery-slide {
    &__icon {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
