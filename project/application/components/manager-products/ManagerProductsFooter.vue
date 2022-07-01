<template>
  <div class="manager-products-footer">
    <div class="manager-products-footer__container">
      <template v-if="matchedLocales && matchedLocales.length">
        <div
          class="manager-products-footer__label subtitle"
          v-html="$sanitize($t('page_manager_products.presentation_lang'))"
        />
        <FormSelect
          :value="selectedLocale"
          class="manager-products-footer__select"
          :options="matchedLocales"
          :label="matchedLocales[0]"
          :show-label-on-active="false"
          @input="handleLocale"
        />
      </template>
      <button
        type="button"
        class="manager-products-footer__btn btn btn--secondary"
        @click="goToPresentationBuilder"
      >
        <svg-icon name="text-box-plus" width="24" height="24" />
        <span
          class="btn-title"
          v-html="$sanitize($t('page_manager_products.prepare_presentation'))"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import FormSelect from '~/components/inputs/FormSelect.vue'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {
    FormSelect,
  },
})
export default class ComponentManagerProductsFooter extends Vue {
  @Prop({ default: () => [] })
  public selectedProductsIds!: number[]

  @Prop({ default: () => [] })
  public matchedLocales!: string[]

  @Prop({default: ''})
  public selectedLocale!: string;

  public localePath: any

  public handleLocale(value: string): void {
    this.$emit('selectLocale', value)
  }

  public goToPresentationBuilder(): void {
    if (this.selectedProductsIds?.length && this.selectedLocale) {
      this.$router.push(
        this.localePath({ name: 'manager-presentation-builder' })
      )
    } else if(!this.selectedProductsIds?.length) {
      this.$notify({
        type: EMessageTypes.WARNING,
        text: this.$t('page_manager_products.please_select_product').toString(),
      })
    } else if(!this.selectedLocale) {
      this.$notify({
        type: EMessageTypes.WARNING,
        text: this.$t('page_manager_products.please_select_locale').toString(),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.manager-products-footer {
  background-color: rgba($color: $color-black, $alpha: 0.1);
  box-shadow: $shadow-100;
  padding: 12px 47px;
  margin-top: auto;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__select {
    width: 89px !important;
    min-width: 89px;
    text-transform: uppercase;
  }

  &__btn {
    margin-left: 24px;
  }

  &__label {
    display: none;
    margin-right: 24px;
  }
}

@include media-lg {
  .manager-products-footer {
    padding: 12px 120px;
    &__container {
      justify-content: flex-end;

      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    &__label {
      display: block;
    }
  }
}
</style>
