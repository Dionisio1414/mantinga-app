<template>
  <div class="presentation-buttons">
    <NuxtLink :to="localePath({name: 'manager-products'})" class="btn btn--white-with-border">
      <span
        class="
          btn-title
          presentation-buttons__button-title
          presentation-buttons__button-title--mobile
        "
        v-html="$sanitize($t('page_presentation.back_mobile'))"
      />
      <span
        class="
          btn-title
          presentation-buttons__button-title
          presentation-buttons__button-title--desktop
        "
        v-html="$sanitize($t('page_presentation.back_desktop'))"
      />
    </NuxtLink>
    <button class="btn btn--secondary" type="button" @click="generatePdf">
      <svg-icon name="auto-fix" width="24" height="24" />
      <span
        class="
          btn-title
          presentation-buttons__button-title
          presentation-buttons__button-title--mobile
        "
        v-html="$sanitize($t('page_presentation.generate_mobile'))"
      />
      <span
        class="
          btn-title
          presentation-buttons__button-title
          presentation-buttons__button-title--desktop
        "
        v-html="$sanitize($t('page_presentation.generate_desktop'))"
      />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class ComponentPresentationButtons extends Vue {
  public back(): void {
    this.$emit('back')
  }

  public generatePdf(): void {
    this.$emit('generatePdf')
  }
}
</script>

<style lang="scss" scoped>
.presentation-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;

  &__button-title {
    &--mobile {
      display: block;
    }

    &--desktop {
      display: none;
    }
  }
}

@include media-lg {
  .presentation-buttons {
    &__button-title {
      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
