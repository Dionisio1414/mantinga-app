<template>
  <div class="content-card" :class="[`content-card--${backgroundColor}`]">
    <div class="content-card__wrapper">
      <div
        class="content-card__container"
        :class="{
          'content-card__container--reverse': mediaLeftValue,
        }"
      >
        <div class="content-card__block">
          <div v-if="!!badges.length" class="content-card__badges">
            <div
              v-for="(badge, i) in badges"
              :key="i"
              class="content-card__badge badge"
              v-html="$sanitize(badge.title.value)"
            />
          </div>
          <h3
            class="content-card__headline h4"
            v-html="$sanitize(titleValue)"
          />
          <h5
            class="content-card__subtitle h5"
            v-html="$sanitize(subtitleValue)"
          />
          <div
            class="content-card__text subtitle"
            v-html="$sanitize(textValue)"
          />
          <div
            class="content-card__date body-text2"
            v-html="$sanitize(dateValue)"
          />
          <div class="content-card__buttons">
            <a
              v-for="(button, i) in buttons"
              :key="i"
              :href="button.button_url && button.button_url.value"
              :target="button.open_in_new_tab ? '_blank' : '_self'"
              class="content-card__button btn"
              :class="getButtonStyle(button.button_style.value)"
            >
              <img
                v-if="button.button_image && button.button_image.url"
                class="content-card__button-img"
                :src="button.button_image && button.button_image.url"
              />
              <span
                class="btn-title"
                v-html="$sanitize(button.button_title.value)"
              />
            </a>
          </div>
        </div>
        <div class="content-card__block">
          <div v-if="galleryImages.length" class="content-card__gallery">
            <CommonGallery
              :images="galleryImages"
              :video="youtubeUrl"
              :video-thumbnail="youtubeThumbnail"
              :slider-options="sliderOptions"
              :thumbs-options="thumbsOptions"
            />
          </div>
          <div
            v-if="youtubeUrl && !galleryImages.length"
            class="content-card__video"
          >
            <YoutubeBlock
              :url="youtubeUrl"
              :custom-thumbnail-url="youtubeThumbnail"
              :custom-thumbnail-alt="youtubeThumbnailAlt"
            />
          </div>

          <ContentCardImage
            v-if="!galleryImages.length && imageUrl"
            :image-url="imageUrl"
            :image-style="imageStyle"
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
import CommonGallery from '~/components/gallery/CommonGallery.vue'

import {
  IContentCardBadge,
  IContentCardButton,
  IContentTypeContentCardProperties,
} from '~/types/content-type-content-card.interface'
import { SwiperOptions } from 'swiper'

@Component({
  components: {
    ContentCardImage,
    YoutubeBlock,
    CommonGallery,
  },
})
export default class ComponentContentCard extends Vue {
  @Prop()
  public properties!: IContentTypeContentCardProperties

  public sliderOptions: SwiperOptions = {
    loop: true,
    loopedSlides: 4,
  }

  public thumbsOptions: SwiperOptions = {
    loop: true,
    loopedSlides: 4,
  }

  public get badges(): IContentCardBadge[] {
    return this.properties?.badges?.value || []
  }

  public get mediaLeftValue(): boolean {
    return this.properties?.media_left?.value || false
  }

  public get titleValue(): string {
    return this.properties?.main_title?.value || ''
  }

  public get subtitleValue(): string {
    return this.properties?.subtitle?.value || ''
  }

  public get textValue(): string {
    return this.properties?.text?.value || ''
  }

  public get dateValue(): string {
    return this.properties?.date?.value || ''
  }

  public get imageUrl(): string {
    return this.properties?.images?.value?.[0]?.image?.url || ''
  }

  public get imageAlt(): string {
    return this.properties?.images?.value?.[0]?.alt?.value || ''
  }

  public get imageStyle(): string {
    return (
      this.properties?.images?.value[0]?.image_style?.value || 'image_casual'
    )
  }

  public get buttons(): IContentCardButton[] {
    return this.properties?.buttons?.value || []
  }

  public get backgroundColor(): string {
    return this.properties?.background_color?.value || ''
  }

  public get youtubeUrl(): string {
    return this.properties?.youtube_url?.value || ''
  }

  public get youtubeThumbnail(): string {
    return this.properties?.['youtube-thumbnail']?.url || ''
  }

  public get youtubeThumbnailAlt(): string {
    return this.properties?.['youtube-thumbnail-alt']?.value || ''
  }

  public get galleryImages(): any {
    return (
      this.properties?.media_block?.value?.map((elem: any) => {
        return elem?.image?.url || ''
      }) || []
    )
  }

  public getButtonStyle(style: string): string {
    switch (style) {
      case 'secondary-outlined-dark': {
        return 'btn--transparent-with-border'
      }
      case 'secondary-outlined-light': {
        return 'btn--golden'
      }
      case 'primary-alternative': {
        return 'btn--alternative'
      }
      case 'text-button': {
        return 'btn--white'
      }
      default: {
        return 'btn--secondary'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-card {
  ::v-deep {
    .common-gallery {
      .main-swiper {
        .swiper-slide {
          height: 400px;
        }
      }
    }
  }

  &--golden {
    background-color: $color-golden-light;
  }

  &--grey {
    background-color: $color-primary-100;
  }

  &__wrapper {
    padding: 48px 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    column-gap: 24px;
    flex-direction: column;

    &--reverse {
      flex-direction: column-reverse;
    }
  }

  &__badges {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
  }

  &__headline {
    margin-bottom: 16px;
    text-align: center;
  }

  &__subtitle {
    text-align: center;
  }

  &__text {
    margin-top: 16px;
    color: $color-primary-regular;
    max-width: 564px;

    ::v-deep {
      p:not(:last-child) {
        margin-bottom: 24px;
      }

      ul,
      ol {
        li {
          margin-left: 16px;
          padding-left: 40px;
          position: relative;

          &:not(:last-child) {
            margin-bottom: 8px;
          }

          &:last-child {
            margin-bottom: 24px;
          }

          &::before {
            content: url('~assets/images/svg/leaf-gold.svg');
            display: block;
            width: 24px;
            height: 24px;
            position: absolute;
            left: 0;
            top: calc(50% - 12px);
          }
        }
      }
    }
  }

  &__date {
    margin-top: 32px;
    color: $color-primary-light;
    text-align: center;
  }

  &__buttons {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }

  &__button-img {
    width: 30px;
    height: 30px;
  }

  &__block {
    position: relative;
    width: 100%;
    padding: 0 16px;

    &:last-child {
      padding: 24px 0;
    }
  }

  &__video {
    padding: 0 16px;
  }

  &__gallery {
    padding: 0 16px;
  }
}

@include media-lg {
  .content-card {
    &__wrapper {
      margin: 0 120px;
    }

    &__container {
      flex-direction: row;
      align-items: center;

      &--reverse {
        flex-direction: row-reverse;
      }
    }

    &__badges {
      justify-content: flex-start;
    }

    &__headline {
      text-align: left;
    }

    &__subtitle {
      text-align: left;
    }

    &__text {
      text-align: left;
    }

    &__date {
      text-align: left;
    }

    &__buttons {
      justify-content: flex-start;
    }

    &__block {
      width: 50%;

      &:last-child {
        padding: 24px 0;
      }
    }

    &__video {
      padding: 0;
    }

    &__gallery {
      padding: 0;
    }
  }
}
</style>
