<template>
  <NuxtLink :to="linkTo" class="search-view-all-button__btn">
    <span class="btn-title" v-html="$sanitize($t('common.buttons.view_all'))" />
    <svg-icon
      class="search-view-all-button__icon"
      name="chevron-right"
      width="24"
      height="24"
    />
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { ESearchResults } from '~/constants/search-results'

@Component({})
export default class ComponentSearchResultViewAllButton extends Vue {
  @Prop()
  public cardType!: ESearchResults
  
  public localePath: any;

  public get linkTo(): string {
    switch (this.cardType) {
      case ESearchResults.PRODUCT:
        return this.localePath({name: 'с'})
      case ESearchResults.ARTICLE:
        return this.localePath({name: 'news'})
      case ESearchResults.RECIPE:
        return this.localePath({name: 'recipes'})
      default:
        return '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.search-view-all-button {
  &__btn {
    display: flex;
    align-items: center;
    color: $color-primary-regular;
  }

  &__icon {
    margin-left: 8px;
  }
}

@include media-lg {
  .search-view-all-button {
    &__btn {
      margin-left: auto;
    }
  }
}
</style>
