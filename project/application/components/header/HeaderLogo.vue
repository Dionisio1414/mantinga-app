<template>
  <NuxtLink class="header-logo" :to="localePath({ name: 'index' })">
    <svg-icon
      class="header-logo__icon"
      :class="{ 'header-logo__icon--minimized': isMinimized }"
      name="mantinga_logo"
    />
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentHeaderLogo extends Vue {
  @Prop()
  public isMinimized!: boolean
}
</script>

<style lang="scss" scoped>
.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;

  &__icon {
    height: 42px;
    width: 68px;
  }
}

@include media-lg {
  .header-logo {
    &__icon {
      height: 72px;
      width: 116px;
      transition: height, width 200ms;

      &--minimized {
        height: 48px;
        width: 92px;
      }
    }
  }
}
</style>
