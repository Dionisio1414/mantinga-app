<template>
  <div class="result-block">
    <div class="result-block__header">
      <h2 class="result-block__heading h6">{{ title }}</h2>
      <SearchResultViewAllButton :card-type="resultType" />
    </div>

    <SearchResultCard
      v-for="(result, i) in results"
      :key="i"
      :result="result"
      :card-type="resultType"
      :search-string="searchString"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import SearchResultCard from '~/components/search/SearchResultCard.vue'
import SearchResultViewAllButton from '~/components/search/SearchResultViewAllButton.vue'
import { ESearchResults } from '~/constants/search-results'

@Component({
  components: {
    SearchResultCard,
    SearchResultViewAllButton,
  },
})
export default class ComponentSearchResultBlock extends Vue {
  @Prop()
  public results!: any

  @Prop()
  public resultType!: ESearchResults

  @Prop({ default: '' })
  public searchString!: string

  public get title(): string {
    switch (this.resultType) {
      case ESearchResults.PRODUCT:
        return this.$t('Produktai').toString()
      case ESearchResults.ARTICLE:
        return this.$t('Naujienos').toString()
      case ESearchResults.RECIPE:
        return this.$t('Receptai').toString()
      default:
        return '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.result-block {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__heading {
    color: $color-primary-regular;
  }
}
</style>
