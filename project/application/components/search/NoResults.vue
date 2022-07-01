<template>
  <div v-if="searchStr.length > 2" class="no-results">
    <p
      class="no-results__title h5"
      v-html="$sanitize($t('search.no_result'))"
    />
    <p
      class="no-results__subtitle subtitle"
      v-html="$sanitize($t('search.no_result_text', { n: searchStr }))"
    />
    <p
      class="no-results__list-title subtitle subtitle--bold"
      v-html="$sanitize($t('search.no_result_propose_title'))"
    />
    <ul class="no-results__list">
      <li
        class="no-results__list-item body-text1"
        v-html="$sanitize($t('search.no_result_propose_1'))"
      />
      <li
        class="no-results__list-item body-text1"
        v-html="$sanitize($t('search.no_result_propose_2'))"
      />
      <li
        class="no-results__list-item body-text1"
        v-html="$sanitize($t('search.no_result_propose_3'))"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentNoResult extends Vue {
  @Prop({ default: '' })
  public searchStr!: string
}
</script>

<style lang="scss" scoped>
.no-results {
  &__subtitle {
    margin: 32px 0;
  }

  &__list {
    margin-top: 16px;
  }

  &__list-item {
    position: relative;
    padding: 8px;
    padding-left: 56px;

    &::before {
      content: ' ';
      display: block;
      width: 24px;
      height: 24px;
      background: url('assets/images/svg/leaf-gold.svg');
      background-repeat: no-repeat;
      position: absolute;
      left: 19px;
      top: 8px;
    }
  }
}
</style>
