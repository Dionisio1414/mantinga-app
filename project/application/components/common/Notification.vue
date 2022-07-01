<template>
  <div :class="notificationClassNames">
    <div class="notification__row">
      <div v-if="iconName" class="notification__col">
        <svg-icon
          :name="iconName"
          :width="24"
          :height="24"
          :class="iconClassNames"
        />
      </div>
      <div class="notification__col">
        <div
          v-if="notificationTitle"
          class="notification__header"
          v-html="$sanitize(notificationTitle)"
        ></div>
        <div
          v-if="notificationText"
          class="notification__content body-text1"
          v-html="notificationText"
        ></div>
      </div>
      <div class="notification__col">
        <button type="button" class="close-btn" @click="closeNotifiacation">
          <span>
            <svg-icon name="close" :width="24" :height="24" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { NotificationOptions } from 'vue-notification'

import { EMessageTypes } from '~/constants/message-types'

@Component({})
export default class ComponentNotification extends Vue {
  @Prop()
  public item!: NotificationOptions

  public get notificationTitle(): string {
    return this.item?.title || ''
  }

  public get notificationText(): string {
    return this.item?.text || ''
  }

  public get notificationType(): EMessageTypes {
    return this.item.type as EMessageTypes
  }

  public get notificationClassNames(): string[] {
    const classNames: string[] = ['notification']

    switch (this.notificationType) {
      case EMessageTypes.SUCCESS: {
        classNames.push('notification--success')
        break
      }
      case EMessageTypes.DANGER: {
        classNames.push('notification--error')
        break
      }
      case EMessageTypes.INFO: {
        classNames.push('notification--info')
        break
      }
    }

    return classNames
  }

  public get iconName(): string {
    let result = ''
    switch (this.notificationType) {
      case EMessageTypes.SUCCESS: {
        result = 'check'
        break
      }
      case EMessageTypes.DANGER: {
        result = 'alert'
        break
      }
      case EMessageTypes.INFO: {
        result = ''
        break
      }
      case EMessageTypes.WARNING: {
        result = 'warning'
        break
      }
    }

    return result
  }

  public get iconClassNames(): string[] {
    const classNames: string[] = ['notification__icon']

    switch (this.notificationType) {
      case EMessageTypes.SUCCESS: {
        classNames.push('notification__icon--success')
        break
      }
      case EMessageTypes.DANGER: {
        classNames.push('notification__icon--error')
        break
      }
      case EMessageTypes.INFO: {
        classNames.push('notification__icon--info')
        break
      }
      case EMessageTypes.WARNING: {
        classNames.push('notification__icon--warning')
        break
      }
    }

    return classNames
  }

  public closeNotifiacation(): void {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
$gap: 8px;

.notification {
  background: $color-white;
  border: 2px solid $color-golden;
  border-radius: 8px;
  margin: 12px 0;
  box-shadow: $shadow-100;
  padding: 16px;
  width: 100%;

  &__row {
    display: flex;
    align-items: flex-start;
  }

  &__col {
    &:not(:first-child) {
      padding-left: 8px;
    }

    &:not(:last-child) {
      padding-right: 8px;
    }

    &:last-child {
      margin-left: auto;
    }

    &:first-child {
      width: max-content;
    }
  }

  &__header {
    margin-bottom: 8px;
  }

  &__icon {
    font-size: 16px;

    &--error {
      color: $color-secondary;
    }

    &--success {
      color: $color-success;
    }

    &--warning {
      color: $color-warning;
    }
  }

  &__header {
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
  }

  &--success {
    border-color: $color-success;
  }

  &--error {
    border-color: $color-secondary;
  }

  &--warning {
    border-color: $color-warning;
  }

  &--info {
    border-color: $color-golden;
  }
}

@include media-md {
  .notification {
    width: 468px;
  }
}
</style>
