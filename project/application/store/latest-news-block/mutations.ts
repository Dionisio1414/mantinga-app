import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IArticleResponse } from '~/types/articles.interface';

import { IState } from './state';

export default {
    fetchLatestNewsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchLatestNewsSuccess: (state, data: IArticleResponse) => {
        state.data = data['hydra:member'];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchLatestNewsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },

} as MutationTree<IState>;
