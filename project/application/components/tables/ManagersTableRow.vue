<template>
  <div class="table-row" :class="{ 'table-row--selected': selected }">
    <div class="table-row__cell">
      <input
        :id="`checkbox-product-${productId}`"
        v-model="selected"
        class="form-checkbox"
        type="checkbox"
        @change="handleCheckbox"
      />
      <label :for="`checkbox-product-${productId}`"></label>
    </div>
    <div
      class="table-row__cell body-text2 body-text2--bold text-center"
      v-html="$sanitize(productCode)"
    />
    <div
      class="table-row__cell body-text2 body-text2--bold"
      @click="onClickProduct"
    >
      <div class="table-row__img-container">
        <img class="table-row__img" :src="productImage" />
      </div>
    </div>
    <div class="table-row__cell">
      <span
        class="table-row__status"
        :class="{ 'table-row__status--active': productStatus === productStatusNew }"
      ></span>
    </div>
    <div
      class="table-row__cell body-text2 body-text2--bold"
      @click="onClickProduct"
    >
      <div class="table-row__name" v-html="$sanitize(productName)" />
      <TranslationsList
        class="table-row__translations"
        :translations="productTranslations"
      />
    </div>
    <div
      class="table-row__cell body-text2 body-text2--bold"
      v-html="$sanitize(productCategory)"
    />
    <button
      class="
        table-row__cell table-row__icon-container
        body-text2 body-text2--bold
      "
      type="button"
      @click="downloadPresentation"
    >
      <svg-icon class="table-row__icon" name="pdf" width="48" height="48" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import TranslationsList from '~/components/common/TranslationsList.vue'

import { IManagerTableRowToggle } from '~/types/manager-table.interface'
import { IManagerProduct } from '~/types/manager-products.interface'
import { EProductStatus } from '~/constants/product-status'

@Component({
  components: {
    TranslationsList,
  },
})
export default class ManagersTableRow extends Vue {
  @Prop()
  public product!: IManagerProduct

  @Prop({ default: () => [] })
  public selectedProductsIds!: (number | string)[]

  public selected: boolean = false
  public productStatusNew: EProductStatus = EProductStatus.NEW

  @Watch('selectedProductsIds', { immediate: true })
  public handleSelectedIds(): void {
    if (this.selectedProductsIds.includes(this.productId)) this.selected = true
    else this.selected = false
  }

  public get productId(): number {
    return this.product?.id
  }

  public get productSlug(): string {
    return this.product?.slug || ''
  }

  public get productCode(): string {
    return this.product?.productCode || ''
  }

  public get productImage(): string {
    return this.product?.image || ''
  }

  public get productName(): string {
    return this.product?.name || ''
  }

  public get productStatus(): number | null {
    return this.product?.status
  }

  public get productTranslations(): string[] {
    return this.product?.translations || []
  }

  public get productCategory(): string {
    return this.product?.category?.parentName || this.product?.category?.name || ''
  }

  public get productPresentation(): string {
    return this.product?.presentation || ''
  }

  public onClickProduct(): void {
    this.$emit('onClickProduct', this.productSlug)
  }

  public handleCheckbox(event: any): void {
    const toggleRowBody: IManagerTableRowToggle = {
      selected: event.target.checked,
      id: this.productId,
      locales: this.product?.translations || []
    }

    this.$emit('toggleRow', toggleRowBody)
  }

  public downloadPresentation(): void {
    this.$emit('downloadPresentation', this.product.id)
  }
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  grid-template-columns: 24px 48px 104px 4px 200px 128px auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid $color-golden-light;

  &:hover {
    background-color: rgba($color-golden, 0.1);
  }

  &--selected {
    background-color: rgba($color-golden, 0.1);
  }

  &__status {
    width: 4px;
    height: 100%;
    background-color: transparent;
    border-radius: 4px;

    &--active {
      background-color: $color-golden;
    }
  }

  &__cell {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:last-child {
      align-items: flex-end;
      padding-right: 31px;
    }
  }

  &__translations {
    margin-top: 12px;
  }

  &__img-container {
    width: 104px;
    height: 104px;
    overflow: hidden;
    border-radius: 8px;
    margin: 0 auto;
    cursor: pointer;
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center;
  }

  &__icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  &__name {
    max-width: 158px;
    cursor: pointer;
  }
}

@include media-lg {
  .table-row {
    grid-template-columns: 40px 100px 128px 4px 400px 200px auto;

    &__img-container {
      width: 128px;
      height: 128px;
    }

    &__name {
      max-width: 492px;
    }
  }
}
</style>
