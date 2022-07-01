<template>
  <div class="accordion">
    <div class="accordion__header">
      <div class="accordion__headline">
        <h6 class="h6">{{ header }}</h6>
      </div>
      <div class="accordion__line" />

      <button
        class="accordion__btn btn btn--golden-fill"
        @click.prevent="switchAccordion"
      >
        <svg-icon
          class="accordion__icon"
          :name="accordionActive ? 'chevron-up' : 'chevron-down'"
          :width="24"
          :height="24"
        />
      </button>
    </div>
    <SlideUpDown
      :active="accordionActive"
      :duration="300"
      @open-start="openStartHandler"
      @close-end="closeEndHandler"
    >
      <div class="accordion__content">
        <slot name="content" />
      </div>
    </SlideUpDown>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import MixinAccordion from '~/mixins/accordionMixin'

@Component({})
export default class ComponentAccordion extends mixins(MixinAccordion) {
  @Prop({ default: '' })
  public header!: string

  public openStartHandler(): void {
    this.$emit('openStart')
  }

  public closeEndHandler(): void {
    this.$emit('closeEnd')
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  &__header {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__headline {
    margin-right: 16px;
    white-space: nowrap;
  }

  &__line {
    width: 100%;
    border-top: 2px solid $color-golden;
  }
}
</style>
