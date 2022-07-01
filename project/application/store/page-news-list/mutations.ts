import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IArticleResponse } from '~/types/articles.interface';

import { IState } from './state';

export default {
    fetchNewsByTypeInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING;
        state.currentType = null;
        state.pagination.totalItems = 0;
    },
    fetchNewsByTypeSuccess: (state, data: IArticleResponse) => {
        state.news = data['hydra:member'];

        state.pagination.totalItems = data['hydra:totalItems'];
        state.pagination.page = 1;

        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchNewsByTypeError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
        state.currentType = null;
    },
    loadMoreInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING;
        state.pagination.totalItems = 0;
    },
    loadMoreSuccess: (state, data: IArticleResponse) => {
        state.news.push(...data['hydra:member'])

        state.pagination.totalItems = data['hydra:totalItems'];
        state.pagination.page++;

        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    loadMoreError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    setCurrentType: (state, payload: string) => {
        state.currentType = payload;
    },
    setItemsPerPage: (state, payload: number) => {
        state.pagination.itemsPerPage = payload;
    }
} as MutationTree<IState>;
