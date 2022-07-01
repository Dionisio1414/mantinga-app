import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IRecipe, IRecipeResponse } from '~/types/recipes.interface';

import { IState } from './state';
import { mixinFormMapperMutationUpdateForm } from '~/store-utils/form-mapper-mixins';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';

export default {
    fetchRecipesInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchRecipesSuccess: (state, data: IRecipeResponse) => {
        state.status = EStatus.SUCCESS;
        state.recipes = data['hydra:member'];
        state.recipesItems = data['hydra:totalItems'];
        state.pagination.page = 1;
        state.error = null;
    },
    fetchRecipesPaginate(state, data: IRecipeResponse) {
        state.recipes = [ ...state.recipes as IRecipe[], ...data['hydra:member'] ];
        state.recipesItems = data['hydra:totalItems'];
        state.pagination.page++;

        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchRecipesError: (state, payload: Error) => {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    clearForm: state => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            'category.id': null,
            'products.id': null,
            'order[date]': 'desc',
            'cookingTimeMinutes[lt]': null,
            'cookingTimeMinutes[between]': null,
            'cookingTimeMinutes[gt]': null,
            'cookingTimeMinutes[gte]': null,
            'cookingTimeMinutes[lte]': null
        }
    },
    ...mixinFormMapperMutationUpdateForm(),
    ...mixinFormMapperMutations()
} as MutationTree<IState>;
