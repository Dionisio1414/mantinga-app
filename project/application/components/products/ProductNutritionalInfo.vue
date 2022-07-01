<template>
  <div class="nutritional-info">
    <ProductTableRow :header="$t('product_inner.energy_value')">
      <span v-if="energyValueKj"> {{ energyValueKj }} kj /</span>
      <span v-if="energyValueKcal"> {{ energyValueKcal }} kcal </span>
    </ProductTableRow>

    <ProductTableRow
      v-for="attribute in internalAttributes"
      :key="`attribute-${attribute.code}`"
      :header="attribute.name"
    >
      {{ attribute.value || $t('common.no_info') }}
    </ProductTableRow>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import ProductTableRow from '~/components/products/ProductTableRow.vue'

import { IAttribute } from '~/types/product.interface'
import { NUTRITIONAL_ATTRIBUTES } from '~/constants/attributes-codes'

@Component({
  components: {
    ProductTableRow,
  },
})
export default class ComponentNutritionalInfo extends Vue {
  @Prop()
  public attributes!: IAttribute[]

  public get internalAttributes(): IAttribute[] {
    const result: IAttribute[] = []

    NUTRITIONAL_ATTRIBUTES.forEach((a) => {
      const attribute = this.attributes.find((e) => e.code === a)

      if (attribute) {
        result.push(attribute)
      }
    })

    return result
  }

  public get energyValueKj(): string {
    return (
      this.attributes?.find(
        (e: IAttribute) => e.code === 'nd_supplied_energy_value_kj'
      )?.value || ''
    )
  }

  public get energyValueKcal(): string {
    return (
      this.attributes?.find(
        (e: IAttribute) => e.code === 'nd_supplied_energy_value_kcal'
      )?.value || ''
    )
  }
}
</script>

<style lang="scss" scoped>
.nutritional-info {
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}
</style>
