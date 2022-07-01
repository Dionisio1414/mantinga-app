import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IContentTypeResponse } from '~/types/content-type.interface';

import { IState } from './state';

export default {
    fetchsPageRecipesInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchsPageRecipesSuccess: (state, { translations }: IContentTypeResponse) => {
        state.contentTypes = translations;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchsPageRecipesError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;
