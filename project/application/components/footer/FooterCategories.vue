<template>
  <div class="footer-categories">
    <h2 class="footer-categories__title tab-title" v-html="title" />
    <div class="footer-categories__grid">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="localePath({name: 'c-slug', params: {slug: category.slug}})"
        class="footer-categories__link body-text1"
        v-html="$sanitize(category.name)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { ITaxon } from '~/types/taxons'

@Component({})
export default class ComponentFooterCategories extends Vue {
  @Prop()
  public title!: string

  @Prop({ default: [] })
  public categories!: ITaxon[]
}
</script>

<style lang="scss" scoped>
.footer-categories {
  padding-top: 48px;
  width: 100%;
  padding: 48px 16px 0 16px;

  &__title {
    color: $color-golden;
    margin-bottom: 24px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 24px;
    column-gap: 36px;
  }

  &__link {
    color: $color-white;
  }
}

@include media-lg {
  .footer-categories {
    padding: 48px 16px 0 6px;

    &__grid {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: 170px;
      column-gap: 0;
    }

    &__link {
      max-width: 165px;
    }
  }
}
</style>
