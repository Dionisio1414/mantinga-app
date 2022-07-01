<template>
  <div class="mobile-menu-nav">
    <NavItem
      v-for="link in links"
      :key="link.id"
      :item="link"
      class="mobile-menu-nav__link"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import NavItem from '~/components/common/NavItem.vue'

import { IMenuEntity, IMenuItem } from '~/types/menu.interface'

@Component({
  components: {
    NavItem,
  },
})
export default class ComponentMobileMenuNav extends Vue {
  @Prop()
  public navItems!: IMenuItem;

  public get links(): IMenuEntity[] {
    return this.navItems?.items || []
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu-nav {
  display: flex;
  flex-direction: column;
  margin-top: 23px;

  &__item {
    color: $color-primary-light;
  }

  &__link {
    color: $color-primary-light;
    text-decoration: none;
    padding: 12px 56px;
  }
}
</style>
