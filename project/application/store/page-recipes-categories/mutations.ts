import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';

import { IState } from './state';

export default {
    fetchRecipeCategories: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchRecipeCategoriesSuccess: (state, data) => {
        state.status = EStatus.SUCCESS;
        state.recipeCategories = data['hydra:member'];
        state.error = null;
    },
    fetchRecipeCategoriesError: (state, payload: Error) => {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
