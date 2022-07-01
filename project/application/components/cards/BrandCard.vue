<template>
  <div class="brand-card">
    <img class="brand-card__img" :src="src" />
    <button class="brand-card__button">
      <svg-icon name="arrow-right" width="24" height="24" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentBrandCard extends Vue {
  @Prop()
  public src!: string;
}
</script>

<style lang="scss" scoped>
.brand-card {
  &__button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: $color-golden;
    opacity: 0;
  }
}

@include media-lg {
  .brand-card {
    position: relative;
    border-radius: 8px;
    transition: box-shadow 200ms;
    cursor: pointer;

    &:hover {
      box-shadow: $shadow-100;

      .brand-card__button {
        opacity: 1;
      }
    }
  }
}
</style>
