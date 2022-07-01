<template>
  <div class="h1-container">
    <div class="h1-title">
      <h2 class="h1-title__text h2" :style="{ 'text-align': alignment }">
        {{ titleValue }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IH1TitleProperties } from '~/types/content-type-h1-title.interface'

@Component({})
export default class ComponentH1Title extends Vue {
  @Prop()
  public properties!: IH1TitleProperties

  public get titleValue(): string {
    return this.properties?.text?.value || ''
  }

  public get alignment(): string {
    return this.properties?.alignment?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.h1-container {
  padding: 0 16px;
  margin-bottom: 32px !important;
}
.h1-title {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

@include media-xl {
  .h1-container {
    padding: 0 120px;
  }
}
</style>
