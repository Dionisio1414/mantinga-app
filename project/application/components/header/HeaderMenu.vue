<template>
  <div v-click-outside="closeMenu" class="header-menu">
    <button class="header-menu__btn btn btn--golden" @click="toggleMenu">
      <span class="btn-title" v-html="$sanitize($t('header.products'))" />
      <svg-icon
        :name="!isOpenMenu ? 'chevron-down' : 'close'"
        width="24"
        height="24"
      />
    </button>
    <div
      v-if="isOpenMenu"
      class="header-menu__dropdown"
      :style="{ height: `calc(100vh - ${headerHeight}px)` }"
      @click.self="closeMenu"
    >
      <div class="header-menu__wrapper">
        <ProductCategories :categories="categories" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import ProductCategories from '~/components/products/ProductCategories.vue'
import { ITaxon } from '~/types/taxons'

@Component({
  components: {
    ProductCategories,
  },
})
export default class ComponentHeaderMenu extends Vue {
  @Prop()
  public headerHeight!: number

  @Prop()
  public isOpenMenu!: boolean

  @Prop({ default: () => [] })
  public categories!: ITaxon[]

  public toggleMenu(): void {
    this.$emit('toggle')
  }

  public closeMenu(): void {
    this.$emit('close')
  }

  @Watch('isOpenMenu')
  public handleMenuState(value: boolean) {
    if (value) document.body.classList.add('disable-body')
    else document.body.classList.remove('disable-body')
  }

  @Watch('$route.path')
  public handleRouteChanged(): void {
    if (this.isOpenMenu) this.closeMenu()
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  display: none;
}

@include media-lg {
  .header-menu {
    display: block;

    &__btn {
      display: flex;
    }

    &__dropdown {
      width: 100%;
      position: absolute;
      top: 100%;
      right: 0;
      overflow: auto;
    }

    &__wrapper {
      background-color: $color-white;
      width: 100%;
      width: 100%;
      box-shadow: 0px 6px 12px 2px rgba(57, 71, 79, 0.1),
        0px 8px 24px -4px rgba(57, 71, 79, 0.08);
      margin: 0 auto;
      border-radius: 0 0 8px 8px;
      padding: 48px;
    }

    &__block {
      display: grid;
      grid-template-columns: 48px 1fr;
      width: 300px;
      margin-bottom: 48px;
    }

    &__icon {
      color: $color-golden;
    }

    &__list {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }

    &__header {
      margin-bottom: 16px;
      color: $color-primary-dark;
    }

    &__item {
      margin-bottom: 16px;
      color: $color-primary-dark;
      cursor: pointer;
    }
  }
}
</style>
