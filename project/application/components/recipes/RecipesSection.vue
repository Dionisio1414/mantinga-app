<template>
    <div class="recipes-section">
        <div class="recipes-grid">
            <NuxtLink 
                v-for="val in recipesList"
                :to="localePath({ name: 'recipes-id', params: {id: val.id}})"
                class="recipes-grid__item"
                :class="{'recipes-grid__item--disabled': isProcessing}"
                :key="val.id"
            >
                <RecipeCard
                    :recipe="val"
                >
                </RecipeCard>
            </NuxtLink>
        </div>
        <div class="recipes-pagination">
            <button 
                v-if="showMoreButton"
                type="button" 
                class="btn btn--secondary text-uppercase recipes-pagination__btn"
                :disabled="isProcessing"
                @click="showMoreHandler"
            >
                {{ $sanitize($t('recipes_page.button_show_more_text')) }}
            </button>
            <div class="recipes-pagination__text body-text1">
                <span>{{ $sanitize($t('recipes_page.showing_product_text')) }}:</span>
                <strong class="body-text1 body-text1--bold">{{ recipesListLength }}</strong>
                <span>{{ $sanitize($t('recipes_page.of')) }}</span>
                <span>{{ recipeItems }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import { IRecipe } from '~/types/recipes.interface'
import RecipeCard from '~/components/cards/RecipeCard.vue'
import { EStatus } from '~/constants/status';

@Component({
    components: { RecipeCard }
})
export default class ComponentRecipesSection extends Vue {
    @Prop({ default: () => [] }) public recipesList!: IRecipe[]
    @Prop({ default: () => [] }) public recipeItems!: number
    @Prop() public status!: EStatus

    public get recipesListLength(): number {
        return this.recipesList.length
    }

    public get showMoreButton(): boolean {
        return this.recipesListLength < this.recipeItems
    }

    public get isProcessing(): boolean {
        return this.status === EStatus.PROCESSING
    }

    @Emit('showMore')
    public showMoreHandler(): void {}
}
</script>

<style lang="scss" scoped>
    .recipes {
        &-grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 24px;
            margin-bottom: 24px;
            @include media-sm {
                grid-template-columns: 1fr 1fr;
            }
            @include media-md {
                grid-template-columns: 1fr 1fr 1fr;
            }
            @include media-lg {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            &__item--disabled {
                pointer-events: none;
                opacity: .5;
            }
        }
        &-pagination {
            text-align: center;
            &__btn {
                margin: 0 auto 24px auto;
            }
        }
    }
</style>