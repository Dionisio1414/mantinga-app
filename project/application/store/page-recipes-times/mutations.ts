import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';

import { IState } from './state';

export default {
    fetchRecipeTimes: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchRecipeTimesSuccess: (state, data) => {
        state.status = EStatus.SUCCESS;
        state.recipeTimes = data['hydra:member'];
        state.error = null;
    },
    fetchRecipeTimesError: (state, payload: Error) => {
        state.status = EStatus.ERROR;
        state.error = payload;
    }
} as MutationTree<IState>;
