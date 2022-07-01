<template>
  <div v-click-outside="closeResults" class="header-search" to="/">
    <div class="header-search--mobile">
      <button class="header-search__button" @click="showMobileSearch">
        <svg-icon
          class="header-search__icon"
          name="search"
          width="24"
          height="24"
        />
      </button>
    </div>

    <div class="header-search--desktop">
      <button
        v-if="isMinimized && !isActiveSearch"
        class="header-search__button btn btn--golden"
        @click="showInput"
      >
        <svg-icon
          class="header-search__icon"
          name="search"
          width="24"
          height="24"
        />
      </button>
      <FormSearchInput
        v-else
        ref="searchInput"
        v-model="searchStr"
        :classes="['header-search--input']"
        :placeholder="$sanitize($t('header.search'))"
        @focus="openResults"
        @clean="cleanInput"
      />
      <HeaderSearchResults
        v-if="isShowResults"
        :search-result="searchResult"
        :header-height="headerHeight"
        :is-minimized="isMinimized"
        :search-str="searchStr"
        :is-loading="isLoading"
        @close="closeResults"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Prop, Watch } from 'nuxt-property-decorator'
import MobileSearchWindow from '~/components/search/MobileSearchWindow.vue'
import HeaderSearchResults from '~/components/search/HeaderSearchResults.vue'

import { FormSearchInput } from '~/components/inputs'
import { ISearchResultForLayout } from '~/types/search.interface'
import { IDictionary } from '~/types/dictionary.interface'
import { MOBILE_MENU_MODAL_CONFIG } from '~/constants/modals-config'
import { EStatus } from '~/constants/status'

@Component({
  components: {
    FormSearchInput,
    HeaderSearchResults,
    MobileSearchWindow,
  },
})
export default class ComponentHeaderSearch extends Vue {
  @Action('search/search')
  public search!: (s: string) => Promise<void>

  @Action('search/updateSearchStr')
  public updateSearchStr!: (str: string) => void

  @Getter('search/resultForLayout')
  public searchResult!: IDictionary<ISearchResultForLayout[]>

  @Getter('search/searchStr')
  public searchStrStore!: string

  @Getter('search/status')
  public status!: EStatus

  public get searchStr(): string {
    return this.searchStrStore
  }

  public set searchStr(value: string) {
    this.updateSearchStr(value)
  }

  public get isLoading(): boolean {
    return this.status === EStatus.PROCESSING
  }

  @Prop()
  public isMinimized!: boolean

  @Prop()
  public headerHeight!: number

  public isActiveSearch: boolean = false
  public isShowResults: boolean = false
  public $modal: any

  @Watch('isMinimized', { immediate: true })
  public handleMinimized(value: boolean): void {
    if (this.isActiveSearch && !this.searchStr && value) {
      this.isActiveSearch = false
    }
  }

  @Watch('searchStr')
  public async handleSearch(): Promise<void> {
    if (this.searchStr && this.searchStr.length > 2) {
      await this.search(this.searchStr)
      this.isShowResults = true
    } else {
      this.isShowResults = false
    }
  }

  @Watch('$route.path')
  public handleRoute(): void {
    this.isShowResults = false
  }

  

  public showInput(): void {
    this.isActiveSearch = true

    this.$nextTick(() => {
      ;(this.$refs.searchInput as HTMLInputElement).focus()
    })
  }

  public cleanInput(): void {
    this.searchStr = ''
  }

  public closeResults(): void {
    this.isShowResults = false
  }

  public openResults(): void {
    if (this.searchStr && this.searchStr.length > 2) this.isShowResults = true
  }

  public showMobileSearch(): void {
    this.$modal.show(MobileSearchWindow, null, MOBILE_MENU_MODAL_CONFIG)
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;

  &--desktop {
    display: none;
  }

  &__button {
    color: $color-golden;
  }

  &__input {
    width: 100%;
  }
}

@include media-lg {
  .header-search {
    width: 100%;

    &--mobile {
      display: none;
    }

    &--desktop {
      display: flex;
      width: 100%;
    }

    &__button {
      color: $color-golden;
      margin-left: auto;
      height: 48px;
      width: 48px;
    }
  }
}
</style>
