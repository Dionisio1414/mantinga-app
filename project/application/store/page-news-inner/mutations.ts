import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IArticle } from '~/types/articles.interface';

import { IState } from './state';

export default {
    fetchNewsByIdInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchNewsByIdSuccess: (state, data: IArticle) => {
        state.data = data;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchNewsByIdError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;
