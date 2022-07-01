<template>
  <div class="job-unit-card">
    <svg-icon class="job-unit-card__icon" name="leaf2" width="40" height="40" />
    <p class="job-unit-card__text h6" v-html="$sanitize(text)" />
    <button class="job-unit-card__button">
      <svg-icon name="arrow-right" width="24" height="24" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentJobCard extends Vue {
  @Prop({ default: '' })
  public text!: string
}
</script>

<style lang="scss" scoped>
.job-unit-card {
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: $shadow-100;
  transition: all $transition;
  border: 1px solid $color-white;
  border-radius: 8px;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: $shadow-200;
    border: 1px solid $color-golden;
  }

  &__text {
    margin-top: 16px;
    text-align: center;
    margin-bottom: 16px;
  }

  &__button {
    margin-left: auto;
    margin-top: auto;
    color: $color-golden;
  }

  &__icon {
    color: $color-golden
  }
}
</style>
