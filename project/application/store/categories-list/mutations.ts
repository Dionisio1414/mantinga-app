import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { ITaxonResponse } from '~/types/taxons';

import { IState } from './state';

export default {
    fetchCategoriesInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchCategoriesSuccess: (state, { items }: ITaxonResponse) => {
        state.taxons = items;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchCategoriesError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;
