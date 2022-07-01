<template>
  <div
    class="content-card-image"
    :class="[`content-card-image--${imageStyle}`]"
  >
    <img
      class="content-card-image__img"
      :class="[`content-card-image__img--${imageStyle}`]"
      :src="imageUrl"
      :alt="imageAlt"
    />
    <div
      class="content-card-image__mask"
      :class="[`content-card-image__mask--${imageStyle}`]"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentCardImage extends Vue {
  @Prop({ default: 'image_casual' })
  public imageStyle!: string

  @Prop({ default: '' })
  public imageUrl!: string

  @Prop({ default: '' })
  public imageAlt!: string
}
</script>

<style lang="scss" scoped>
.content-card-image {
  position: relative;
  padding: 24px 0;
  height: 314px;
  max-width: 414px;
  margin: 0 auto;
  padding: 0;

  &--image_casual {
    max-width: 100%;
    height: auto;
  }

  &__img {
    &--image_casual {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &--image_masked_red {
      position: absolute;
      top: 0;
      right: 0;
      mask-image: url(~assets/images/svg/mask.svg);
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }

    &--image_masked_golden {
      position: absolute;
      top: 0;
      right: 0;
      mask-image: url(~assets/images/svg/mask.svg);
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
  }

  &__mask {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: inherit;
    background-repeat: no-repeat;
    background-size: 16%;

    &--image_masked_red {
      background-image: url(~assets/images/svg/mask_red.svg);
    }

    &--image_masked_golden {
      background-image: url(~assets/images/svg/mask_golden.svg);
    }
  }
}

@include media-lg {
  .content-card-image {
    &:last-child {
      padding: 24px 0;
      height: 435px;
      max-width: 100%;
    }

    &__img {
      &--image_casual {
        border-radius: 8px;
      }

      &--image_masked_red {
        position: absolute;
        top: 0;
        right: 0;
        mask-image: url(~assets/images/svg/mask.svg);
        mask-size: 100% 100%;
        mask-repeat: no-repeat;
        width: 70%;
        height: 100%;
      }

      &--image_masked_golden {
        position: absolute;
        top: 0;
        right: 0;
        mask-image: url(~assets/images/svg/mask.svg);
        mask-size: 100% 100%;
        mask-repeat: no-repeat;
        width: 70%;
        height: 100%;
      }
    }

    &__mask {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 25%;

      &--image_masked_red {
        background-image: url(~assets/images/svg/mask_red.svg);
      }

      &--image_masked_golden {
        background-image: url(~assets/images/svg/mask_golden.svg);
      }
    }
  }
}
</style>
