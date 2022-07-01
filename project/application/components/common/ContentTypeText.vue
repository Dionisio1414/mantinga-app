<template>
  <div class="text-container">
    <div class="content-type-text">
      <div
        class="content-type-text__text subtitle"
        v-html="$sanitize(textValue)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IContentTypeTextProperties } from '~/types/content-type-text.interface'

@Component({})
export default class ComponentContentTypeText extends Vue {
  @Prop()
  public properties!: IContentTypeTextProperties

  public get textValue(): string {
    return this.properties?.text?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.text-container {
  padding: 0 16px;
}
.content-type-text {
  width: 100%;
  max-width: 794px;
  margin: 0 auto;
  &__text {
    ::v-deep {
      p:not(:last-child) {
        margin-bottom: 32px;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        &:not(:last-child) {
          margin-bottom: 24px;
        }
      }

      ul {
        margin-bottom: 24px;
        margin-left: 24px;
        li {
          list-style: disc;
        }
      }

      ol {
        margin-bottom: 24px;
        margin-left: 24px;

        li {
          list-style-type: decimal;
        }
      }

      table,
      th,
      td {
        border: 1px solid $color-primary-regular;
      }

      table {
        margin-bottom: 24px;
      }

      td {
        padding: 0 16px;
      }
    }
  }
}

@include media-lg {
  .text-container {
    padding: 0 120px;
  }
}
</style>
