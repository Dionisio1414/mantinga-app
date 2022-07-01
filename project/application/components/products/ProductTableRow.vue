<template>
  <div class="product-table-row">
    <div
      class="nutritional-info__header body-text1 body-text1--bold"
      v-html="$sanitize(header)"
    />
    <div class="nutrinional-info__value body-text1">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentProductTableRow extends Vue {
  @Prop()
  public header!: string
}
</script>

<style lang="scss" scoped>
.product-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
