<template>
  <div
    class="product-card"
    :class="{ 'product-card--mobile-no-shadow': !withShadowOnMobile }"
  >
    <NuxtLink
      :to="
        localePath({
          name: 'p-slug',
          params: {
            slug: productSlug
          },
        })
      "
    >
      <div class="product-card__img-container">
        <div
          v-if="primaryBadge && primaryBadge.name"
          class="product-card__label overline"
        >
          {{ primaryBadge && primaryBadge.name }}
        </div>
        <button
          class="product-card__like"
          @click.stop.prevent="updateFavouriteProducts(productId)"
        >
          <svg-icon
            :name="isLikedProduct ? 'favourite-filled' : 'favourite'"
            width="24"
            height="24"
          />
        </button>
        <img
          v-if="!image"
          class="product-card__img product-card__img--alt"
          src="~/assets/sprite/svg/mantinga_logo.svg"
          alt="Logo"
        />
        <img v-else class="product-card__img" :src="image" />

        <div class="product-card__additives">
          <ProductAdditives :is-card="true" :additives="productBadges" />
        </div>
      </div>
      <div class="product-card__content">
        <p class="product-card__title subtitle truncate truncate--3-lines">
          {{ name }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Prop } from 'nuxt-property-decorator'
import ProductAdditives from '~/components/common/ProductAdditives.vue'
import { IProductBadge, IProductCard } from '~/types/product.interface'

@Component({
  components: {
    ProductAdditives,
  },
})
export default class ComponentProductCard extends Vue {
  @Prop()
  public product!: IProductCard

  @Getter('favourite-products/favouriteProducts')
  public favouriteProductsIds!: number[]

  @Action('favourite-products/updateFavouritesProducts')
  public updateFavouriteProducts!: (id: number) => void

  @Prop({ default: true })
  public withShadowOnMobile!: boolean

  @Prop({ default: 'category' })
  public categorySlug!: string

  @Prop({ default: 'subcategory' })
  public subcategorySlug!: string

  public get name(): string {
    return this.product?.name || ''
  }

  public get image(): string {
    return this.product?.image || ''
  }

  public get additives(): string[] {
    return []
  }

  public get badge(): string {
    return ''
  }

  public get productId(): number {
    return this.product?.id
  }

  public get isLikedProduct(): boolean {
    return this.favouriteProductsIds.includes(this.productId)
  }

  public get productBadges(): IProductBadge[] {
    return this.product?.productBadges?.filter(
      (badge: IProductBadge) => !badge.primary
    )
  }

  public get primaryBadge(): IProductBadge | null {
    return (
      this.product?.productBadges?.find(
        (badge: IProductBadge) => badge.primary
      ) || null
    )
  }

  public get productSlug(): string {
    return this.product?.slug || ''
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  box-shadow: $shadow-100;
  border-radius: 8px;
  width: auto;
  height: 100%;
  cursor: pointer;

  &--mobile-no-shadow {
    box-shadow: none;

    &__label {
      border-radius: 8px;
    }
  }

  &__img-container {
    height: 259px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;

    &--alt {
      width: 80px;
    }
  }

  &__label {
    position: absolute;
    left: 0;
    top: 24px;
    background-color: $color-golden-light;
    padding: 8px 12px;
    font-weight: 400;
    border-radius: 0 8px 8px 0;
  }

  &__like {
    position: absolute;
    right: 16px;
    top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
  }

  &__additives {
    position: absolute;
    bottom: 16px;
    left: 16px;
  }

  &__content {
    padding: 16px 24px;
    max-width: 234px;
  }
}
.wrapper {
  &:hover {
    box-shadow: $shadow-100;
  }
}

@include media-lg {
  .product-card {
    box-shadow: none;
    transition: 200ms;

    &__label {
      border-radius: 8px;
    }

    &:hover {
      box-shadow: $shadow-100;

      .product-card__label {
        border-radius: 0 8px 8px 0;
      }
    }
  }
}
</style>
