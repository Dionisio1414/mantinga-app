<template>
  <div class="product-categories-mobile">
    <MobileMenuCategory
      v-for="(category, i) in categories"
      :key="i"
      :category="category"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import MobileMenuCategory from '~/components/header/mobile/MobileMenuCategory.vue'
import { ITaxon } from '~/types/taxons'

@Component({
  components: {
    MobileMenuCategory,
  },
})
export default class ComponentProductCategoriesMobile extends Vue {
  @Prop({ default: () => []})
  public categories!: ITaxon[];
}
</script>
