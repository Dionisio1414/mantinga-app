<template>
  <div class="form-input">
    <input
      ref="input"
      v-model="internalValue"
      class="form-search"
      :class="[{ 'form-control--invalid': invalid }, classes]"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @blur="blurField"
      @focus="focusField"
    />
    <div class="icon-search-container">
      <svg-icon
        class="icon-search"
        :class="{ 'icon-search--disabled': disabled }"
        name="search"
        width="24"
        height="24"
      />
    </div>
    <button
      v-if="isShowCloseButton || value.length > 1"
      class="icon-close-button"
      @click="cleanValue"
    >
      <svg-icon class="icon-close" name="close" width="24" height="24" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { debounce } from 'lodash'

@Component({})
export default class ComponentFormSearchInput extends Vue {
  @Prop({ default: '' })
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
  public isShowCloseButton!: boolean

  @Prop({ default: false })
  public invalid!: boolean

  @Prop({ default: '' })
  public errorMessage!: string

  @Prop({ default: '' })
  public message!: string

  @Prop({ default: false })
  public readonly disabled!: boolean

  public fieldInFocus: boolean = false
  public internalValue: string = this.value;

  @Watch('value', { immediate: true})
  public handleValue(value: string): void {
    this.internalValue = value
  }

  @Watch('internalValue')
  public handleInternalValue = debounce(this.updateValue, 300)

  public updateValue(): void {
    this.$emit('input', this.internalValue.trim())
  }

  public blurField(e: any): void {
    this.$emit('blue', e)
    this.fieldInFocus = false
  }

  public focusField(e: any): void {
    this.$emit('focus', e)
    this.fieldInFocus = true
  }

  public cleanValue(): void {
    this.$emit('clean')
  }

  public focus(): void {
    //  @ts-ignore
    this.$refs.input.focus()
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;
  width: 100%;
}

.icon-search-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-close-button {
  position: absolute;
  top: 0;
  right: 0;
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon-search {
  color: $color-primary-light;

  &--disabled {
    color: $color-primary-400;
  }
}

.form-control {
  padding-left: 44px;
}
</style>
