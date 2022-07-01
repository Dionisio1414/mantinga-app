<template>
  <div class="footer-links">
    <h2 class="footer-links__title tab-title" v-html="category" />
    <div class="footer-links__grid">
      <NavItem
        v-for="link in links"
        :key="link.id"
        :item="link"
        class="footer-links__link body-text1"
      />
    </div>
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
export default class ComponentFooterLinks extends Vue {
  @Prop()
  public category!: string

  @Prop()
  public navItems!: IMenuItem

  public get links(): IMenuEntity[] {
    return this.navItems?.items || []
  }
}
</script>

<style lang="scss" scoped>
.footer-links {
  padding-top: 48px;
  width: 100%;
  padding: 48px 16px 0 16px;

  &__title {
    color: $color-golden;
    margin-bottom: 24px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 24px;
    column-gap: 36px;
  }

  &__link {
    color: $color-white;
  }
}

@include media-lg {
  .footer-links {
    padding: 48px 16px 0 6px;

    &__grid {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: 170px;
      column-gap: 0;
    }

    &__link {
      max-width: 165px;
    }
  }
}
</style>
