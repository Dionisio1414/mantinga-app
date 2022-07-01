<template>
  <div class="video-wrap">
    <youtube ref="video" :video-id="videoId"></youtube>
    <div v-if="showThumbnailBackground" class="thumbnail">
      <div class="thumbnail-background"></div>
    </div>
    <img
      v-if="!active"
      :class="previewClassNames"
      :src="videoPreviewImageUrl"
      :alt="customThumbnailAlt"
    />

    <button
      v-if="!active"
      type="button"
      class="btn btn--secondary play"
      @click="play"
    >
      <svg-icon name="play-button-2" height="64" width="64" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import getYouTubeID from 'get-youtube-id'
import { IYoutubeThumbnailOutput } from '~/types/youtube-thumbnail.interface'
import youtubeThumbnail from 'youtube-thumbnail'

@Component({})
export default class ComponentYouTubeBlock extends Vue {
  @Prop()
  public url!: string

  @Prop()
  public customThumbnailUrl?: string

  @Prop()
  public customThumbnailAlt!: string

  public active: boolean = false

  public get videoId(): string | null {
    return getYouTubeID(this.url)
  }

  private get player(): any {
    return (this.$refs.video as any).player
  }

  public play(): void {
    this.active = true
    this.player.playVideo()
  }

  public get videoClassNames(): string[] {
    const result: string[] = []

    if (!this.active) {
      result.push('video-hidden')
    }

    return result
  }

  public get previewClassNames(): string[] {
    const result: string[] = ['preview']

    if (this.customThumbnailUrl) {
      result.push('preview-custom')
    }

    return result
  }

  public get videoPreview(): IYoutubeThumbnailOutput | null {
    if (!this.url || this.customThumbnailUrl) {
      return null
    }

    return youtubeThumbnail(this.url)
  }

  public get videoPreviewImageUrl(): string | null {
    if (this.customThumbnailUrl) {
      return this.customThumbnailUrl
    }

    if (!this.videoPreview) {
      return null
    }

    return this.videoPreview.medium.url
  }

  public get showThumbnailBackground(): boolean {
    return !!this.customThumbnailUrl && !this.active
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  ::v-deep iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.preview {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;

  &-custom {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
}

.thumbnail {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-background {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.play {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  background-color: transparent;
  border-color: transparent;
  color: $color-secondary;

  &:hover {
    color: $color-secondary-hover;
  }
}
</style>
