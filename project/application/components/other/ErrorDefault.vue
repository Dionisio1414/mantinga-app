<template>
  <div class="error-default">
    <div class="error-default__code h1">{{ errorCode }}</div>
    <div class="error-default__message h5" v-html="$sanitize(errorMessage)" />
    <NuxtLink to="/" class="error-default__link">
      <svg-icon
        class="error-default__icon"
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
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentErrorDefault extends Vue {
  @Prop()
  public error?: any

  public get errorCode(): string {
    return this.error?.statusCode || ''
  }

  public get errorMessage(): string {
    return this.error?.response?.statusText || ''
  }
}
</script>

<style lang="scss" scoped>
.error-default {
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
