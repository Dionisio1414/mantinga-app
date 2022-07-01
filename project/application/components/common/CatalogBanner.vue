<template>
  <div class="catalog-banner">
    <div class="catalog-banner__block">
      <h2
        class="catalog-banner__heading catalog-banner__heading--desktop h4"
        v-html="$sanitize(titleValue)"
      />
      <h2
        class="catalog-banner__heading catalog-banner__heading--mobile h5"
        v-html="$sanitize(titleValue)"
      />

      <a :href="linkUrl" target="_blank" class="catalog-banner__btn btn btn--golden">
        <span class="btn-title">{{ buttonText }}</span>
      </a>
      <div class="catalog-banner__separator" />
    </div>
    <div class="catalog-banner__block">
      <img class="catalog-banner__img" :src="imageUrl" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IContentTypeCatalogueBannerProperties } from '~/types/content-type-catalogue-banner.interface'

@Component({
  components: {},
})
export default class ComponentCatalogBanner extends Vue {
  @Prop()
  public properties!: IContentTypeCatalogueBannerProperties;

  public get titleValue(): string {
    return this.properties?.title?.value || ''
  }

  public get buttonText(): string {
    return this.properties?.button_text?.value || ''
  }

  public get imageUrl(): string {
    return this.properties?.image?.url || ''
  }

  public get linkUrl(): string {
    return this.properties?.button_url?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.catalog-banner {
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  max-width: 1200px;

  &__heading {
    text-align: center;

    &--desktop {
      display: none;
    }
  }

  &__btn {
    width: 100%;
    margin-top: 32px;
  }

  &__block {
    &:first-child {
      background-color: $color-primary-regular;
      color: $color-white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom: 4px solid $color-golden;
      border-top-left-radius: 200px;
      padding: 96px 65px 40px 66px;
    }

    &:last-child {
      border-bottom-right-radius: 200px;
      overflow: hidden;
      max-height: 300px;
    }
  }

  &__img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
}

@include media-lg {
  .catalog-banner {
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
    max-height: 484px;

    &__btn {
      width: max-content;
    }

    &__heading {
      text-align: left;
      padding-right: 32px;

      &--desktop {
        display: inline;
      }

      &--mobile {
        display: none;
      }
    }

    &__block {
      width: 100%;

      &:first-child {
        max-width: 499px;
        align-items: flex-start;
        padding: 136px 0 136px 109px;
        border-bottom: none;
      }

      &:last-child {
        max-height: 100%;
      }
    }

    &__separator {
      width: 100%;
      height: 4px;
      background-color: $color-golden;
      margin-top: 32px;
    }
  }
}
</style>
