<template>
  <div class="select-wrapper">
    <Multiselect
      :id="name"
      ref="form_select"
      :value="value"
      class="form-select"
      :class="{'form-select--dark': isDark}"
      :searchable="searchable"
      :disabled="disabled"
      placeholder=""
      :close-on-select="closeOnSelect"
      :track-by="trackBy"
      :options="options"
      :label="valueLabel"
      :multiple="multiple"
      :custom-label="customLabel"
      @input="onInput"
    />
    <label
      v-if="showLabelOnActive || !showLabelOnActive && !value"
      class="form-control__label form-label truncate select-wrapper__label"
      :class="{ 'form-control__label--active': isActiveLabel }"
      :for="name"
      :title="label"
      @click="focusField"
      v-html="$sanitize(label)"
    />
    <p v-if="message.length" class="form-text">{{ message }}</p>
    <FormControlErrors v-if="invalid" :validations="validations" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IDictionary } from '~/types/dictionary.interface'
import Multiselect from 'vue-multiselect'

import FormControlErrors from './FormControlErrors.vue'

@Component({
  components: {
    FormControlErrors,
    Multiselect,
  },
})
export default class ComponentFormSelect extends Vue {
  @Prop()
  public readonly value!: string | number

  @Prop()
  public readonly placeholder!: string

  @Prop()
  public readonly name!: string

  @Prop()
  public readonly label!: string

  @Prop()
  public readonly classes!: []

  @Prop({ default: false })
  public invalid!: boolean

  @Prop({ default: '' })
  public errorMessage!: string

  @Prop({ default: '' })
  public message!: string

  @Prop({ default: false })
  public readonly disabled!: boolean

  @Prop()
  public validations!: IDictionary<any>

  @Prop({ default: () => [] })
  public options!: []

  @Prop({ default: false })
  public searchable!: boolean

  @Prop({ default: '' })
  public trackBy!: string

  @Prop({ default: '' })
  public valueLabel!: string

  @Prop({ default: false })
  public multiple!: boolean

  @Prop({ default: true })
  public closeOnSelect!: boolean

  @Prop()
  public customLabel!: () => string

  @Prop({ default: false })
  public isDark!: boolean

  @Prop({ default: true })
  public showLabelOnActive!: boolean;

  public updateValue(e: any): void {
    this.$emit('input', e.target.value)
  }

  public blurField(e: any): void {
    this.$emit('blur', e)
  }

  public get isActiveLabel(): boolean {
    if (typeof this.value === 'number') {
      return this.value >= 0
    }
    return !!(this.value && this.value.length)
  }

  public focusField(): void {
    // @ts-ignore
    this.$refs.form_select?.toggle()
  }

  public onInput(value: any): void {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  width: 100%;

  &__label {
    width: auto;
    cursor: pointer;
  }
}
</style>
