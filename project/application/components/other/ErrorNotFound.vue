<template>
  <div class="error-not-found">
    <div class="error-not-found__code h1">404</div>
    <div
      class="error-not-found__message h5"
      v-html="$sanitize($t('error_page.not_found'))"
    />
    <NuxtLink to="/" class="error-not-found__link">
      <svg-icon
        class="error-not-found__icon"
        name="home"
        width="24"
        height="24"
      />
      <span class="link" v-html="$sanitize($t('error_page.link_to_home'))" />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class ComponentErrorNotFound extends Vue {}
</script>

<style lang="scss" scoped>
.error-not-found {
  &__code {
    color: $color-golden;
    text-align: center;
  }

  &__message {
    color: $color-white;
    text-align: center;
  }

  &__link {
    margin-top: 32px;
    padding: 12px 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
  }

  &__icon {
    margin-right: 8px;
  }
}
</style>
