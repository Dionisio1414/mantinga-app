<template>
  <div class="form-switchable-password">
    <input
      :id="id"
      ref="password_input"
      v-model="internalValue"
      :type="inputType"
      class="form-control"
      :class="[{ 'form-control--invalid': invalid }, inputClassNames]"
      :disabled="disabled"
      :placeholder="label"
      :name="name"
      autocomplete="new-password"
      @focus="onInputFocus"
      @blur="onInputBlur"
    />
    <label
      class="form-control__label form-label"
      :for="name"
      @click="focusField"
    >
      {{ label }}</label
    >
    <button
      type="button"
      :disabled="disabled"
      class="btn-icon btn-eye"
      @click="switchHandler"
    >
      <span class="icon-container">
        <svg-icon
          class="icon-eye"
          :class="{
            'icon-eye--focus': inputFocus,
            'icon-eye--disabled': disabled,
          }"
          :name="show ? 'eye' : 'eye'"
          :width="24"
          :height="24"
        />
      </span>
    </button>
    <FormControlErrors v-if="invalid" :validations="validations" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { IDictionary } from '~/types/dictionary.interface'
import FormControlErrors from './FormControlErrors.vue'

@Component({
  components: {
    FormControlErrors,
  },
})
export default class ComponentSwitchablePasswordInput extends Vue {
  @Prop()
  public id?: string

  @Prop()
  public value?: string

  @Prop({ default: false })
  public disabled?: boolean

  @Prop()
  public inputClassNames?: string | string[] | IDictionary<string>

  @Prop()
  public placeholder?: string

  @Prop()
  public name!: string

  @Prop()
  public label!: string

  @Prop({ default: false })
  public invalid!: boolean

  @Prop({ default: '' })
  public errorMessage!: string

  @Prop()
  public validations!: IDictionary<any>

  public internalValue: string | null = null

  public inputFocus: boolean = false

  public show: boolean = false

  @Watch('value')
  public onValueChange(value: string): void {
    this.internalValue = value
  }

  @Watch('internalValue')
  public onInternalValueChange(value: string): void {
    this.$emit('input', value)
  }

  public onInputFocus(): void {
    this.$emit('focus', ...arguments)
    this.inputFocus = true
  }

  public onInputBlur(): void {
    this.$emit('blur', ...arguments)
    this.inputFocus = false
  }

  public get inputType(): string {
    return this.show ? 'text' : 'password'
  }

  public switchHandler(): void {
    this.show = !this.show
  }

  public focusField(): void {
    (this.$refs.password_input as HTMLInputElement)?.focus();
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.form-switchable-password {
  position: relative;
}

.btn-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 16px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-eye {
    color: $color-primary-light;

    &--focus {
      color: $color-primary-regular;
    }

    &--disabled {
      color: $color-primary-400;
    }
  }
}

.btn-eye {
  cursor: pointer;
}
</style>
