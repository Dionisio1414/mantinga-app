<template>
  <div class="info-card">
    <div
      class="info-card__img-container"
      :class="{ 'info-card__img-container--cover': isCoverImage }"
    >
      <img class="info-card__img" :src="imageUrl" :alt="imageAlt" />
    </div>
    <div class="info-card__content">
      <p class="h5 info-card__headline info-card__headline--desktop">
        {{ titleValue }}
      </p>
      <p class="h6 info-card__headline info-card__headline--mobile">
        {{ titleValue }}
      </p>
      <div class="subtitle info-card__text" v-html="$sanitize(textValue)" />
      <div class="info-card__buttons">
        <a
          v-for="(button, i) in buttonsList"
          :key="i"
          :href="button.url.value"
          :target="button.new_tab.value ? '_blank' : '_self'"
          class="info-card__btn btn btn--secondary"
        >
          <span class="btn-title">{{ button.text.value }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import {
  ICardButton,
  IContentTypeCardsEntity,
} from '~/types/content-type-cards.interface'

@Component({})
export default class ComponentInfoCard extends Vue {
  @Prop()
  public properties!: IContentTypeCardsEntity

  public get imageUrl(): string {
    return this.properties?.image?.url || ''
  }

  public get imageAlt(): string {
    return this.properties['image-alt']?.value || ''
  }

  public get isCoverImage(): boolean {
    return this.properties?.cover_image?.value || false
  }

  public get textValue(): string {
    return this.properties?.text?.value || ''
  }

  public get titleValue(): string {
    return this.properties?.title?.value || ''
  }

  public get buttonsList(): ICardButton[] {
    return this.properties?.buttons?.value || []
  }
}
</script>

<style lang="scss" scoped>
.info-card {
  box-shadow: $shadow-100;
  max-width: 586px;
  display: grid;
  grid-template-columns: 100%;
  border-radius: 8px;

  &__img-container {
    padding: 16px;
    overflow: hidden;
    max-height: 240px;

    &--cover {
      padding: 0;

      .info-card__img {
        border-radius: 8px 8px 0 0;
      }
    }
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: auto;
  }

  &__headline {
    margin-bottom: 16px;

    &--desktop {
      display: none;
    }
  }

  &__text {
    margin-bottom: 16px;
  }
}

@include media-lg {
  .info-card {
    grid-template-columns: repeat(2, 1fr);

    &__img-container {
      padding: 32px 24px 24px 24px;
      max-height: 100%;

      &--cover {
        padding: 0;

        .info-card__img {
          border-radius: 8px 0 0 8px;
        }
      }
    }

    &__headline {
      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }

    &__content {
      padding: 32px 24px 24px 24px;
    }
  }
}
</style>
