<template>
  <div class="mobile-back-button">
    <NuxtLink
      :to="link"
      class="mobile-back-button__link"
    >
      <svg-icon name="chevron-left" width="24" height="24" />
      <span
        class="body-text1 body-text1--bold"
        v-html="$sanitize($t('common.buttons.back'))"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentMobileBackButton extends Vue {
    @Prop({default: 'index'})
    public link!: string;
    

}
</script>

<style lang="scss" scoped>
.mobile-back-button {
  margin-top: 12px;
  margin-left: 16px;

  &__link {
    padding: 12px 8px;
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 8px;
  }
}

@include media-lg {
    .mobile-back-button {
        display: none;
    }
}
</style>
