<template>
  <div class="page">
    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class PageNews extends Vue {}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  font-weight: bold;
  flex-direction: column;
  font-size: 18px;
  min-height: 100vh;

  &__wrapper {
    padding: 56px 16px;
  }
}

@include media-lg {
  .page {
    &__wrapper {
      padding: 80px 120px;
    }

    &__container {
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>
