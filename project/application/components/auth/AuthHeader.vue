<template>
  <div class="auth-header">
    <svg-icon name="leafs" width="56" height="40" />
    <h5
      class="auth-header__title"
      v-html="$sanitize(title)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentAuthHeader extends Vue {
  @Prop({ default: '' })
  public title!: string
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/typography.scss';
.auth-header {
  text-align: center;
  max-width: 384px;
  margin: 0 auto;

  &__title {
    margin-top: 8px;
    @include h5;
  }
}

@include media-lg {
  .auth-header {
    &__title {
      @include h4;
    }
  }
}
</style>
