<template>
  <a
    v-if="linkType === 'url'"
    class="nav-item__link body-text1"
    :href="linkUrl"
    :target="openInNewTab ? '_blank' : '_self'"
  >
    {{ linkTitle }}</a
  >
  <NuxtLink
    v-else
    class="nav-item__link body-text1"
    :to="localePath(linkForPage)"
  >
    {{ linkTitle }}
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import { IMenuEntity, IMenuLink } from '~/types/menu.interface'
import { PAGES } from '~/constants/pages'

@Component({
  components: {
    LanguageSwitcher,
  },
})
export default class ComponentNavItem extends Vue {
  @Prop()
  public item!: IMenuEntity

  public get linkForPage(): { path: string } {
    const slug = this.item?.page?.translations[this.locale]?.slug || ''

    if (slug === PAGES.HOMEPAGE) return { path: '/' }
    else return { path: `/${slug}` }
  }

  public $i18n: any

  public get locale(): string {
    return this.$i18n.locale
  }

  public get link(): IMenuLink {
    return this.item?.translations[this.locale] || {}
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
