<template>
  <div
    class="primary-info-container"
    :class="{ 'primary-info-container--one-column': isOneColumn }"
  >
    <div
      class="primary-info-block"
      :class="{
        'primary-info-block--one-column': isOneColumn,
      }"
    >
      <div class="primary-info-block__wrapper">
        <PrimaryInfoContent
          v-for="(block, i) in blocks"
          :key="i"
          :block="block"
          :is-one-column="isOneColumn"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import PrimaryInfoContent from './PrimaryInfoContent.vue'

import {
  IPrimaryInfoBlockProperties,
  IPrimaryInfoBlockItem,
} from '~/types/content-type-primary-info-block.interface'

@Component({
  components: {
    PrimaryInfoContent,
  },
})
export default class ComponentPrimaryInfoBlock extends Vue {
  @Prop()
  public properties!: IPrimaryInfoBlockProperties

  public get blocks(): IPrimaryInfoBlockItem[] {
    return this.properties.blocks.value || []
  }

  public get isOneColumn(): boolean {
    return this.properties.columns.value === '1'
  }
}
</script>

<style lang="scss" scoped>
.primary-info-container {
  margin: 0;

  &--one-column {
    margin: 0 16px;
  }
}

.primary-info-block {
  background-color: $color-primary-regular;
  color: $color-white;
  padding: 32px 16px;

  &--one-column {
    max-width: 592px;
    margin: 0 auto;
    border-radius: 8px;
    padding: 32px 16px;
  }

  &__wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

@include media-lg {
  .primary-info-block {
    padding: 48px 120px;

    &--one-column {
      padding: 64px;
    }
  }
}
</style>
