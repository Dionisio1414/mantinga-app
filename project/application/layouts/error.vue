<template>
  <div class="error-page">
    <div class="error-page__container page__wrapper">
      <div class="page__container">
        <ErrorNotFound v-if="notFoundError" />
        <ErrorDefault v-else :error="error" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import ErrorNotFound from '~/components/other/ErrorNotFound.vue'
import ErrorDefault from '~/components/other/ErrorDefault.vue'

@Component({
  components: {
    ErrorNotFound,
    ErrorDefault,
  },
})
export default class LayoutError extends Vue {
  @Prop()
  public error?: any

  public get notFoundError(): boolean {
    if (!this.error) {
      return false
    }

    return this.error.statusCode === 404
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  background-color: $color-primary-regular;
  height: 100% !important;

  &__container {
    padding-top: 128px;
  }
}
</style>
