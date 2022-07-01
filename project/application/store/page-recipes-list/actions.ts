import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IRecipeGetParams, IRecipesPayloadPaginate, IRecipeTimes } from '~/types/recipes.interface';
import { mixinFormMapperUpdateForm } from '~/store-utils/form-mapper-mixins';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { default as serializerCookingtimeParams } from '~/utils/serializer-cookingtime-params'

export default {
    async fetchRecipes({ commit, state, getters, rootGetters }, { params, paginate = false }: IRecipesPayloadPaginate ): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const cookingTimeID: string = getters['recipesForm']['cookingTime']
        const cookingTimeValues: IRecipeTimes[] = rootGetters['page-recipes-times/recipesTimes'];

        commit('fetchRecipesInit')
        try {
            let paramsObject: IRecipeGetParams = serializerCookingtimeParams(cookingTimeID, params as IRecipeGetParams, cookingTimeValues)   
            
            if(paginate) {
                const nextPage: number = state.pagination.page + 1
                paramsObject = { ...paramsObject, page: String(nextPage) }
            } 

            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/recipes`,
                {
                    params: { ...paramsObject }
                }
            )

            if(paginate) {
                commit('fetchRecipesPaginate', data)
            } else {
                commit('fetchRecipesSuccess', data)
            }

        } catch(e: any) {
            commit('fetchRecipesError', httpErrorSerializer(e))
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperUpdateForm(),
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;
