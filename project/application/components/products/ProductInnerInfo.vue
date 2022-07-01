<template>
  <div class="product-inner-info">
    <Accordion
      v-if="description"
      class="product-inner-info__accordion"
      :header="$sanitize($t('product_inner.about_product'))"
    >
      <template #content>
        <div
          class="product-inner-info__content body-text1"
          v-html="$sanitize(description)"
        ></div>
      </template>
    </Accordion>

    <Accordion
      class="product-inner-info__accordion"
      :header="$sanitize($t('product_inner.nutritional_value'))"
    >
      <template #content>
        <div class="product-inner-info__content">
          <ProductNutritionalInfo :attributes="attributes" />
        </div>
      </template>
    </Accordion>
    <Accordion
      class="product-inner-info__accordion"
      :header="$sanitize($t('product_inner.technical_data'))"
    >
      <template #content>
        <div class="product-inner-info__content">
          <ProductTechnicalInfo
            :is-authorized="isAuthorized"
            :product="product"
          />
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Accordion from '~/components/common/Accordion.vue'
import ProductNutritionalInfo from '~/components/products/ProductNutritionalInfo.vue'
import ProductTechnicalInfo from '~/components/products/ProductTechnicalInfo.vue'
import { IAttribute, IProduct } from '~/types/product.interface'

@Component({
  components: {
    Accordion,
    ProductNutritionalInfo,
    ProductTechnicalInfo,
  },
})
export default class ComponentProductInnerInfo extends Vue {
  @Prop()
  public product!: IProduct

  @Prop({ default: false })
  public isAuthorized!: boolean

  public get description(): string {
    return this.product?.description || ''
  }

  public get productCode(): string {
    return this.product?.productCode || ''
  }

  public get attributes(): IAttribute[] {
    return this.product?.attributes || []
  }
}
</script>

<style lang="scss" scoped>
.product-inner-info {
  &__content {
    padding-top: 32px;
  }

  &__accordion {
    &:not(:last-child) {
      margin-bottom: 48px;
    }
  }
}
</style>
