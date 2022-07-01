import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IProduct, ISimilarProductsResponse } from '~/types/product.interface';
import { IRecipeResponse } from '~/types/recipes.interface';

import { IState } from './state';

export default {
    fetchProductInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING;
        state.product = null
    },
    fetchProductSuccess: (state, data: IProduct) => {
        state.product = data;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProductError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchSimilarProductsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchSimilarProductsSuccess: (state, payload: ISimilarProductsResponse) => {
        state.similarProducts = payload?.products?.products || [];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchSimilarProductsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchRecipesInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchRecipesSuccess: (state, payload: IRecipeResponse) => {
        state.recipes = payload['hydra:member'];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchRecipesError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    downloadImagesZipInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    downloadImagesZipSuccess: (state) => {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    downloadImagesZipError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    downloadPresentationInit: (state) => {
        state.generatingStatus = EStatus.PROCESSING
    },
    downloadPresentationSuccess: (state) => {
        state.generatingStatus = EStatus.SUCCESS;
    },
    downloadPresentationError: (state) => {
        state.generatingStatus = EStatus.ERROR
    },
} as MutationTree<IState>;
