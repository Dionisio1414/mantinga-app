<template>
    <div v-frag>
        <Breadcrumbs 
            :breadcrumbs="breadcrumbs"
        >
        </Breadcrumbs>
        <div class="page__wrapper page__wrapper--recipes-inner">
            <div class="page__container">
                <div class="recipes-inner">
                    <div class="recipes-inner-column">
                        <RecipesInnerHeader
                            class="recipes-inner__header"
                            :title="(recipeData.translations[currentLocale] || {}).name || ''"
                            :minServings="recipeData.minServings"
                            :maxServings="recipeData.maxServings"
                            :cookingTimeMinutes="recipeData.cookingTimeMinutes || 0"
                        >
                        </RecipesInnerHeader>
                        <RecipesInnerIngredientsList
                            v-if="(productList && productList.length) || (ingredientsList && ingredientsList.length)"
                            class="recipes-inner__ingredients"
                            :title="$t('recipes_inner_page.title_ingredients')"
                            :ingredientsList="ingredientsList"
                            :productList="productList"
                        >
                        </RecipesInnerIngredientsList>
                        <RecipesInnerManufacturerList
                            v-if="stepsList && stepsList.length"
                            class="recipes-inner__manufacturer"
                            :title="$t('recipes_inner_page.title_manufacturing_process')"
                            :manufacturerList="stepsList"
                        >
                        </RecipesInnerManufacturerList>
                    </div>
                    <div class="recipes-inner-column">
                        <RecipesInnerGallery
                            :images="images"
                            :video="video"
                            @downloadRecipe="downloadRecipeHandler"
                        >
                        </RecipesInnerGallery>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Getter, Action, Watch } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ModalInfoLoader from '~/components/modals/ModalInfoLoader.vue'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { 
    RecipesInnerHeader,
    RecipesInnerIngredientsList,
    RecipesInnerManufacturerList,
    RecipesInnerGallery
 } from '~/components/recipes-inner'
import { EStatus } from '~/constants/status'
import { IVueI18n } from 'vue-i18n'
import { IRecipeInner, IRecipeInnerProduct } from '~/types/recipes.interface'
import { CONFIRMATION_MODAL_CONFIG } from '~/constants/modals-config'
import { EMessageTypes } from '~/constants/message-types'

@Component({
    components: {
        Breadcrumbs,
        RecipesInnerHeader,
        RecipesInnerIngredientsList,
        RecipesInnerManufacturerList,
        RecipesInnerGallery
    },
    scrollToTop: true
})
export default class PageRecipesInnerIndex extends Vue {
    @Getter('page-recipe-inner/recipeData') public recipeData!: IRecipeInner
    @Getter('page-recipe-inner/status') public status!: EStatus
    @Getter('page-recipe-inner/error') public error!: Error 

    @Getter('page-recipe-inner/generatingStatus')
    public generatingStatus!: EStatus

    @Action('page-recipe-inner/downloadRecipe')
    public downloadRecipe!: (id: number) => Promise<void>

    @Watch('generatingStatus')
    public handleIsGenerating(): void {
        if (this.generatingStatus === EStatus.SUCCESS || this.generatingStatus === EStatus.ERROR) {
            this.$modal.hide(this.generateModalName)
            this.showPresentationNotifications()
        }
    }

    public $t: any
    public $modal: any
    public localePath: any
    public generateModalName: string = 'generate_modal_name'

    public get currentLocale(): string {
        return (this.$i18n as IVueI18n).locale
    }

    public get ingredientsList(): string[] {
        return (this.recipeData.translations[this.currentLocale] || {}).ingredients ?? []
    }

    public get stepsList(): string[] {
        return (this.recipeData.translations[this.currentLocale] || {}).steps ?? []
    }

    public get productList(): IRecipeInnerProduct[] {
        return this.recipeData.products ?? []
    }

    public get video(): string {
        return this.recipeData.video ?? ''
    }
 
    public get images(): string[] {
        return this.recipeData?.images ?? []
    }

    public get breadcrumbs(): IBreadcrumb[] {
        return [
            {
                key: this.$t('breadcrumbs.recipes').toString(),
                title: this.$t('breadcrumbs.recipes').toString(),
                link: this.localePath({ name: 'recipes' }),
            },
            {
                key: this.$route.params.pathMatch,
                title: (this.recipeData.translations[this.currentLocale] || {})?.name,
                link: '/'
            }
        ]
    }

    public downloadRecipeHandler(): void {
        const props = {
        message: this.$t('recipes_inner_page.presentation_generating').toString(),
        }

        this.$modal.show(ModalInfoLoader, props, {
            ...CONFIRMATION_MODAL_CONFIG,
            name: this.generateModalName,
        })

        this.downloadRecipe(this.recipeData.id)
    }

    public showPresentationNotifications(): void {
        if (this.generatingStatus === EStatus.SUCCESS) {
        this.$notify({
            type: EMessageTypes.SUCCESS,
            text: this.$t('recipes_inner_page.presentation_success').toString(),
        })
        } else if (this.generatingStatus === EStatus.ERROR) {
        this.$notify({
            type: EMessageTypes.DANGER,
            text: this.$t('recipes_inner_page.presentation_error').toString(),
        })
        }
    }

    public async asyncData({ store, error, params }: any): Promise<any> {
        try {
            const paramsId: number = +params.id
            await store.dispatch('page-recipe-inner/fetchRecipeInner', paramsId)
            
            const status: EStatus = store.getters['page-recipe-inner/status']

            if(status === EStatus.ERROR) {
                const err: any = store.getters['page-recipe-inner/error']
                throw err
            }
        } catch(e: any) {
            error(e)
        }
    }
}
</script>

<style lang="scss" scoped>
    .page {
        &__wrapper--recipes-inner {
            padding-top: 44px;
            padding-bottom: 100px;
            @include media-lg {
                padding-top: 60px;
                padding-bottom: 88px;
            }
        }
    }

    .recipes-inner {
        $calcWidth: calc(50% - 12px);
        &-column {
            &:first-child {
                margin-bottom: $space-48;
            }
        }
        &__header {
            margin-bottom: $space-48;
        }
        &__ingredients {
            margin-bottom: $space-56;
        }
        @include media-lg {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(#{$calcWidth}, 1fr));
            grid-gap: $space-24;
        }
    }
</style>