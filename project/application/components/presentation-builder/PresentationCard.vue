<template>
  <div
    class="presentation-card"
    :class="{ 'presentation-card--category': isCategory }"
  >
    <div class="presentation-card__arrows">
      <button
        class="presentation-card__button"
        type="button"
        @click="changePosition('UP')"
      >
        <svg-icon name="arrow-up" width="24" height="24" />
      </button>
      <button
        class="presentation-card__button"
        type="button"
        @click="changePosition('DOWN')"
      >
        <svg-icon name="arrow-down" width="24" height="24" />
      </button>
    </div>
    <div class="presentation-card__content">
      <div
        class="presentation-card__img-container"
        :class="{ 'presentation-card__img-container--category': isCategory }"
      >
        <img
          class="presentation-card__img"
          :src="image"
        />
      </div>
      <p
        class="presentation-card__title"
        :class="{ 'presentation-card__title--category': isCategory }"
        v-html="$sanitize(title)"
      />
    </div>
    <div>
      <button class="presentation-card__button-delete" @click="deleteProduct">
        <svg-icon name="close" width="24" height="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentPresentationCard extends Vue {
  @Prop({ default: '' })
  public title!: string

  @Prop({ default: false })
  public isCategory!: boolean

  @Prop({default: ''})
  public image!: string;

  public changePosition(position: string): void {
    this.$emit('changePosition', position)
  }

  public deleteProduct(): void {
    this.$emit('delete')
  }
}
</script>

<style lang="scss" scoped>
.presentation-card {
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  box-shadow: $shadow-100;
  border: 1px solid transparent;
  transition: all $transition;
  position: relative;
  min-height: 96px;

  &:hover {
    background-color: $color-golden-light;
    box-shadow: $shadow-200;
    border: 1px solid $color-primary-regular-light;
  }

  &--category {
    background-color: $color-golden-light;
  }

  &__icon {
    color: $color-golden;
  }

  &__content {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__title {
    margin-left: 24px;
    @include body-text1;

    &--category {
      @include subtitle;
      font-weight: 700;
    }
  }

  &__arrows {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__button {
    width: 24px;
    height: 24px;
  }

  &__button-delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 55px;
    height: 55px;
  }

  &__img-container {
    width: 72px;
    height: 72px;
    overflow: hidden;

    &--category {
      width: 48px;
      height: 48px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }
}

@include media-lg {
  .presentation-card {
    padding: 12px 16px;

    &__title {
      margin-left: 48px;
      &--category {
        margin-left: 24px;
        @include h5;
      }
    }

    &__button {
      width: 48px;
      height: 48px;
    }

    &__img-container {
      width: 96px;
      height: 96px;

      &--category {
        width: 89px;
        height: 100px;
      }
    }
  }
}
</style>
