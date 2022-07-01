<template>
  <div class="hero-primary-block">
    <img class="hero-primary-block__img" :src="imageUrl" :alt="imageAlt" />
    <div class="hero-primary-block__gradient"></div>
    <div class="hero-primary-block__wrapper">
      <div class="hero-primary-block__container">
        <h3 class="hero-primary-block__header h3">{{ titleValue }}</h3>
        <div
          class="hero-primary-block__subtitle subtitle"
          v-html="$sanitize(textValue)"
        />
        <div class="hero-primary-block__buttons">
          <a
            v-for="(button, i) in buttons"
            :key="i"
            :href="button.url.value"
            :target="button.new_tab ? '_blank' : '_self'"
            class="hero-primary-block__button btn btn--secondary"
          >
            <span class="btn-title">{{ button.text.value }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import {
  IHeroPrimaryBlockButton,
  IHeroPrimaryBlockProperties,
} from '~/types/content-type-hero-primary-block.interface'

@Component({})
export default class ComponentHeroPrimaryBlock extends Vue {
  @Prop()
  public properties!: IHeroPrimaryBlockProperties

  public get buttons(): IHeroPrimaryBlockButton[] {
    return this.properties?.button_blocks?.value || []
  }

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
.hero-primary-block {
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

  &__subheader {
    color: $color-white;
    margin-top: 32px;
  }

  &__subtitle {
    color: $color-white;
    margin-top: 32px;
  }

  &__button {
    margin-top: 32px;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@include media-lg {
  .hero-primary-block {
    align-items: flex-start;

    &__wrapper {
      padding: 104px 120px;
    }

    &__header {
      max-width: 592px;
    }

    &__subheader {
      max-width: 592px;
    }

    &__subtitle {
      max-width: 592px;
    }

    &__button {
      margin: 32px 0;
    }

    &__buttons {
      justify-content: flex-start;
    }
  }
}
</style>
