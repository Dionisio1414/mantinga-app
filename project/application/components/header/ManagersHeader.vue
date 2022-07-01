<template>
  <header class="managers-header">
    <div class="managers-header__wrapper">
      <div ref="header_ref" class="managers-header__container">
        <button class="managers-header__button" @click="openMenu">
          <svg-icon name="menu" width="24" height="24" />
        </button>
        <HeaderLogo :is-minimized="true" />
        <div class="managers-header__block">
          <div class="managers-header__navigation">
            <HeaderNav :nav-items="headerMenu" :is-authorized="isAuthorized" />
            <HeaderAuthBlock
              :is-authorized="isAuthorized"
              :user-info="userInfo"
              @logout="openConfirmLogoutModal"
              @login="goToLogin"
            />
          </div>
          <div v-if="isAuthorized" class="managers-header__auth">
            <NuxtLink :to="localePath({name: 'manager-products'})" class="managers-header__button">
              <svg-icon
                class="header-auth__icon"
                name="home"
                width="24"
                height="24"
              />
            </NuxtLink>
            <button class="managers-header__button" type="button" @click="openConfirmLogoutModal">
              <svg-icon
                class="header-auth__icon"
                name="logout"
                width="24"
                height="24"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter } from 'nuxt-property-decorator'

import HeaderLogo from '~/components/header/HeaderLogo.vue'
import HeaderNav from '~/components/header/HeaderNav.vue'
import MobileMenuModal from '~/components/header/mobile/MobileMenuModal.vue'
import HeaderAuthBlock from '~/components/header/HeaderAuthBlock.vue'
import ModalConfirmation from '~/components/modals/ModalConfirmation.vue'

import { IMenuItem } from '~/types/menu.interface'
import { IModalConfirmationProps } from '~/types/modal-confirmation'
import { IUserInfo } from '~/types/user-info.interface'
import {
  CONFIRMATION_MODAL_CONFIG,
  MOBILE_MENU_MODAL_CONFIG,
} from '~/constants/modals-config'

@Component({
  components: {
    HeaderLogo,
    HeaderNav,
    HeaderAuthBlock,
  },
})
export default class ComponentManagersHeader extends Vue {
  @Action('auth/logout')
  public logout!: () => void

  @Getter('header/isShowProductsCategories')
  public isOpenMenu!: boolean

  @Getter('menu/headerMenu')
  public headerMenu!: IMenuItem

  @Getter('menu/headerSocials')
  public headerSocials!: IMenuItem

  @Getter('auth/isAuthorized')
  public isAuthorized!: boolean

  @Getter('user-info/userInfo')
  public userInfo!: IUserInfo;

  public $modal: any
  public localePath: any

  public openMenu(): void {
    this.$modal.show(
      MobileMenuModal,
      { navItems: this.headerMenu, socialItems: this.headerSocials },
      MOBILE_MENU_MODAL_CONFIG
    )
  }

  public openConfirmLogoutModal(): void {
    const props: IModalConfirmationProps = {
      message: this.$t('managers_header.logout_message').toString(),
      actionButtonTitle: this.$t('common.buttons.exit').toString(),
    }

    this.$modal.show(ModalConfirmation, props, CONFIRMATION_MODAL_CONFIG, {
      'before-close': this.handleLogout,
    })
  }

  public handleLogout(modalObject: any): void {
    const { params } = modalObject
    if (params?.confirm) {
      this.logout();
      this.$router.push(this.localePath({ name: 'index' }))
    }
  }

  public goToLogin(): void {
    this.$router.push(this.localePath({ name: 'login' }))
  }
}
</script>

<style lang="scss" scoped>
.managers-header {
  position: fixed;
  width: 100%;
  transition: 200ms;
  z-index: 101;

  &__button {
    display: flex;
    align-items: center;
    color: $color-golden;
  }

  &__wrapper {
    padding: 4px 28px;
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

  &__navigation {
    display: none;
  }

  &__link {
    color: $color-white;
  }

  &__auth {
    display: flex;
    gap: 45px;
  }
}

@include media-lg {
  .managers-header {
    position: fixed;

    &__button {
      display: none;
    }

    &__wrapper {
      padding: 0px 120px;
    }

    &__container {
      height: $header-height-desktop-min;
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;
      transition: height 200ms ease-out;
    }

    &__block {
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      margin-left: 72px;
    }

    &__navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__auth {
      display: none;
    }
  }
}
</style>
