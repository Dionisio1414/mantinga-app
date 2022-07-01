<template>
  <div class="youtube-block">
    <div class="youtube-block__container">
      <YouTubeBlock class="youtube-block__video-block" :url="youtubeUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeYoutubeProperties } from '~/types/content-type-youtube.interface'
import YouTubeBlock from '~/components/common/YouTubeBlock.vue'


@Component({
  components: { YouTubeBlock },
})
export default class ComponentContentTypeYouTube extends Vue {
  @Prop()
  public readonly properties!: IContentTypeYoutubeProperties

  public get youtubeUrl(): string {
    return this.properties?.url?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.youtube-block {
  width: 100%;
  padding: 0 16px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 0px;
  }

  &__video-block {
    margin: 0 auto;
  }
}

@include media-lg {
  .youtube-block {
    padding: 0 120px;
  }
}
</style>
