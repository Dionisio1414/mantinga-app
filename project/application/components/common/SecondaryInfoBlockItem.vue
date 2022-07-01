<template>
  <div
    class="secondary-info-item"
    :style="{
      'flex-basis': `calc(${itemFlexBasis}% - ${columnGap}px)`,
    }"
  >
    <svg-icon
      class="secondary-info-item__icon"
      name="leafs"
      width="55"
      height="40"
    />
    <p class="h6">{{ titleValue }}</p>
    <div class="subtitle" v-html="$sanitize(textValue)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { ISecondaryInfoBlockItem } from '~/types/content-type-secondary-info-block.interface'

@Component({
  components: {},
})
export default class ComponentSecondaryInfoBlockItem extends Vue {
  @Prop()
  public block!: ISecondaryInfoBlockItem

  @Prop({ default: '1' })
  public columns!: string

  public get textValue(): string | null {
    return this.block?.text?.value || null
  }

  public get titleValue(): string | null {
    return this.block?.title?.value || null
  }

  public get itemFlexBasis(): number {
    return 100 / Number(this.columns)
  }

  public get columnGap(): number {
    return 16 * (Number(this.columns) - 1)
  }
}
</script>

<style lang="scss" scoped>
.secondary-info-item {
  border-radius: 8px;
  box-shadow: $shadow-100;
  padding: 32px 24px 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-width: 179px;
  flex-grow: 1;

  &__icon {
    margin: 0 auto 16px auto;
  }
}
</style>
