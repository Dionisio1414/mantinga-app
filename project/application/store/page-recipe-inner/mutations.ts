import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IRecipeResponse } from '~/types/recipes.interface';

import { IState } from './state';

export default {
    fetchRecipeInnerInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchRecipeInnerSuccess: (state, { "@context":context, ...rest }) => {
        state.status = EStatus.SUCCESS;
        state.recipeData = rest; 
        state.error = null;
    },
    fetchRecipeInnerError: (state, payload: Error) => {
        state.status = EStatus.ERROR;
        state.error = payload;
    },
    downloadRecipeInit: (state) => {
        state.generatingStatus = EStatus.PROCESSING
    },
    downloadRecipeSuccess: (state) => {
        state.generatingStatus = EStatus.SUCCESS;
    },
    downloadRecipeError: (state) => {
        state.generatingStatus = EStatus.ERROR
    },
} as MutationTree<IState>;
