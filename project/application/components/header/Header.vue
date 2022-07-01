<template>
  <header class="header">
    <div class="header__wrapper">
      <div
        ref="header_ref"
        class="header__container"
        :class="{ 'header__container--minimized': isMinimizedHeader }"
      >
        <client-only>
          <button class="header__button" @click="openMenu">
            <svg-icon name="menu" width="24" height="24" />
          </button>
        </client-only>
        <HeaderLogo :is-minimized="isMinimizedHeader" />
        <div class="header__block">
          <div v-if="!isMinimizedHeader" class="header__navigation">
            <NuxtLink
              v-if="isAuthorized"
              :to="localePath({name: 'manager-products'})"
              class="header__link body-text1"
              >Dashboard</NuxtLink
            >
            <HeaderNav
              :nav-items="headerMenu"
              :is-authorized="isAuthorized"
            />
           
          </div>
          <div class="header__subblock">
            <HeaderSearch
              :is-minimized="isMinimizedHeader"
              :header-height="headerHeight"
              class="header__search"
            />
            <client-only>
              <HeaderMenu
                :header-height="headerHeight"
                class="header__menu"
                :is-open-menu="isOpenMenu"
                :categories="allCategories"
                @toggle="toggleMenu"
                @close="closeMenu"
              />
            </client-only>
            <HeaderCartButton />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  mixins,
  Watch,
} from 'nuxt-property-decorator'

import HeaderLogo from '~/components/header/HeaderLogo.vue'
import HeaderCartButton from '~/components/header/HeaderCartButton.vue'
import HeaderSearch from '~/components/search/HeaderSearch.vue'
import HeaderMenu from '~/components/header/HeaderMenu.vue'
import HeaderNav from '~/components/header/HeaderNav.vue'
import MobileMenuModal from '~/components/header/mobile/MobileMenuModal.vue'

import scrollDirectionMixin from '~/mixins/scrollDirectionMixin'

import { IMenuItem } from '~/types/menu.interface'
import { MOBILE_MENU_MODAL_CONFIG } from '~/constants/modals-config'
import { ITaxon } from '~/types/taxons'

@Component({
  components: {
    HeaderLogo,
    HeaderCartButton,
    HeaderSearch,
    HeaderMenu,
    HeaderNav,
  },
})
export default class ComponentHeader extends mixins(scrollDirectionMixin) {
  @Action('header/changeHeaderType')
  public changeHeaderType!: (isMinimized: boolean) => void

  @Action('header/toggleProducts')
  public toggleMenu!: () => void

  @Action('header/closeProducts')
  public closeMenu!: () => void

  @Getter('header/isShowProductsCategories')
  public isOpenMenu!: boolean

  @Getter('menu/headerMenu')
  public headerMenu!: IMenuItem

  @Getter('header/isMinimizedHeader')
  public isMinimizedHeader!: boolean

  @Getter('menu/headerSocials')
  public headerSocials!: IMenuItem

  @Getter('auth/isAuthorized')
  public isAuthorized!: boolean

  @Getter('categories-list/allCategories')
  public allCategories!: ITaxon[];

  public headerHeight: number = 0
  public $modal: any

  @Watch('isScrollDown')
  public handleMinimized(value: boolean) {
    this.calculateHeaderHeight()
    this.changeHeaderType(value)
  }

  public openMenu(): void {
    this.$modal.show(
      MobileMenuModal,
      { navItems: this.headerMenu, socialItems: this.headerSocials },
      MOBILE_MENU_MODAL_CONFIG
    )
  }

  public calculateHeaderHeight(): void {
    this.headerHeight = (this.$refs.header_ref as HTMLElement)?.offsetHeight || 0
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: $z-index-menu;

  &__button {
    display: flex;
    align-items: center;
    color: $color-golden;
  }

  &__wrapper {
    padding: 4px 16px 4px 29px;
    background-color: $color-primary-regular;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    height: $header-height-mobile;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__block {
    display: flex;
    justify-content: flex-end;
  }

  &__subblock {
    display: flex;
    justify-content: flex-end;
  }

  &__navigation {
    display: none;
  }

  &__search {
    margin-right: 16px;
  }
}

@include media-lg {
  .header {
    position: fixed;

    &__button {
      display: none;
    }

    &__wrapper {
      padding: 0px 120px;
    }

    &__container {
      height: $header-height-desktop;
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;
      transition: height 150ms ease-out;

      &--minimized {
        height: $header-height-desktop-min;
        padding: 12px 0px;

        .header__subblock {
          margin-top: 0;
        }
      }
    }

    &__block {
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      margin-left: 48px;
    }

    &__navigation {
      display: flex;
      align-items: center;
    }

    &__subblock {
      width: 100%;
      margin-top: 16px;
    }

    &__search {
      margin-right: 32px;
    }

    &__link {
      color: $color-white;
      margin-right: 32px;
    }
  }
}
</style>
