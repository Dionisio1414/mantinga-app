<template>
    <form
        class="modal-recipes-form"
        @submit.prevent="submitForm"
    >
        <div class="modal-recipes-form__fields">
            <div class="modal-recipes-form__fields-item">
                <Multiselect
                    :value="form['category.id']"
                    class="form-select"
                    :searchable="false"
                    :disabled="isProcessing"
                    :placeholder="$sanitize($t('recipes_page.placeholders.category'))"
                    :options="categoriesOptions"
                    :custom-label="customLabelCategories"
                    :maxHeight="maxHeightDropdown"
                    @input="selectHandler($event, 'category.id')"
                >
                </Multiselect>
            </div>
            <div class="modal-recipes-form__fields-item">
                <Multiselect
                    :value="form['cookingTime']"
                    id="cooking_time"
                    class="form-select"
                    :searchable="false"
                    :disabled="isProcessing"
                    :placeholder="$sanitize($t('recipes_page.placeholders.cooking_time'))"
                    :options="cookingTimeOptions"
                    :custom-label="customLabelCookingTime"
                    :maxHeight="maxHeightDropdown"
                    @input="selectHandler($event, 'cookingTime')"
                >
                </Multiselect>
            </div>
            <div class="modal-recipes-form__fields-item">
                <Multiselect
                    :value="form['products.id']"
                    id="ingredients"
                    class="form-select"
                    :searchable="true"
                    :disabled="isProcessing"
                    :placeholder="$sanitize($t('recipes_page.placeholders.ingridients'))"
                    :options="productsOptions"
                    :custom-label="customLabelProducts"
                    :maxHeight="maxHeightDropdown"
                    @input="selectHandler($event, 'products.id')"
                >
                </Multiselect>
            </div>
        </div>
        <div class="modal-recipes-form__actions">
            <button
                type="button"
                class="modal-recipes-form__actions-btn btn btn--white-with-border"
                @click.prevent="clearForm"
            >
                <span
                    class="btn-title"
                    v-html="$sanitize($t('recipes_page.button_clear_filter_text'))"
                />

                <svg-icon name="delete" width="24" height="24" />
            </button>
            <button
                type="submit"
                class="modal-recipes-form__actions-btn btn btn--alternative"
            >
                <span
                    class="btn-title"
                    v-html="$sanitize($t('recipes_page.button_fitered_text'))"
                />

                <svg-icon name="filter" width="24" height="24" />
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import { Vue, Component, Emit, InjectReactive, Inject } from 'nuxt-property-decorator'
import Multiselect from 'vue-multiselect'
import { EStatus } from '~/constants/status';
import { TOKEN_MODAL_RECIPES_FILTER_CATEGORIES, TOKEN_MODAL_RECIPES_FILTER_COOKING_TIME, TOKEN_MODAL_RECIPES_FILTER_PRODUCTS, TOKEN_MODAL_RECIPES_FILTER_STATUS } from '~/constants/tokens/modal-recipes-filter'
import { IRecipesMultiselectList } from '~/types/recipes.interface';
import storeFormMapper from '~/utils/store-form-mapper';

@Component({
    components: { Multiselect }
})
export default class ComponentModalRecipesFilterForm extends Vue {
    @InjectReactive(TOKEN_MODAL_RECIPES_FILTER_CATEGORIES) public categoriesList!: IRecipesMultiselectList[]
    @InjectReactive(TOKEN_MODAL_RECIPES_FILTER_PRODUCTS) public productsList!: IRecipesMultiselectList[]
    @InjectReactive(TOKEN_MODAL_RECIPES_FILTER_STATUS) public isProcessing!: EStatus
    @Inject(TOKEN_MODAL_RECIPES_FILTER_COOKING_TIME) public cookingTimesList!: IRecipesMultiselectList[]

    public $t: any;
    public maxHeightDropdown: number = 150

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

    public selectHandler(value: number, field: string): void {
        if(value === -1) this.form[field] = null
        else this.form[field] = value
    }

    @Emit('clearForm')
    public clearForm(): void {}

    @Emit('submitForm')
    public submitForm(): void {}

    public get categoriesOptions(): number[] {
        return (this.categoriesList || []).map(item => item.id);
    }

    public get productsOptions(): number[] {
        return (this.productsList || []).map(item => item.id);
    }

    public get cookingTimeOptions(): Array<number | string> {
        return (this.cookingTimesList || []).map(item => item.id);
    }

    public customLabelCategories(id: number): string {
        const option = this.categoriesList.find(option => option.id === id);
        return option?.title || '';
    }

    public customLabelProducts(id: number): string {
        const option = this.productsList.find(option => option.id === id);
        return option?.title || '';
    }

    public customLabelCookingTime(id: string | number): string {
        const option = this.cookingTimesList.find(option => option.id === id);
        return option?.title ?? '';
    }
}
</script>

<style lang="scss" scoped>
    .modal-recipes-form {
        &__fields {
            margin-bottom: 32px;
            &-item:not(:last-child) {
                margin-bottom: 24px;
            }
        }
        &__actions {
            display: flex;
            justify-content: center;
            &-btn:not(:last-child) {
                margin-right: 24px;
            }
            .btn-title {
                line-height: 1;
            }
        }
    }
</style>
