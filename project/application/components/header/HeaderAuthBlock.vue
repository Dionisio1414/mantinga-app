<template>
  <div class="header-auth">
    <template v-if="isAuthorized">
      <NuxtLink
        :to="localePath({ name: 'manager-products' })"
        class="header-auth__btn"
      >
        <svg-icon
          class="header-auth__icon"
          name="home"
          width="24"
          height="24"
        />
        <span class="header-auth__user-name body-text1">{{ userFormattedName }}</span>
        <span class="header-auth__user-name--mobile body-text1 body-text1--bold"> {{ userFormattedNameMobile }}</span>
      </NuxtLink>
      <button class="header-auth__btn" @click="logout">
        <svg-icon
          class="header-auth__icon"
          name="logout"
          width="24"
          height="24"
        />
        <span
          class="header-auth__btn-title body-text1 body-text1--bold"
          v-html="$sanitize($t('common.buttons.logout'))"
        />
      </button>
    </template>
    <template v-else>
      <NuxtLink to="/login" class="header-auth__btn">
        <svg-icon
          class="header-auth__icon"
          name="login"
          width="24"
          height="24"
        />
        <span class="body-text1 body-text1--bold" v-html="$sanitize($t('common.buttons.login'))" />
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IUserInfo } from '~/types/user-info.interface'

@Component({})
export default class ComponentHeaderAuthBlock extends Vue {
  @Prop({ default: false })
  public isAuthorized!: boolean

  @Prop()
  public userInfo!: IUserInfo

  public get userFormattedName(): string {
    if (this.userInfo?.firstName && this.userInfo?.lastName) {
      return `${this.userInfo.firstName} ${this.userInfo.lastName.charAt(0)}.`
    } else if (this.userInfo?.firstName && !this.userInfo?.lastName) {
      return this.userInfo.firstName
    } else {
      return this.userInfo?.email || ''
    }
  }

  public get userFormattedNameMobile(): string {
    if (this.userInfo?.firstName && this.userInfo?.lastName) {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    } else if (this.userInfo?.firstName && !this.userInfo?.lastName) {
      return this.userInfo.firstName
    } else {
      return this.userInfo?.email || ''
    }
  }

  public logout(): void {
    this.$emit('logout')
  }

  public goToLogin(): void {
    this.$emit('login')
  }
}
</script>

<style lang="scss" scoped>
.header-auth {
  display: flex;
  flex-direction: column;
  margin: 0px 0 24px 0;

  &__btn {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: $color-primary-dark;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.5px;
    gap: 16px;
  }

  &__user-name {
    white-space: nowrap;
    display: none;

    &--mobile {
      display: inline;
    }
  }
}

@include media-lg {
  .header-auth {
    flex-direction: row;
    margin: 0;

    &__btn {
      color: $color-white;
      gap: 10px;

      &:last-child {
        padding-right: 0;
      }
    }

    &__btn-title {
      display: none;
    }

    &__user-name {
      display: inline;

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
