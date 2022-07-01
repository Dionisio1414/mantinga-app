<template>
  <div class="products-header-block">
    <div v-if="image" class="products-header-block__img-container" >
      <img class="products-header-block__img" :src="image" />
    </div>
    <h2 class="products-header-block__title h4" v-html="$sanitize(title)" />
    <p
      class="body-text1 products-header-block__description"
      v-html="$sanitize(description)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentProductsHeaderBlock extends Vue {
  @Prop({ default: '' })
  public title!: string

  @Prop({ default: '' })
  public description!: string

  @Prop({ default: '' })
  public image!: string

  public $modal: any
}
</script>

<style lang="scss" scoped>
.products-header-block {
  &__title {
    text-align: center;
    color: $color-primary-dark;
  }

  &__description {
    margin-top: 24px;
  }

  &__img-container {
    width: max-content;
    margin: 0 auto 16px auto;
  }

  &__img {
    width: 104px;
  }
}

@include media-lg {
  .products-header-block {
    &__description {
      text-align: center;
    }
  }
}
</style>
