import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default {
    async fetchRecipeCategories({ commit }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchRecipeCategories')
        try {
            const { data } = await $axios.get(`${this.app.$config.apiURL}/new-api/recipe-categories`)

            commit('fetchRecipeCategoriesSuccess', data)
        } catch(e: any) {
            commit('fetchRecipeCategoriesError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;
