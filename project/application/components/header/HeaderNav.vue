<template>
  <div class="header-nav">
    <div class="header-nav__list">
      <NavItem
        v-for="link in links"
        :key="link.id"
        :item="link"
        class="header-nav__item"
      />
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import NavItem from '~/components/common/NavItem.vue'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'

import { IMenuEntity, IMenuItem } from '~/types/menu.interface'

@Component({
  components: {
    LanguageSwitcher,
    NavItem,
  },
})
export default class ComponentHeaderNav extends Vue {
  @Prop()
  public navItems!: IMenuItem

  @Prop({ default: false })
  public isAuthorized!: boolean

  public get links(): IMenuEntity[] {
    return this.navItems?.items || []
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  align-items: center;

  &__list {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__icon {
    height: 42px;
    width: 68px;
  }

  &__item {
    text-decoration: none;
    color: $color-white;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }

}

@include media-lg {
  .header-nav {
    &__icon {
      height: 72px;
      width: 116px;
    }
  }
}
</style>
