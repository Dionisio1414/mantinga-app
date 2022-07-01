<template>
  <div class="select-product-categories">
    <div class="select-product-categories__buttons">
      <NuxtLink
        v-for="(subcategory, i) in subcategories"
        :key="i"
        class="
          btn btn--transparent-with-border
          select-product-categories__button
        "
        :to="localePath({ name: 'c-slug-subSlug', params: { slug: categorySlug, subSlug: subcategory.slug }})"
      >
        <span class="btn-title" v-html="$sanitize(subcategory.name)" />
      </NuxtLink>
    </div>
    <FormSelect
      class="select-product-categories__select"
      :label="$t('products_category_page.subcategory')"
      :options="subcategories"
      value-label="name"
      @input="handleSelect"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Multiselect from 'vue-multiselect'
import FormSelect from '~/components/inputs/FormSelect.vue'
import { ISubTaxon } from '~/types/taxons'

@Component({
  components: {
    Multiselect,
    FormSelect,
  },
})
export default class ComponentSelectProductCategories extends Vue {
  @Prop({ default: () => [] })
  public subcategories!: ISubTaxon[]

  @Prop({ default: 'category' })
  public categorySlug!: string

  public localePath: any

  public handleSelect(subcategory: ISubTaxon): void {
    this.$router.push(this.localePath({ name: 'c-slug-subSlug', params: { slug: this.categorySlug, subSlug: subcategory.slug }}))
  }
}
</script>

<style lang="scss" scoped>
.select-product-categories {
  &__buttons {
    display: none;
  }

  &__select {
    margin-top: 24px;
  }
}

@include media-lg {
  .select-product-categories {
    &__buttons {
      margin-top: 24px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
      width: 80%;
      margin: 24px auto;
    }

    &__select {
      display: none;
    }
  }
}
</style>
