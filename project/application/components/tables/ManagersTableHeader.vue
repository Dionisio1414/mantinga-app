<template>
  <div class="table-header">
    <div class="table-header__item">
      <input
        id="checkbox-toggle-all"
        v-model="internalSelectedAll"
        class="form-checkbox"
        type="checkbox"
        @change="handleChange"
      />
      <label for="checkbox-toggle-all"></label>
    </div>
    <div class="table-header__item text-center body-text2 body-text2--bold">
      #
    </div>
    <div
      class="table-header__item text-center body-text2 body-text2--bold"
      v-html="$sanitize($t('page_manager_products.photo'))"
    />
    <div class="table-header__item"></div>
    <div
      class="table-header__item body-text2 body-text2--bold"
      v-html="$sanitize($t('page_manager_products.name'))"
    />
    <div
      class="table-header__item body-text2 body-text2--bold"
      v-html="$sanitize($t('page_manager_products.category'))"
    />
    <div
      class="table-header__item body-text2 body-text2--bold"
      v-html="$sanitize($t('page_manager_products.presentation'))"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'

@Component({})
export default class ManagersTableHeader extends Vue {
  public internalSelectedAll: boolean = false

  @Prop({ default: false })
  public isSelectedAll!: boolean

  @Watch('isSelectedAll', { immediate: true })
  public handleStoreSelected(value: boolean): void {
    this.internalSelectedAll = value
  }

  public handleChange(value: any): void {
    this.$emit('toggleAll', value.target.checked)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/typography.scss';

.table-header {
  display: grid;
  grid-template-columns: 24px 48px 104px 4px 200px 128px auto;
  gap: 16px;
  padding: 6px 32px 15px 16px;

  &__item {
    &:last-child {
      text-align: right;
    }
  }
}

@include media-lg {
  .table-header {
    grid-template-columns: 40px 100px 128px 4px 400px 200px auto;

    &__item {
      @include subtitle-bold;
    }
  }
}
</style>
