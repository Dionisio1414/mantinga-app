<template>
  <div class="modal-recipes-filter">
    <button 
        class="modal-recipes-filter__close"
        type="button"
        @click="closeModal"
    >
        <svg-icon name="close" width="23" height="23"></svg-icon>
    </button>

    <h2
      class="modal-recipes-filter__heading h6"
      v-html="$sanitize($t('recipes_page.button_filter_text'))"
    >
    </h2>

    <ModalRecipesFilterForm 
      @cancel="closeModal"
      @submitForm="submitFormHandler"
      @clearForm="clearFormHandler"
    >
    </ModalRecipesFilterForm>
  </div>
</template>

<script lang="ts">
import {
  Component,
  mixins,
  Getter,
  ProvideReactive,
  Provide,
  Action,
  Emit,
  Prop
} from 'nuxt-property-decorator'
import ModalRecipesFilterForm from '~/components/forms/ModalRecipesFilterForm.vue'
import MixinModal from '~/mixins/modalMixin'
import { IRecipesMultiselectList, IRecipeCategories, IRecipeInnerProduct, IRecipeTimes } from '~/types/recipes.interface';
import { IVueI18n } from 'vue-i18n'

import {
  TOKEN_MODAL_RECIPES_FILTER_CATEGORIES,
  TOKEN_MODAL_RECIPES_FILTER_PRODUCTS,
  TOKEN_MODAL_RECIPES_FILTER_COOKING_TIME,
  TOKEN_MODAL_RECIPES_FILTER_SUBMIT,
  TOKEN_MODAL_RECIPES_FILTER_ERROR,
  TOKEN_MODAL_RECIPES_FILTER_STATUS,
} from '~/constants/tokens/modal-recipes-filter'

import { COOKING_FILTER_OPTIONS, ECookingTime, ICookingFilterOptions } from '~/constants/cooking-filter-options'
import { EStatus } from '~/constants/status';

@Component({
  components: {
    ModalRecipesFilterForm,
  },
})
export default class ComponentModalRecipeFilter extends mixins(MixinModal) {
  @Prop() public selectHandler!: () => void
  
  @Getter('page-recipes-categories/recipesCategories') public recipesCategories!: IRecipeCategories[] | null
  @Getter('products/productsList') public products!: IRecipeInnerProduct[]
  @Getter('page-recipes-times/recipesTimes') public recipesCookingTimes!: IRecipeTimes[]

  @Getter('page-recipes-list/status') public status!: EStatus

  @Action('page-recipes-list/clearForm') public clearForm!: () => void

  public $t: any;

  @ProvideReactive(TOKEN_MODAL_RECIPES_FILTER_COOKING_TIME)
  public get cookingTimesList(): IRecipesMultiselectList[] {
      const cookingTimesList: IRecipesMultiselectList[]  = (this.recipesCookingTimes || []).map((item: IRecipeTimes) => {
          return {
              id: item.id,
              title: (item.translations[this.currentLocale] || {}).name
          } 
      }) 

      return [ 
          {
              id: -1,
              title: this.$t('recipes_page.filters.all_label').toString()
          }, 
          ...cookingTimesList 
      ] 
  }

  public get currentLocale(): string {
      return (this.$i18n as IVueI18n).locale
  }

  @ProvideReactive(TOKEN_MODAL_RECIPES_FILTER_CATEGORIES)
  public get categoriesList(): IRecipesMultiselectList[] {
      let categoriesList: IRecipesMultiselectList[]  = (this.recipesCategories || []).map((item: IRecipeCategories) => {
          return {
              id: item.id,
              title: item.translations[this.currentLocale].name
          } 
      })

      return [ 
          {
              id: -1,
              title: this.$t('recipes_page.filters.all_label').toString()
          }, 
          ...categoriesList 
      ]
  }

  @ProvideReactive(TOKEN_MODAL_RECIPES_FILTER_PRODUCTS)
  public get productsList(): IRecipesMultiselectList[] {
      let productsList: IRecipesMultiselectList[] = (this.products || []).map((item: IRecipeInnerProduct) => {
          return {
              id: item?.id,
              title: item.translations[this.currentLocale].name
          } 
      })

      return [ 
          {
              id: -1,
              title: this.$t('recipes_page.filters.all_label').toString()
          }, 
          ...productsList 
      ]
  }

  @ProvideReactive(TOKEN_MODAL_RECIPES_FILTER_STATUS)
  public get isProcessing(): boolean {
      return this.status === EStatus.PROCESSING
  }

  @Emit('close')
  public closeModal(): void {}

  public submitFormHandler(): void {
    this.selectHandler()
    this.closeModal()
  }

  public clearFormHandler(): void {
    this.clearForm()
  }
}
</script>

<style lang="scss" scoped>
.modal-recipes-filter {
    position: relative;
    padding: 64px 16px 24px 16px;

    &__close {
        position: absolute;
        top: 29px;
        right: 21px;
    }

    &__heading {
        text-align: center;
        margin-bottom: 32px;
    }
}
</style>
