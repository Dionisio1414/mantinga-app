<template>
  <div
    class="mobile-search-window"
    :class="{ 'mobile-search-window--no-bg': !isEmpty }"
  >
    <FormSearchInput
      ref="searchInput"
      v-model="searchStr"
      :is-show-close-button="true"
      @clean="closeWindow"
    />

    <div class="mobile-search-window__body">
      <div v-if="isLoading" class="mobile-search-window__preloader-container">
        <Preloader />
      </div>
      <template v-if="!isEmpty && !isLoading">
        <SearchResultBlock
          v-if="productsResults.length"
          class="mobile-search-window__block"
          result-type="PRODUCT"
          :results="productsResults"
          :search-string="searchStr"
        />
        <SearchResultBlock
          v-if="newsResults.length"
          class="mobile-search-window__block"
          result-type="ARTICLE"
          :results="newsResults"
          :search-string="searchStr"
        />
        <SearchResultBlock
          v-if="recipeResults.length"
          class="mobile-search-window__block"
          result-type="RECIPE"
          :results="recipeResults"
          :search-string="searchStr"
        />
      </template>
      <template v-if="isNoResults">
        <NoResults :search-str="searchStr" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  mixins,
  Watch,
} from 'nuxt-property-decorator'
import SearchResultCard from '~/components/search/SearchResultCard.vue'
import SearchResultViewAllButton from '~/components/search/SearchResultViewAllButton.vue'
import SearchResultBlock from '~/components/search/SearchResultBlock.vue'
import NoResults from '~/components/search/NoResults.vue'
import Preloader from '~/components/common/Preloader.vue'

import { FormSearchInput } from '~/components/inputs'
import { ISearchResultForLayout } from '~/types/search.interface'
import { IDictionary } from '~/types/dictionary.interface'
import MixinModal from '~/mixins/modalMixin'
import { EStatus } from '~/constants/status'

@Component({
  components: {
    FormSearchInput,
    SearchResultCard,
    SearchResultViewAllButton,
    SearchResultBlock,
    NoResults,
    Preloader,
  },
})
export default class ComponentMobileSearchWindow extends mixins(MixinModal) {
  @Getter('search/searchStr')
  public searchStrStore!: string

  @Getter('search/resultForLayout')
  public searchResult!: IDictionary<ISearchResultForLayout[]>

  @Getter('search/status')
  public status!: EStatus

  @Action('search/updateSearchStr')
  public updateSearchStr!: (str: string) => void

  @Action('search/search')
  public search!: (s: string) => Promise<void>
  
  @Watch('searchStr')
  public async handleSearch(): Promise<void> {
    if (this.searchStr && this.searchStr.length > 2) {
      await this.search(this.searchStr)
    } 
  }

  public get searchStr(): string {
    return this.searchStrStore
  }

  public set searchStr(value: string) {
    this.updateSearchStr(value)
  }

  public get isShowResults(): boolean {
    return !!this.searchStr && this.searchStr.length > 2
  }

  public get productsResults(): ISearchResultForLayout[] {
    return this.searchResult?.products || []
  }

  public get newsResults(): ISearchResultForLayout[] {
    return this.searchResult?.articles || []
  }

  public get recipeResults(): ISearchResultForLayout[] {
    return this.searchResult?.recipes || []
  }

  public get isEmpty(): boolean {
    return this.searchStr.length < 3;
  }

  public get isNoResults(): boolean {
    return !this.productsResults.length &&
      !this.newsResults.length &&
      !this.recipeResults.length &&
      this.searchStr.length > 2
  }

  public get isLoading(): boolean {
    return this.status === EStatus.PROCESSING
  }

  public closeWindow(): void {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.mobile-search-window {
  padding: 16px;
  background-color: $color-white;
  background-image: url('../../assets/images/leaf_group.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  min-height: 100vh;

  &--no-bg {
    background: $color-white;
  }

  &__body {
    margin-top: 32px;
  }

  &__category {
    margin-bottom: 56px;
  }

  &__category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0 40px 0;
  }

  &__block {
    margin-bottom: 64px;
  }

  &__preloader-container {
    width: 100%;
    margin: 30px auto;
    display: flex;
    justify-content: center;
  }
}
</style>
