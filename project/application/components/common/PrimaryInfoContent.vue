<template>
  <div
    class="primary-info-content"
    :class="{ 'primary-info-content--one-column': isOneColumn }"
  >
    <div class="primary-info-content__info">
      <img
        v-if="imageUrl"
        class="primary-info-content__img"
        :src="imageUrl"
        :alt="imageAlt"
      />
      <template v-if="isOneColumn">
        <h3 v-if="titleValue" class="primary-info-content__headline h3">
          {{ titleValue }}
        </h3>
      </template>
      <template v-else>
        <h3 v-if="titleValue" class="primary-info-content__headline h4">
          {{ titleValue }}
        </h3>
      </template>
    </div>
    <div class="primary-info-content__text">
      <div v-if="textValue" class="subtitle" v-html="$sanitize(textValue)" />
      <a
        v-if="buttonUrl && buttonText"
        :href="buttonUrl"
        :target="buttonNewTab ? '_blank' : '_self'"
        class="primary-info-content__btn btn btn--golden btn--max-content"
      >
        <span class="btn-title">{{ buttonText }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IPrimaryInfoBlockItem } from '~/types/content-type-primary-info-block.interface'

@Component({})
export default class ComponentPrimaryInfoContent extends Vue {
  @Prop()
  public block!: IPrimaryInfoBlockItem

  @Prop({ default: false })
  public isOneColumn!: boolean

  public get titleValue(): string | null {
    return this.block?.title?.value || null
  }

  public get imageUrl(): string | null {
    return this.block?.image?.url || null
  }

  public get imageAlt(): string | null {
    return this.block['image-alt']?.value || null
  }

  public get textValue(): string | null {
    return this.block?.text.value || null
  }

  public get buttonUrl(): string | null {
    return this.block?.button_url?.value || null
  }

  public get buttonNewTab(): boolean | null {
    return this.block?.button_new_tab?.value || false
  }

  public get buttonText(): string | null {
    return this.block?.button_text?.value || null
  }
}
</script>

<style lang="scss" scoped>
.primary-info-content {
  display: grid;
  grid-template-columns: 100%;

  &:not(:last-child) {
    margin-bottom: 64px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__headline {
    text-align: center;
    margin: 16px 0;
    font-size: 48px;
  }

  &__img {
    max-width: 56px;
    margin-bottom: 16px;
    margin: 0 auto;
  }

  &__btn {
    width: max-content;
    margin: 0 auto;
    margin-top: 24px;
  }

  &__text {
    margin-top: 16px;
  }

  &--one-column {
    grid-template-columns: 100%;

    .primary-info-content {
      &__info {
        display: flex;
        flex-direction: column;
      }

      &__img {
        margin-left: auto;
        margin-bottom: 0px;
        max-width: 56px;
        width: 100%;
      }

      &__text {
        margin-top: 0px;
      }

      &__headline {
        font-size: 34px;
        margin-top: 0;
      }

      &__btn {
        margin-top: 32px;
      }
    }
  }
}

@include media-lg {
  .primary-info-content {
    display: flex;

    &__img {
      margin: 0 0 16px 0;
    }

    &__btn {
      margin: 24px 0 0 0;
    }

    &__text {
      margin-top: 0;
    }

    &__info {
      max-width: 520px;
      width: 100%;
    }

    &__headline {
      text-align: left;
    }

    &--one-column {
      flex-direction: column;

      .primary-info-content {
        &__info {
          max-width: auto;
        }

        &__headline {
          margin-top: 24px;
        }

        &__btn {
          margin: 32px 0 0 auto;
        }
      }
    }
  }
}
</style>
