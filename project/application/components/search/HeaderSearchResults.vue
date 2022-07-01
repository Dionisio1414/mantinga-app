<template>
  <div
    class="header-search-results"
    :style="{ height: `calc(100vh - ${headerHeight}px)` }"
    @click.self="closeWindow"
  >
    <div class="header-search-results__body">
      <div v-if="isLoading" class="header-search-results__preloader-container">
        <Preloader />
      </div>
      <template v-if="!isEmpty">
        <div
          class="header-search-results__grid"
          :class="{
            'header-search-results__grid--no-products':
              !productsResults.length ||
              (!newsResults.length && !recipeResults.length),
          }"
        >
          <SearchResultBlock
            v-if="productsResults.length"
            class="header-search-results__block"
            result-type="PRODUCT"
            :results="productsResults"
            :search-string="searchStr"
          />

          <div
            class="header-search-results__subgrid"
            :class="{
              'header-search-results__subgrid--horizontal':
                !productsResults.length,
              'header-search-results__subgrid--100w':
                !newsResults.length || !recipeResults.length,
            }"
          >
            <SearchResultBlock
              v-if="newsResults.length"
              class="header-search-results__block"
              result-type="ARTICLE"
              :results="newsResults"
              :search-string="searchStr"
            />

            <SearchResultBlock
              v-if="recipeResults.length"
              class="header-search-results__block"
              result-type="RECIPE"
              :results="recipeResults"
              :search-string="searchStr"
            />
          </div>

          <div v-if="isShowDivider" class="header-search-results__divider" />
        </div>
      </template>
      <template v-else>
        <NoResults :search-str="searchStr" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import SearchResultCard from '~/components/search/SearchResultCard.vue'
import SearchResultViewAllButton from '~/components/search/SearchResultViewAllButton.vue'
import SearchResultBlock from '~/components/search/SearchResultBlock.vue'
import NoResults from '~/components/search/NoResults.vue'
import Preloader from '~/components/common/Preloader.vue'

import { ISearchResultForLayout } from '~/types/search.interface'
import { IDictionary } from '~/types/dictionary.interface'

@Component({
  components: {
    SearchResultCard,
    SearchResultViewAllButton,
    SearchResultBlock,
    NoResults,
    Preloader,
  },
})
export default class ComponentHeaderSearchResults extends Vue {
  @Prop()
  public headerHeight!: number

  @Prop()
  public searchResult!: IDictionary<ISearchResultForLayout[]>

  @Prop()
  public searchStr!: string

  @Prop()
  public isLoading!: boolean

  public get locale(): string {
    return this.$i18n.locale
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
    return (
      !this.productsResults.length &&
      !this.newsResults.length &&
      !this.recipeResults.length &&
      !this.isLoading
    )
  }

  public get isShowDivider(): boolean {
    return (
      !!(this.productsResults.length && this.recipeResults.length) ||
      !!(this.productsResults.length && this.newsResults.length) ||
      !!(this.recipeResults.length && this.newsResults.length)
    )
  }

  public closeWindow(): void {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.header-search-results {
  width: 100%;
  position: absolute;
  top: 100%;
  right: 0;
  overflow: auto;

  &__body {
    position: relative;
    background-color: $color-white;
    padding: 56px 48px 48px 48px;
    width: 100%;
    border-radius: 0 0 8px 8px;
    margin: 0 auto;
    box-shadow: 0px 6px 12px 2px rgba(57, 71, 79, 0.1),
      0px 8px 24px -4px rgba(57, 71, 79, 0.08);
    max-height: 712px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-height: 712px;
    width: 100%;
    row-gap: 40px;
    column-gap: 80px;

    &--no-products {
      grid-template-columns: 100%;
    }
  }

  &__subgrid {
    display: grid;
    gap: 40px;

    &--horizontal {
      grid-template-columns: 1fr 1fr;
    }

    &--100w {
      grid-template-columns: 100%;
    }
  }

  &__block {
    width: 100%;
  }

  &__divider {
    position: absolute;
    top: 56px;
    left: 50%;
    background-color: rgba(57, 71, 79, 0.25);
    height: calc(100% - 104px);
    width: 100%;
    max-width: 2px;
  }

  &__preloader-container {
    margin: 30px auto;
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 1460px) {
  .header-search-results {
    &__block {
      width: auto;
    }
  }
}

@media (max-width: 1170px) {
  .header-search-results {
    &__body {
      max-height: max-content;
    }

    &__grid {
      grid-template-columns: 100%;
      max-height: 100%;
    }

    &__divider {
      display: none;
    }
  }
}
</style>
