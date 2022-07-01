<template>
  <div class="secondary-info-container">
    <div class="secondary-info-block">
      <SecondaryInfoBlockItem
        v-for="(block, i) in blocks"
        :key="i"
        :block="block"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import SecondaryInfoBlockItem from './SecondaryInfoBlockItem.vue'

import {
  ISecondaryInfoBlockItem,
  ISecondaryInfoBlockProperties,
} from '~/types/content-type-secondary-info-block.interface'

@Component({
  components: {
    SecondaryInfoBlockItem,
  },
})
export default class ComponentSecondaryInfoBlock extends Vue {
  @Prop()
  public properties!: ISecondaryInfoBlockProperties

  public get blocks(): ISecondaryInfoBlockItem[] {
    return this.properties?.blocks?.value || []
  }

  public get columns(): string | null {
    return this.properties?.columns?.value || null
  }
}
</script>

<style lang="scss" scoped>
.secondary-info-container {
  padding: 0 16px;
}

.secondary-info-block {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

@include media-lg {
  .secondary-info-container {
    padding: 2px 120px;
  }
}
</style>
