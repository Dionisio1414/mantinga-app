<template>
    <div class="recipes-header">
        <div class="recipes-header__caption">
            <h1
                class="recipes-header__title recipes-header__title--desktop h4"
                v-html="$sanitize(title)"
            >
            </h1>
            <h1
                class="recipes-header__title recipes-header__title--mobile h5"
                v-html="$sanitize(title)"
            >
            </h1>
        </div>
        <!-- <div
            class="recipes-header__description body-text1"
            v-html="$sanitize(description)"
        >
        </div> -->
        <ContentTypeRoot
          v-for="(contentType, index) in contentTypes"
          :key="index"
          :content-type="contentType"
          class="recipes-header__content-type"
        >
        </ContentTypeRoot>
        <div class="recipes-header__actions">
            <div class="recipes-header__actions-item">
                <Multiselect
                    :value="form['category.id']"
                    class="form-select"
                    :searchable="false"
                    :disabled="isProcessing"
                    :placeholder="$sanitize($t('recipes_page.placeholders.category'))"
                    :options="categoriesOptions"
                    :custom-label="customLabelCategories"
                    @input="selectHandler($event, 'category.id')"
                >
                </Multiselect>
            </div>
            <div class="recipes-header__actions-item">
                <Multiselect
                    :value="form['cookingTime']"
                    id="cooking_time"
                    class="form-select"
                    :searchable="false"
                    :disabled="isProcessing"
                    :placeholder="$sanitize($t('recipes_page.placeholders.cooking_time'))"
                    :options="cookingTimeOptions"
                    :custom-label="customLabelCookingTime"
                    @input="selectHandler($event, 'cookingTime')"
                >
                </Multiselect>
            </div>
            <div class="recipes-header__actions-item">
                <Multiselect
                    :value="form['products.id']"
                    id="ingredients"
                    class="form-select"
                    :searchable="true"
                    :disabled="isProcessing"
                    :placeholder="$sanitize($t('recipes_page.placeholders.ingridients'))"
                    :options="productsOptions"
                    :custom-label="customLabelProducts"
                    @input="selectHandler($event, 'products.id')"
                    @search-change="ingredientsSearchHandler"
                >
                </Multiselect>
            </div>
        </div>
        <div class="recipes-header__filter">
            <button
                type="button"
                class="btn btn--alternative recipes-header__filter-btn"
                @click="filterHandler"
            >
                <div
                    class="btn-title"
                    v-html="$sanitize($t('recipes_page.button_filter_text'))"
                >
                </div>
            </button>
            <span class="recipes-header__filter-text body-text1 body-text1--bold">{{ $sanitize($t('recipes_page.products_found')) }}: {{ recipesListLength }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import Multiselect from 'vue-multiselect'
import { MOBILE_FILTER_MODAL_CONFIG } from '~/constants/modals-config'
import ModalRecipesFilter from '~/components/modals/ModalRecipesFilter.vue'
import { IRecipesMultiselectList, IRecipeCategories, IRecipeInnerProduct, IRecipe, IRecipeTimes } from '~/types/recipes.interface'
import { IVueI18n } from 'vue-i18n'
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'
import { IContentType } from '~/types/content-type.interface'
import storeFormMapper from '~/utils/store-form-mapper'
import { COOKING_FILTER_OPTIONS, ICookingFilterOptions } from '~/constants/cooking-filter-options'
import { EStatus } from '~/constants/status'

@Component({
    components: { Multiselect, ModalRecipesFilter, ContentTypeRoot }
})
export default class ComponentRecipesHeader extends Vue {
    @Prop() title!: string
    @Prop() contentTypes!: IContentType[]
    @Prop() categories!: IRecipeCategories[]
    @Prop() products!: IRecipeInnerProduct[]
    @Prop() recipesCookingTimes!: IRecipeTimes[]
    @Prop({ default: () => [] }) public recipesList!: IRecipe[]
    @Prop() public status!: EStatus

    public $modal: any
    public $t: any;

    // public cookingTimeValues: ICookingFilterOptions[] = COOKING_FILTER_OPTIONS
    
    public get recipesListLength(): number {
        return this.recipesList.length
    }

    public get currentLocale(): string {
        return (this.$i18n as IVueI18n).locale
    }

    public get categoriesOptions(): number[] {
        return (this.categoriesList || []).map(item => item.id);
    }

    public get productsOptions(): number[] {
        return (this.productsList || []).map(item => item.id);
    }

    public get cookingTimeOptions(): Array<number | string> {
        return (this.cookingTimesList || []).map(item => item.id);
    }

    public customLabelCategories(id: number | null): string {
        const option = this.categoriesList.find(option => option.id === id);
        return option?.title ?? ''
    }

    public customLabelProducts(id: number | null): string {
        const option = this.productsList.find(option => option.id === id);
        return option?.title ?? '';
    }
    
    public customLabelCookingTime(id: string | number): string {
        const option = this.cookingTimesList.find(option => option.id === id);
        return option?.title ?? '';
    }

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

    public get categoriesList(): IRecipesMultiselectList[] {
        const categoriesList: IRecipesMultiselectList[]  = (this.categories || []).map((item: IRecipeCategories) => {
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
            ...categoriesList
        ]
    }

    public get productsList(): IRecipesMultiselectList[] {
        const productsList: IRecipesMultiselectList[] = (this.products || []).map((item: IRecipeInnerProduct) => {
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
            ...productsList
        ]
    }

    public get isProcessing(): boolean {
        return this.status === EStatus.PROCESSING
    }

    public get form(): any {
        return storeFormMapper({
            store: this.$store,
            getter: 'page-recipes-list/recipesForm',
            action: 'page-recipes-list/updateFormField',
            fields: [
                'category.id',
                'products.id',
                'cookingTime'
            ]
        })
    }

    @Emit('selectHandler')
    public selectEmitHandler(): void {}

    public selectHandler(value: number, field: string): void {
        if(value === -1) {
            this.form[field] = null
            this.selectEmitHandler()
        } else {
            this.form[field] = value
            this.selectEmitHandler()
        }
    }

    @Emit('ingredientsSearchHandler')
    public ingredientsSearchHandler(): void {}

    public filterHandler(): void {
        this.$modal.show(ModalRecipesFilter, { selectHandler: () => this.selectEmitHandler() }, { ...MOBILE_FILTER_MODAL_CONFIG, classes: 'recipes-modal', })
    }
}
</script>

<style lang="scss" scoped>
    .recipes-header {
        &__title {
            text-transform: lowercase;
            &::first-letter {
                text-transform: uppercase;
            }
            &--desktop {
                display: none;
                @include media-lg {
                    display: block;
                }
            }
            &--mobile {
                @include media-lg {
                    display: none;
                }
            }
        }
        &__caption {
            text-align: center;
            margin-bottom: 20px;
        }
        &__description,
        &__content-type {
            text-align: center;
            margin-bottom: 20px;
        }
        &__content-type {
            padding: 0;
            ::v-deep {
                .content-type-text {
                    max-width: 100%;
                }
            }
        }
        &__actions {
            display: none;
            &-item {
                flex: 0 1 calc(1/3 * 100% - 32px);
            }
            @include media-lg {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
        &__filter {
            text-align: center;
            @include media-lg {
                display: none;
            }
            &-btn {
                margin: 0 auto 32px auto;
            }
        }
    }
</style>
