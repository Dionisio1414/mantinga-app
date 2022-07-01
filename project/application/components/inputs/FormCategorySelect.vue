<template>
  <div class="select-wrapper">
    <Multiselect
      :id="name"
      ref="form_select"
      :value="value"
      class="form-select"
      :searchable="false"
      placeholder=""
      :options="options"
      :allow-empty="true"
      :custom-label="customLabel"
      @input="onInput"
    >
      <template slot="option" slot-scope="props">
        <div class="form-category-select__option">
          {{ props.option.name }}
        </div>
      </template>
    </Multiselect>
    <label
      class="form-control__label form-label truncate select-wrapper__label"
      :class="{ 'form-control__label--active': value && value.length }"
      :for="name"
      :title="label"
      @click="focusField"
      v-html="$sanitize(label)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Multiselect from 'vue-multiselect'
import { ITaxon, ITaxonSelect } from '~/types/taxons'

@Component({
  components: {
    Multiselect,
  },
})
export default class ComponentFormCategorySelect extends Vue {
  @Prop()
  public readonly value!: string

  @Prop()
  public readonly name!: string

  @Prop()
  public readonly label!: string

  @Prop({ default: () => [] })
  public categories!: ITaxon[]

  public focusField(): void {
    // @ts-ignore
    this.$refs.form_select?.toggle()
  }

  public onInput(option: ITaxonSelect): void {
    if (option.value === this.value) this.$emit('input', null)
    else this.$emit('input', option.value)
  }

  public get options(): ITaxonSelect[] {
    const result = this.categories.map((category: ITaxon) => {
      return {
        value: category.code,
        name: category.name,
      }
    })

    return result
  }

  public customLabel(): string {
    return this.options.find((o) => o.value === this.value)?.name || 'Category'
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
