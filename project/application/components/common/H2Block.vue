<template>
  <div class="h2-block">
    <img class="h2-block__img" :src="imageUrl" :alt="imageAlt" />
    <div class="h2-block__gradient"></div>
    <div class="h2-block__wrapper">
      <div class="h2-block__container">
        <h2 class="h2-block__text h2">{{ titleValue }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IH2BlockProperties } from '~/types/content-type-h2-block.interface'

@Component({
  components: {},
})
export default class ComponentH2Block extends Vue {
  @Prop()
  public properties!: IH2BlockProperties

  public get imageUrl(): string {
    return this.properties?.image?.url || ''
  }

  public get imageAlt(): string {
    return this.properties?.alt?.value || ''
  }

  public get titleValue(): string {
    return this.properties?.title?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.h2-block {
  position: relative;
  height: 466px;
  width: auto;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0;

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    width: auto;
    height: 100%;
    width: 100%;
    z-index: 2;
  }

  &__gradient {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: linear-gradient(
      90deg,
      rgba(57, 71, 79, 0.67) 0%,
      rgba(57, 71, 79, 0.33) 51.79%,
      rgba(57, 71, 79, 0) 100%
    );
  }

  &__wrapper {
    padding: 0 16px;
    z-index: 4;
    width: 100%;

  }

  &__container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  &__text {
    z-index: 4;
    color: $color-white;
    margin: 0 16px;
    text-align: center;
    width: 100%;
  }
}

@include media-lg {
  .h2-block {
    margin: 0;
    width: 100%;

    &__wrapper {
      padding: 0 120px;
    }

    &__img {
      width: 100%;
      height: auto;
    }

    &__text {
      margin: 0;
      text-align: left;
      width: auto;
    }
  }
}
</style>
