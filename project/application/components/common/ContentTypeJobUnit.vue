<template>
  <div class="job-unit">
    <div class="job-unit__wrapper">
      <div class="job-unit__container">
        <h5 class="h5 job-unit__heading job-unit__heading--desktop" v-html="$sanitize(title)" />
        <h5 class="h6 job-unit__heading job-unit__heading--mobile" v-html="$sanitize(title)" />
        <ul class="job-unit__list">
          <li v-for="(block, i) in blocks" :key="i" class="job-unit__list-item">
            <svg-icon
              class="job-unit__icon"
              name="leaf"
              width="24"
              height="24"
            />
            <span
              class="body-text1"
              v-html="block && block.title && block.title.value"
            ></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import {
  IContentTypeJobUnitProperties,
  IJobUnitBlock,
} from '~/types/job.interface'

@Component({
  components: {},
})
export default class ComponentContentTypeJobUnit extends Vue {
  @Prop()
  public properties!: IContentTypeJobUnitProperties

  public get title(): string {
    return this.properties?.title?.value || ''
  }

  public get blocks(): IJobUnitBlock[] {
    return this.properties?.blocks?.value || []
  }
}
</script>

<style lang="scss" scoped>
.job-unit {
  &__wrapper {
    padding: 28px 16px;
  }

  &__container {
    max-width: 588px;
    margin: 0 auto;
    display: flex;
    column-gap: 24px;
    flex-direction: column;
  }

  &__heading {
    &--desktop {
      display: none;
    } 
  }

  &__list-item {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding-left: 12px;

    &:first-child {
      margin-top: 24px;
    }
  }

  &__icon {
    margin-right: 16px;
    color: $color-golden;
    min-width: 24px;
    transform: rotate(70deg);
  }
}

@include media-lg {
  .job-unit {
    &__wrapper {
      padding: 28px 0;
      margin: 0 120px;
    }

    &__heading {
      &--desktop {
        display: inline;
      }

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
