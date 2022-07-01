<template>
  <NuxtLink :to="linkTo" class="search-result-card">
    <div
      class="search-result-card__img-container"
      :class="{
        'search-result-card__img-container--news': cardType === 'ARTICLE',
        'search-result-card__img-container--recipe': cardType === 'RECIPE',
      }"
    >
      <template v-if="cardType === 'PRODUCT'">
        <img class="search-result-card__img" :src="result.image" />
      </template>

      <template v-if="cardType === 'ARTICLE'">
        <svg-icon name="newspaper" width="24" height="24" />
      </template>

      <template v-if="cardType === 'RECIPE'">
        <svg-icon name="chef-hat" width="24" height="24" />
      </template>
    </div>
    <div
      class="search-result-card__info subtitle"
      v-html="$sanitize(resultName)"
    />
    <div class="search-result-card__btn-container">
      <button class="search-result-card__btn">
        <svg-icon name="arrow-right" width="24" height="24" />
      </button>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { ESearchResults } from '~/constants/search-results'

@Component({})
export default class ComponentSearchResultCard extends Vue {
  @Prop() public result!: any

  @Prop() public cardType!: string

  @Prop({ default: '' }) public searchString!: string

  public localePath: any

  public get resultName(): string {
    const strRegExp = new RegExp(this.searchString, 'g')
    const name = this.result.name

    return name.replace(strRegExp, `<b>${this.searchString}</b>`)
  }

  public get linkTo(): string {
    switch (this.cardType) {
      case ESearchResults.PRODUCT:
        return this.localePath({
          name: 'p-slug',
          params: { slug: this.result.slug },
        })
      case ESearchResults.ARTICLE:
        return this.localePath({
          name: 'news-id',
          params: { id: this.result.id },
        })
      case ESearchResults.RECIPE:
        return this.localePath({
          name: 'recipes-id',
          params: { id: this.result.id },
        })
      default:
        return '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result-card {
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 33px;
  }

  &__img-container {
    width: 64px;
    height: 64px;
    background-color: $color-white;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 16px;
    flex-shrink: 0;
    color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;

    &--news {
      background-color: $color-primary-light;
      width: 48px;
      height: 48px;
    }

    &--recipe {
      background-color: $color-golden;
      width: 48px;
      height: 48px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__info {
    margin-right: 16px;
  }

  &__btn-container {
    display: none;
  }

  &__btn {
    display: flex;
    align-items: center;
    color: $color-golden;
    display: none;
  }
}

@include media-lg {
  .search-result-card {
    grid-template-columns: auto 1fr 24px;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    &:hover {
      background-color: rgba(210, 180, 103, 0.04);

      .search-result-card__btn {
        display: flex;
      }
    }

    &__btn-container {
      display: block;
      margin-left: auto;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
