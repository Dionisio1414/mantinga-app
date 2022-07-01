<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <NuxtLink
          class="breadcrumbs__link body-text1"
          :to="localePath({ name: 'index' })"
          v-html="$sanitize($t('breadcrumbs.home'))"
        />
        <svg-icon
          class="breadcrumbs__icon"
          name="chevron-right"
          width="24"
          height="24"
        />
      </li>
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.key">
        <div
          v-if="breadcrumb.title"
          class="breadcrumbs__item"
        >
          <template v-if="index < linkLimit">
            <NuxtLink
              class="breadcrumbs__link body-text1"
              :to="breadcrumb.link"
              :title="breadcrumb.title"
            >
              {{ breadcrumb.title }}
            </NuxtLink>
            <svg-icon
              class="breadcrumbs__icon"
              name="chevron-right"
              width="24"
              height="24"
            />
          </template>

          <span
            v-else
            class="breadcrumbs__label body-text1 body-text1--bold truncate"
            :title="breadcrumb.title"
          >
            {{ breadcrumb.title }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IBreadcrumb } from '~/types/breadcrumb.interface'

@Component({})
export default class ComponentBreadcrumbs extends Vue {
  @Prop()
  public breadcrumbs!: IBreadcrumb[]

  public get linkLimit(): number {
    return this.breadcrumbs.length - 1
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.breadcrumbs {
  padding: 0 16px;
  color: $color-black;
  overflow: hidden;
  &--set-absolute {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 49;
  }

  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 12px 8px;
  }

  &__icon {
    margin-left: 8px;
  }

  &__link {
    color: $color-black;
    max-width: 200px;
  }

  &__label {
    max-width: 220px;
  }
}

.breadcrumbs--set-absolute {
  .breadcrumbs__link,
  .breadcrumbs__label,
  .breadcrumbs__icon {
    color: $color-white;
  }
}

@include media-lg {
  .breadcrumbs {
    padding: 0 120px;

    &__list {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
}
</style>
