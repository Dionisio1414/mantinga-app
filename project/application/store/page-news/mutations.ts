import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IArticleResponse } from '~/types/articles.interface';
import { IContentTypeResponse } from '~/types/content-type.interface';

import { IState } from './state';

export default {
    fetchLatestProductNewsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchLatestProductNewsSuccess: (state, data: IArticleResponse) => {
        state.productNews = data['hydra:member'];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchLatestProductNewsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchLatestCompanyNewsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchLatestCompanyNewsSuccess: (state, data: IArticleResponse) => {
        state.companyNews = data['hydra:member'];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchLatestCompanyNewsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchNewsPageInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchNewsPageSuccess: (state, { translations }: IContentTypeResponse) => {
        state.contentTypes = translations;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchNewsPageError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;
