import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations, mixinFormMapperMutationUpdateForm } from '~/store-utils/form-mapper-mixins';
import { IProduct } from '~/types/product.interface';

import { IState } from './state';

export default {
    fetchProductsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchProductsSuccess: (state, data: any) => {
        state.products = data?.products?.products || [];
        state.form.page = data?.products?.page || 1;
        state.pagination = {
            totalItems: data?.products?.totalItems,
            page: data?.products?.page,
            pages: data?.products?.pages,
            limitPerPage: data?.products?.limitPerPage
        }
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProductsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchProductByIdInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
        state.product = null
    },
    fetchProductByIdSuccess: (state, data: IProduct) => {
        state.product = data;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProductByIdError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    toggleAllProducts: (state, payload: boolean) => {
        state.isSelectedAll = payload;
    },
    ...mixinFormMapperMutations(),
    ...mixinFormMapperMutationUpdateForm(),
} as MutationTree<IState>;
