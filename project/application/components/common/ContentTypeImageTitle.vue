<template>
  <div class="image-title-block">
    <div class="image-title-block__wrapper">
      <div class="image-title-block__container">
        <div class="image-title-block__block">
          <h3
            class="
              image-title-block__headline image-title-block__headline--desktop
              h5
            "
            v-html="$sanitize(titleValue)"
          />
          <h3
            class="
              image-title-block__headline image-title-block__headline--mobile
              h6
            "
            v-html="$sanitize(titleValue)"
          />
          <div
            class="image-title-block__text subtitle"
            v-html="$sanitize(textValue)"
          />
        </div>
        <div class="image-title-block__block">
          <ContentCardImage
            :image-url="imageUrl"
            :image-style="'image_masked_golden'"
            :image-alt="imageAlt"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ContentCardImage from '~/components/common/ContentCardImage.vue'
import YoutubeBlock from '~/components/common/YouTubeBlock.vue'

import { IContentTypeImageTitleProperties } from '~/types/content-type-image-title.interface'

@Component({
  components: {
    ContentCardImage,
    YoutubeBlock,
  },
})
export default class ComponentContentTypeImageTitle extends Vue {
  @Prop()
  public properties!: IContentTypeImageTitleProperties

  public get titleValue(): string {
    return this.properties?.title?.value || ''
  }

  public get textValue(): string {
    return this.properties?.text?.value || ''
  }

  public get imageUrl(): string {
    return this.properties?.image?.url || ''
  }

  public get imageAlt(): string {
    return this.properties?.alt?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.image-title-block {
  &__wrapper {
    padding: 48px 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    column-gap: 24px;
    flex-direction: column;
  }

  &__headline {
    margin-bottom: 16px;
    text-align: center;

    &--desktop {
      display: none;
    }
  }

  &__text {
    margin-top: 16px;
    color: $color-primary-regular;
    max-width: 564px;
  }

  &__block {
    position: relative;
    width: 100%;
    padding: 0 16px;

    &:last-child {
      padding: 24px 0;
    }
  }
}

@include media-lg {
  .image-title-block {
    &__wrapper {
      margin: 0 120px;
    }

    &__container {
      flex-direction: row;
    }

    &__headline {
      text-align: left;

      &--desktop {
        display: inline;
      }

      &--mobile {
        display: none;
      }
    }

    &__text {
      text-align: left;
    }

    &__block {
      width: 50%;

      &:last-child {
        padding: 24px 0;
      }
    }
  }
}
</style>
