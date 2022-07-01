<template>
  <ul class="form-errors">
    <li
      v-for="message in errorMesages"
      :key="message"
      class="form-text form-text--invalid"
      v-html="$sanitize(message)"
    ></li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import { IDictionary } from '~/types/dictionary.interface'

@Component({})
export default class ComponentFormControlErrors extends Vue {
  @Prop()
  public validations!: IDictionary<any>

  public $t: any

  public get errorMesages(): string[] {
    const result: string[] = []

    if (this.validations?.required === false) {
      result.push(this.$t('validations.required').toString())
    }

    if (this.validations?.email === false) {
      result.push(this.$t('validations.email').toString())
    }

    if (this.validations?.minLength === false) {
      result.push(
        this.$t('validations.minLength', {
          n: this.validations.$params.minLength.min,
        }).toString()
      )
    }

    if (this.validations?.maxLength === false) {
      result.push(
        this.$t('validations.maxLength', {
          n: this.validations?.$params?.maxLength?.max,
        }).toString()
      )
    }

    if (this.validations?.sameAs === false) {
      result.push(this.$t('validations.sameAs').toString())
    }

    if (this.validations?.agreeTo === false) {
      result.push(this.$t('validations.agreeTo').toString())
    }

    if (this.validations?.numeric === false) {
      result.push(this.$t('validations.numeric').toString())
    }

    if (this.validations?.minValue === false) {
      result.push(
        this.$t('validations.minValue', {
          n: this.validations?.$params?.minValue?.min,
        }).toString()
      )
    }

    return result
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.form-errors {
  list-style: none;
  padding: 0;
  margin: 0;
  color: $color-secondary;
  min-height: 14px;
}
</style>
