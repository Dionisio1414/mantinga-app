<template>
  <div class="image-block">
    <div class="image-block__container">
      <img
        class="image-block__img"
        :src="imageSrc"
        :alt="imageAlt"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IImageBlockProperties } from '~/types/content-type-image-block.interface'

@Component({})
export default class ComponentImageBlock extends Vue {
  @Prop()
  public properties!: IImageBlockProperties


  public get imageSrc(): string {
    return this.properties?.image?.url || ''
  }

  public get imageAlt(): string {
    return this.properties['image-alt']?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.image-block {
  &__container {
    margin: 0px;
  }

  &__img {
    width: 100%;
  }
}

@include media-lg {
  .image-block {
    &__container {
      margin: 0 120px;
      display: flex;
      align-items: center;
    }

    &__img {
        max-width: 1200px;
        margin: 0 auto;
    }
  }
}
</style>
