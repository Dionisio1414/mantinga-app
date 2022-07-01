<template>
  <div class="form-input">
    <input
      ref="form_input"
      :value="value"
      class="form-control"
      :class="[{ 'form-control--invalid': invalid }, classes]"
      :name="name"
      :type="type"
      :placeholder="label"
      :disabled="disabled"
      @input="updateValue"
      @blur="blurField"
    />
    <label
      class="form-control__label form-label"
      for="input"
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

import FormControlErrors from './FormControlErrors.vue'

@Component({
  components: {
    FormControlErrors,
  },
})
export default class ComponentFormInput extends Vue {
  @Prop()
  public readonly value!: string

  @Prop()
  public readonly placeholder!: string

  @Prop()
  public readonly name!: string

  @Prop()
  public readonly label!: string

  @Prop({ default: 'text' })
  public readonly type!: string

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

  public updateValue(e: any): void {
    this.$emit('input', e.target.value)
  }

  public blurField(e: any): void {
    this.$emit('blur', e)
  }

  public focusField(): void {
    // @ts-ignore
    this.$refs.form_input?.focus()
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;
}
</style>
