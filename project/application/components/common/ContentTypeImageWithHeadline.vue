<template>
  <div class="image-with-headline">
    <div class="image-with-headline__wrapper">
      <div class="image-with-headline__container">
        <h3
          class="image-with-headline__headline h2"
          v-html="$sanitize(headline)"
        />
        <div class="image-with-headline__img-container">
          <a :href="url" :target="isNewTab ? '_blank' : '_self'">
            <picture>
              <source media="(max-width: 1023px)" :srcset="mobileImage" />
              <source media="(min-width: 1024px)" :srcset="desktopImage" />
              <img :src="desktopImage" class="image-with-headline__img" />
            </picture>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IContentTypeImageWithHeadlineProperties } from '~/types/content-type-image-with-headline.interface'

@Component({})
export default class ComponentImageBlock extends Vue {
  @Prop()
  public properties!: IContentTypeImageWithHeadlineProperties

  public get desktopImage(): string {
    return this.properties?.desktop_image?.url || ''
  }

  public get mobileImage(): string {
    return this.properties?.desktop_image?.url || ''
  }

  public get isNewTab(): boolean {
    return this.properties?.new_tab?.value || false
  }

  public get url(): string {
    return this.properties?.url?.value || ''
  }

  public get headline(): string {
    return this.properties?.title?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.image-with-headline {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    column-gap: 24px;
    flex-direction: column;
  }

  &__wrapper {
    padding: 48px 0;
  }

  &__img-container {
    width: 100%;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    border-radius: 8px;
  }

  &__headline {
    margin-bottom: 32px;
    text-align: center;
  }
}

@include media-lg {
  .image-with-headline {
    &__wrapper {
      margin: 0 120px;
    }
  }
}
</style>
