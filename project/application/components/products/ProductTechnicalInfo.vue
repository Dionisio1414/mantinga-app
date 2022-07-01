<template>
  <div class="technical-info">
    <ProductTableRow :header="$t('product_inner.product_code')">
      {{ productCode || $t('common.no_info') }}
    </ProductTableRow>

    <template v-if="isAuthorized">
      <ProductTableRow :header="$t('product_inner.product_status')">
        <div class="technical-info__status">
          <div
            class="technical-info__status-icon"
            :class="[`technical-info__status-icon--${productStatus}`]"
          />
          <div
            class="techinal-ingo__status-text"
            v-html="$sanitize($t(`common.statuses.${productStatus}`))"
          />
        </div>
      </ProductTableRow>

      <ProductTableRow :header="$t('product_inner.product_translations')">
        <TranslationsList
          class="table-row__translations"
          :translations="productTranslations"
        />
      </ProductTableRow>
    </template>

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
import TranslationsList from '~/components/common/TranslationsList.vue'

import { IAttribute, IProduct } from '~/types/product.interface'
import { TECHNICAL_ATTRIBUTES } from '~/constants/attributes-codes'

@Component({
  components: {
    ProductTableRow,
    TranslationsList,
  },
})
export default class ComponentTechnicalInfo extends Vue {
  @Prop()
  public product!: IProduct

  @Prop({ default: false })
  public isAuthorized!: boolean

  public get internalAttributes(): IAttribute[] {
    const result: IAttribute[] = []

    TECHNICAL_ATTRIBUTES.forEach((a) => {
      const attribute = this.product?.attributes.find((e) => e.code === a)

      if (attribute) {
        result.push(attribute)
      }
    })

    return result
  }

  public get productCode(): string {
    return this.product?.productCode || ''
  }

  public get productStatus(): number {
    return this.product?.status
  }

  public get productTranslations(): string[] {
    return this.product?.translations || []
  }
}
</script>

<style lang="scss" scoped>
.technical-info {
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__status {
    display: flex;
  }

  &__status-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;

    &--0 {
      background-color: $color-secondary;
    }

    &--1 {
      background-color:  $color-success
    }

    &--2 {
      background-color: $color-golden;
    }
  }
}
</style>
