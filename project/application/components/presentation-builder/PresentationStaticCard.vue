<template>
  <div class="presentation-static-card">
    <svg-icon
      class="presentation-static-card__icon"
      name="mantinga-logo-black"
    />
    <p class="presentation-static-card__title h5" v-html="$sanitize(title)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentPresentationStaticCard extends Vue {
  @Prop({ default: '' })
  public title!: string
}
</script>

<style lang="scss" scoped>
.presentation-static-card {
  padding: 30px 25px;
  background-color: $color-primary-100;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  &__icon {
    height: 38px;
    width: 62px;
  }

  &__title {
    margin-left: 24px;
    @include subtitle;
    font-weight: 700;
  }
}

@include media-lg {
  .presentation-static-card {
    padding: 30px 48px;
    &:not(:last-child) {
      margin-bottom: 32px;
    }

    &__icon {
      width: 93px;
      height: 54px;
    }

    &__title {
      margin-left: 48px;

      @include h5;
    }
  }
}
</style>
