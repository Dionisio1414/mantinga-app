<template>
  <div class="career-info-block">
    <div class="career-info-block__icon">
      <svg-icon name="leafs" width="56" height="40" />
    </div>
    <h5
      class="career-info-block__heading h5"
      v-html="$sanitize($t('career_page.info_block_title'))"
    />
    <p
      class="career-info-block__text subtitle"
      v-html="$sanitize($t('career_page.info_block_text'))"
    />
    <NuxtLink :to="localePath({name: 'career-offer'})" class="career-info-block__btn btn btn--golden">
      <span
        class="btn-title"
        v-html="$sanitize($t('career_page.info_block_btn'))"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class ComponentCareerInfoBlock extends Vue {}
</script>

<style lang="scss" scoped>
.career-info-block {
  background-color: $color-primary-regular;
  border-radius: 8px;
  padding: 32px 24px;
  color: $color-white;
  max-width: 592px;
  margin: 0 auto;

  &__icon {
    margin-left: auto;
    width: max-content;
  }

  &__heading {
    margin: 32px 0;
  }

  &__text {
    margin-bottom: 32px;
  }

  &__btn {
    display: table;
    margin: 0 auto;
  }
}

@include media-lg {
  .career-info-block {
    padding: 64px;

    &__btn {
      margin: 0 0 0 auto;
    }
  }
}
</style>
