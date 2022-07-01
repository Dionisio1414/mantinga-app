<template>
  <div class="footer-social-links">
    <h2
      class="footer-social-links__title tab-title"
      v-html="$sanitize('Siekite mus')"
    />
    <div class="footer-social-links__grid">
      <SocialLinkItem
        v-for="link in links"
        :key="link.id"
        :item="link"
        class="footer-social-links__link"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import FooterNewsletter from './FooterNewsletter.vue'
import FooterLinks from './FooterLinks.vue'
import SocialLinkItem from '~/components/common/SocialLinkItem.vue'

import { IMenuEntity, IMenuItem } from '~/types/menu.interface'

@Component({
  components: {
    FooterNewsletter,
    FooterLinks,
    SocialLinkItem,
  },
})
export default class ComponentFooterSocialLinks extends Vue {
  @Prop()
  public items!: IMenuItem

  public get links(): IMenuEntity[] {
    return this.items?.items || []
  }
}
</script>

<style lang="scss" scoped>
.footer-social-links {
  padding-top: 48px;
  width: 100%;
  padding: 48px 16px 0 16px;

  &__title {
    color: $color-golden;
    margin-bottom: 24px;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__link {
    background-color: rgba($color-golden-light, 0.2);
    border-radius: 50%;
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    padding: 8px;
  }
}

@include media-lg {
  .footer-social-links {
    padding: 48px 16px 0 6px;
    width: min-content;

    &__grid {
      display: flex;
      flex-wrap: nowrap;
    }

    &__link {
      max-width: 165px;
    }
  }
}
</style>
