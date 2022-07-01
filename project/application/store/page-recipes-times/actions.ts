import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IRecipeTimesGetParams } from '~/types/recipes.interface';

export default {
    async fetchRecipeTimes({ commit }, params: IRecipeTimesGetParams = {}): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchRecipeTimes')
        try {
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/new-api/recipe-times`,
                {
                    params: { ...params }
                }
            )

            commit('fetchRecipeTimesSuccess', data)
        } catch(e: any) {
            commit('fetchRecipeTimesError', httpErrorSerializer(e))
        }
    }
} as ActionTree<IState, IRootState>;
