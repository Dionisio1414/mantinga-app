<template>
  <div class="mobile-menu-footer">
    <SocialLinkItem
      v-for="link in links"
      :key="link.id"
      :item="link"
      class="mobile-menu-footer__icon-container"
    />
    <div
      class="
        mobile-menu-footer__icon-container
        mobile-menu-footer__icon-container--transparent
      "
    >
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import SocialLinkItem from '~/components/common/SocialLinkItem.vue'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import { IMenuEntity, IMenuItem } from '~/types/menu.interface'

@Component({
  components: {
    LanguageSwitcher,
    SocialLinkItem,
  },
})
export default class ComponentMobileMenuFooter extends Vue {
  @Prop()
  public socialItems!: IMenuItem

  public get links(): IMenuEntity[] {
    return this.socialItems?.items || []
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu-footer {
  display: flex;
  justify-content: space-between;
  margin: 24px 48px 66px 48px;

  &__icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    background-color: rgba(57, 71, 79, 0.05);
    border-radius: 50%;
    padding: 8px;

    &--transparent {
      background-color: transparent;
    }
  }
}
</style>
