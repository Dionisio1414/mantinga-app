<template>
  <div class="product-additives">
    <div
      v-for="(additive, i) in additivesForLayout"
      :key="i"
      class="product-additives__icon"
    >
      <img
        class="product-additives__img"
        :src="additive && additive.image"
        :alt="additive && additive.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IProductBadge } from '~/types/product.interface'

@Component({})
export default class ComponentProductAdditives extends Vue {
  @Prop({ default: () => [] })
  public additives!: IProductBadge[]

  @Prop({ default: false })
  public isCard!: boolean

  public get additivesForLayout(): IProductBadge[] {
    return this.isCard ? this.additives.slice(0, 3) : this.additives
  }
}
</script>

<style lang="scss" scoped>
.product-additives {
  display: flex;

  &__icon {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__img {
    width: 32px;
    height: auto;
  }
}

@include media-md {
  .product-additives {
    &__icon {
      height: 48px;
      width: 48px;
    }

    &__img {
      width: 48px;
    }
  }
}
</style>
