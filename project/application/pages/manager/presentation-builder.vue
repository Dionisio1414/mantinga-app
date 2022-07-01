<template>
  <div class="page__wrapper">
    <div class="page__container">
      <div class="page-presentation">
        <h3
          class="page-presentation__title"
          v-html="$sanitize($t('page_presentation.title'))"
        />
        <PresentationButtons @generatePdf="handleGeneratePresentation" />
        <div class="page-presentation__wrapper">
          <PresentationStaticCard title="Bendrinis viršelis" />
          <client-only>
            <draggable
              v-model="internalCategories"
              handle=".presentation-category__category-card"
              :animation="200"
              @start="startDragCategory"
              @end="endDragCategory"
            >
              <transition-group
                type="transition"
                :name="!isMoving ? 'flip-list' : null"
              >
                <PresentationCategory
                  v-for="(category, index) in categories"
                  :key="category.id"
                  :category="category"
                  :is-show-products="!isMoving"
                  @deleteCategory="openDeleteCategoryModal"
                  @changeCategoryPosition="
                    handleChangeCategoryPosition($event, index)
                  "
                  @deleteProduct="openDeleteProductModal"
                  @changeProductPosition="handleChangeProductPosition"
                />
              </transition-group>
            </draggable>
          </client-only>
          <PresentationStaticCard title="Apie įmonė viršelis" />
          <PresentationStaticCard title="Kontaktai viršelis" />
        </div>
        <PresentationButtons @generatePdf="handleGeneratePresentation" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Watch } from 'nuxt-property-decorator'
import PresentationStaticCard from '~/components/presentation-builder/PresentationStaticCard.vue'
import PresentationCard from '~/components/presentation-builder/PresentationCard.vue'
import PresentationCategory from '~/components/presentation-builder/PresentationCategory.vue'
import PresentationButtons from '~/components/presentation-builder/PresentationButtons.vue'
import ModalConfirmation from '~/components/modals/ModalConfirmation.vue'
import ModalInfoLoader from '~/components/modals/ModalInfoLoader.vue'
import draggable from 'vuedraggable'

import { CONFIRMATION_MODAL_CONFIG } from '~/constants/modals-config'
import { EMessageTypes } from '~/constants/message-types'
import { IModalConfirmationProps } from '~/types/modal-confirmation'
import { IDictionary } from '~/types/dictionary.interface'
import { IChangeCategoryPositionPayload, IChangeProductPositionPayload, IPresentationBuilderCategory } from '~/types/presentation-builder.interface'
import { EStatus } from '~/constants/status'

@Component({
  components: {
    PresentationStaticCard,
    PresentationCard,
    PresentationCategory,
    PresentationButtons,
    ModalConfirmation,
    ModalInfoLoader,
    draggable,
  },
  layout: 'managersLayout',
  middleware: ['auth-user-only'],
})
export default class PagePresentationBuilder extends Vue {
  public isMoving: boolean = false
  public $modal: any
  public localePath: any
  public generateModalName: string = 'generate_modal_name'

  @Getter('manager-selected-products/selectedProductsIds')
  public selectedProductsIds!: number[]

  @Getter('page-presentation-builder/categories')
  public categories!: IPresentationBuilderCategory[]

  @Getter('page-presentation-builder/generatingStatus')
  public generatingStatus!: EStatus;

  @Action('page-presentation-builder/deleteCategory')
  public deleteCategory!: (categoryId: number) => void

  @Action('page-presentation-builder/deleteProduct')
  public deleteProduct!: (payload: IDictionary<number>) => void

  @Action('page-presentation-builder/changeCategoryPosition')
  public changeCategoryPosition!: (payload: IChangeCategoryPositionPayload) => void

  @Action('page-presentation-builder/changeProductPosition')
  public changeProductPosition!: (payload: IChangeProductPositionPayload) => void

  @Action('page-presentation-builder/generatePresentation')
  public generatePresentation!: () => Promise<void>

  @Action('page-presentation-builder/updateCategories')
  public updateCategories!: (payload: IPresentationBuilderCategory[]) => void

  @Watch('categories.length')
  public handleCategoriesLenght(length: number) {
    if (length === 0) {
      this.$router.push(this.localePath({ name: 'manager-products' }))
    }
  }

  @Watch('generatingStatus')
  public handleIsGenerating(): void {
    if (this.generatingStatus === EStatus.SUCCESS || this.generatingStatus === EStatus.ERROR) {
      this.$modal.hide(this.generateModalName)
      this.showPresentationNotifications()
    }
  }

  public get internalCategories(): IPresentationBuilderCategory[] {
    return this.categories
  }

  public set internalCategories(payload: IPresentationBuilderCategory[]) {
    this.updateCategories(payload)
  }

  public async asyncData({ store, error }: any) {
    try {
      const requestsList = [
        store.dispatch('page-presentation-builder/fetchProducts'),
      ]

      await Promise.all(requestsList)

      const status: EStatus = store.getters['page-presentation-builder/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-presentation-builder/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }

  public handleDeleteCategory(modalObject: any): void {
    const { params }: IDictionary<any> = modalObject

    if (params?.confirm) {
      const { id } = params

      this.deleteCategory(id)
    }
  }

  public handleDeleteProduct(modalObject: any): void {
    const { params }: IDictionary<any> = modalObject

    if (params?.confirm) {
      const { id, categoryId } = params

      this.deleteProduct({ id, categoryId })
    }
  }

  public handleChangeProductPosition({
    direction,
    index,
    subcategoryIndex,
    categoryId,
  }: any): void {
    this.changeProductPosition({
      direction,
      index,
      subcategoryIndex,
      categoryId,
    })
  }

  public handleChangeCategoryPosition(
    direction: string,
    oldIndex: number
  ): void {
    this.changeCategoryPosition({ direction, oldIndex })
  }

  public startDragCategory(): void {
    this.isMoving = true
  }

  public endDragCategory(): void {
    this.isMoving = false
  }

  public openDeleteCategoryModal(id: number): void {
    const props: IModalConfirmationProps = {
      message: this.$t('page_presentation.delete_category_text').toString(),
      params: {
        id,
      },
    }
    this.$modal.show(ModalConfirmation, props, CONFIRMATION_MODAL_CONFIG, {
      'before-close': this.handleDeleteCategory,
    })
  }

  public openDeleteProductModal({ id, categoryId }: IDictionary<number>): void {
    const props: IModalConfirmationProps = {
      message: this.$t('page_presentation.delete_product_text').toString(),
      params: {
        id,
        categoryId,
      },
    }
    this.$modal.show(ModalConfirmation, props, CONFIRMATION_MODAL_CONFIG, {
      'before-close': this.handleDeleteProduct,
    })
  }

  public handleGeneratePresentation(): void {
    const props: IModalConfirmationProps = {
      message: this.$t('page_presentation.pdf_generating_text').toString(),
    }

    this.$modal.show(ModalInfoLoader, props, {
      ...CONFIRMATION_MODAL_CONFIG,
      name: this.generateModalName,
    })

    this.generatePresentation()
  }

  public showPresentationNotifications(): void {
    if (this.generatingStatus === EStatus.SUCCESS) {
      this.$notify({
        type: EMessageTypes.SUCCESS,
        text: this.$t('page_presentation.success_generating').toString(),
      })
    } else if (this.generatingStatus === EStatus.ERROR) {
      this.$notify({
        type: EMessageTypes.DANGER,
        text: this.$t('page_presentation.error_generating').toString(),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page__wrapper {
  padding-top: 38px;
}

.page-presentation {
  &__title {
    @include h5;
    text-align: center;
    margin-bottom: 32px;
  }

  &__wrapper {
    max-width: 792px;
    margin: 32px auto;
  }
}

@include media-lg {
  .page__wrapper {
    padding-top: 30px;
  }

  .page-presentation {
    &__title {
      @include h4;
    }

    &__wrapper {
      margin: 56px auto;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>
