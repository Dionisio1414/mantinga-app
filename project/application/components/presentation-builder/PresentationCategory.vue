<template>
  <div v-if="category.children && category.children.length" class="presentation-category">
    <PresentationCard
      class="presentation-category__category-card"
      :title="category.name"
      :image="category.image"
      :is-category="true"
      @delete="deleteCategory(category.id)"
      @changePosition="changeCategoryPosition"
    />
    <div v-show="isShowProducts">
      <div
        v-for="(subcategory, subcategoryIndex) in category.children"
        :key="`${category.name}-${subcategory.id}`"
        class="presentation-category__subcategories"
      >
        <draggable
          v-if="subcategory.products && subcategory.products.length"
          class="list-group"
          :list="subcategory.products"
          :group="subcategory.names"
          handle=".presentation-category__product"
          @start="handleDragStart"
          @end="handleDragEnd"
        >
          <transition-group  type="transition" :name="isMoving ? 'flip-list' : null">
            <PresentationCard
              v-for="(item, index) in subcategory.products"
              :key="`${subcategory.name}-${item.id}`"
              :title="item.name"
              :image="item.image"
              class="presentation-category__product"
              @delete="deleteProduct(item.id, category.id)"
              @changePosition="changeProductPosition($event, index, subcategoryIndex)"
            />
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import PresentationCard from '~/components/presentation-builder/PresentationCard.vue'
import draggable from 'vuedraggable'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {
    PresentationCard,
    draggable,
  },
})
export default class ComponentPresentationCategory extends Vue {
  public isMoving: boolean = false;

  @Prop({ default: () => {} })
  public category!: any

  @Prop({ default: true })
  public isShowProducts!: boolean;

  public handleDragStart(): void {
    this.isMoving = true;
  }

  public handleDragEnd(e: any): void {
    this.isMoving = false;
    if (e.oldIndex === e.newIndex) {
      this.$notify({
        text: 'You can move products only in subcategories',
        type: EMessageTypes.WARNING,
      })
    }
  }

  public deleteProduct(id: number, categoryId: number): void {
    this.$emit('deleteProduct', {id, categoryId})
  }

  public changeProductPosition(
    direction: string,
    index: number,
    subcategoryIndex: number
  ): void {
    this.$emit('changeProductPosition', {direction, index, subcategoryIndex, categoryId: this.category.id})
  }

  public deleteCategory(id: number): void {
    this.$emit('deleteCategory', id)
  }

  public changeCategoryPosition(direction: string): void {
    this.$emit('changeCategoryPosition', direction)
  }
}
</script>

<style lang="scss" scoped>


.presentation-category {
  margin-bottom: 24px;

  &__category-card {
    margin-bottom: 24px;
  }

  &__subcategories {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__product {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}

@include media-lg {
  .presentation-category {
    margin-bottom: 32px;
    &__category-card {
      margin-bottom: 16px;
    }

    &__subcategories {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }

    &__product {
      margin-left: 16px;
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
</style>
