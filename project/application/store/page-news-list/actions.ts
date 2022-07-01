import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IArticleGetParams } from '~/types/articles.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async fetchNewsByType({ commit }, params?: IArticleGetParams): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchNewsByTypeInit')
        try {
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/new-api/articles`,
                { params }
            );
            commit('fetchNewsByTypeSuccess', data);
            commit('setCurrentType', params?.type);
            commit('setItemsPerPage', params?.itemsPerPage)
        } catch (e) {
            commit('fetchNewsByTypeError', httpErrorSerializer(e))
        }
    },
    async loadMore({ commit, state }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        
        const nextPage = state.pagination.page + 1;
        const params: IArticleGetParams = {
            page: nextPage,
            type: state.currentType,
            'order[date]': 'desc',
            'order[id]': 'desc',
            itemsPerPage: state.pagination.itemsPerPage,
            'date[before]': this.app.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };

        commit('loadMoreInit')
        try {
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/new-api/articles`,
                { params }
            );
            commit('loadMoreSuccess', data);
        } catch (e) {
            commit('loadMoreError', httpErrorSerializer(e))
        }
    }
} as ActionTree<IState, IRootState>;
