<template>
  <div class="hero-secondary-block">
    <img class="hero-secondary-block__img" :src="imageUrl" :alt="imageAlt" />
    <div class="hero-secondary-block__gradient"></div>
    <div class="hero-secondary-block__wrapper">
      <div class="hero-secondary-block__container">
        <h3 class="hero-secondary-block__header h3">{{ titleValue }}</h3>
        <div
          class="hero-secondary-block__subtitle subtitle"
          v-html="$sanitize(textValue)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IHeroSecondaryBlockProperties } from '~/types/content-type-hero-secondary-block.interface'

@Component({})
export default class ComponentHeroSecondaryBlock extends Vue {
  @Prop()
  public properties!: IHeroSecondaryBlockProperties

  public get imageUrl(): string | null {
    return this.properties?.image?.url || null
  }

  public get imageAlt(): string | null {
    return this.properties?.alt?.value || null
  }

  public get textValue(): string | null {
    return this.properties?.text?.value || null
  }

  public get titleValue(): string | null {
    return this.properties?.title?.value || null
  }
}
</script>

<style lang="scss" scoped>
.hero-secondary-block {
  position: relative;
  min-height: 544px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(57, 71, 79, 0.67) 0%,
      rgba(57, 71, 79, 0.33) 51.79%,
      rgba(57, 71, 79, 0) 100%
    );
    z-index: 2;
  }
  &__wrapper {
    padding: 48px 16px;
    width: 100%;
  }

  &__container {
    position: relative;
    z-index: 3;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  &__header {
    color: $color-white;
  }

  &__subtitle {
    color: $color-white;
    margin-top: 32px;
  }
}

@include media-lg {
  .hero-secondary-block {
    align-items: flex-start;

    &__wrapper {
      padding: 104px 120px;
    }

    &__header {
      max-width: 592px;
    }

    &__subtitle {
      max-width: 592px;
    }
  }
}
</style>
