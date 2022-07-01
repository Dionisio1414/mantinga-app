<template>
  <div class="mobile-menu-modal">
    <div class="mobile-menu-modal__body">
      <template v-if="!selectedCategory">
        <HeaderAuthBlock
          v-if="isShowAuthBlock"
          :is-authorized="isAuthorized"
          :user-info="userInfo"
          @logout="logout"
        />
        <MobileMenuCategories
          :categories="allCategories"
          @select-category="selectCategory"
        />
        <MobileMenuNav :nav-items="navItems" />
        <MobileMenuFooter :social-items="socialItems" />
      </template>
      <template v-else>
        <MobileMenuCategory :category="selectedCategory" />
        <button class="mobile-menu-modal__btn" @click="exitCategory">
          <svg-icon
            class="mobile-menu-modal__icon"
            name="chevron-left"
            height="24"
            width="24"
          />
          <span class="btn-title"> Grįžti atgal </span>
        </button>
      </template>
    </div>
    <div class="mobile-menu-modal__close-container">
      <button class="mobile-menu-modal__close" @click="closeMenu">
        <svg-icon name="close" height="24" width="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Prop, Watch } from 'nuxt-property-decorator'

import MobileMenuCategories from './MobileMenuCategories.vue'
import MobileMenuNav from './MobileMenuNav.vue'
import MobileMenuFooter from './MobileMenuFooter.vue'
import MobileMenuCategory from './MobileMenuCategory.vue'
import HeaderAuthBlock from '~/components/header/HeaderAuthBlock.vue'

import { IMenuItem } from '~/types/menu.interface'
import { ITaxon } from '~/types/taxons'
import { IUserInfo } from '~/types/user-info.interface'

@Component({
  components: {
    MobileMenuCategories,
    MobileMenuNav,
    MobileMenuFooter,
    MobileMenuCategory,
    HeaderAuthBlock,
  },
})
export default class ComponentMobileMenuModal extends Vue {
  @Prop()
  public navItems!: IMenuItem

  @Prop()
  public socialItems!: IMenuItem

  @Getter('auth/isAuthorized')
  public isAuthorized!: boolean

  @Getter('user-info/userInfo')
  public userInfo!: IUserInfo

  @Action('auth/logout')
  public logout!: () => void

  @Getter('categories-list/allCategories')
  public allCategories!: ITaxon[]

  @Watch('$route.path')
  public handleRouteChanged(): void {
    this.closeMenu()
  }

  public categories: ITaxon[] = []
  public isSelectCategory: boolean = true
  public selectedCategory: ITaxon | null = null

  public get isShowAuthBlock(): boolean {
    return this.$nuxt.$data.layoutName === 'managersLayout'
  }

  public closeMenu(): void {
    this.$emit('close')
  }

  public selectCategory(category: ITaxon): void {
    this.selectedCategory = category
  }

  public exitCategory(): void {
    this.selectedCategory = null
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu-modal {
  overflow: auto;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 48px;
  background-color: rgba($color-primary-regular, 0.5);

  &__body {
    background-color: $color-white;
    width: 100%;
    min-height: 100%;
    height: min-content;
    padding: 16px 0;
    box-shadow: 0px 4px 6px 3px rgba(57, 71, 79, 0.1),
      0px 8px 8px -4px rgba(57, 71, 79, 0.08);
  }

  &__close-container {
    height: 48px;
    width: 48px;
    position: relative;
  }

  &__close {
    position: fixed;
    color: $color-white;
    background-color: $color-primary-regular;
    height: 48px;
    width: 48px;
  }

  &__btn {
    display: flex;
    align-items: center;
    margin: 32px auto;
  }

  &__icon {
    margin-right: 8px;
  }
}

@include media-lg {
  .mobile-menu-modal {
    display: none;
  }
}
</style>
