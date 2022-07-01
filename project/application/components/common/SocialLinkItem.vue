<template>
  <a
    v-if="linkType === 'url'"
    :href="linkUrl"
    :target="openInNewTab ? '_blank' : '_self'"
  >
    <img class="social-link-item__img" :src="image.path" :alt="image.title" />
  </a>
  <NuxtLink v-else class="nav-item__link body-text1" :to="linkForPage">
    <img class="social-link-item__img" :src="image.path" :alt="image.title" />
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import { IMenuEntity, IMenuLink, IMenuLinkImage } from '~/types/menu.interface'
import { PAGES } from '~/constants/pages'

@Component({
  components: {
    LanguageSwitcher,
  },
})
export default class ComponentSocialLinkItem extends Vue {
  @Prop()
  public item!: IMenuEntity

  public get linkForPage(): string {
    const slug = this.item?.page?.translations[this.locale]?.slug || ''
    if (slug === PAGES.HOMEPAGE) return '/'
    else return `/${slug}`
  }

  public $i18n: any

  public get locale(): string {
    return this.$i18n.locale
  }

  public get link(): IMenuLink {
    return this.item?.translations[this.locale] || {}
  }

  public get image(): IMenuLinkImage {
    return this.item?.images[0] || {}
  }

  public get linkType(): string {
    return this.item?.type || ''
  }

  public get linkUrl(): string {
    return this.link?.url || ''
  }

  public get openInNewTab(): boolean {
    return this.item?.openInNewTab || false
  }

  public get linkTitle(): string {
    return this.link?.title || ''
  }
}
</script>

<style lang="scss" scoped>
.social-link-item {
  &__img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
