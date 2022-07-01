import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import {
  mixinFormMapperMutations,
  mixinFormMapperMutationUpdateForm,
  mixinFormMapperMutationSetForm
} from '~/store-utils/form-mapper-mixins';
import { IManagerProductsResponse } from '~/types/manager-products.interface';
import { IProduct } from '~/types/product.interface';

import { IState } from './state';

export default {
    fetchProductsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchProductsSuccess: (state, data: IManagerProductsResponse) => {
        state.products = data?.products?.products || [];
        state.filters = data?.['man-filters']
        state.form.page = data?.products?.page;
        state.pagination = {
            totalItems: data.products?.totalItems,
            page: data.products?.page,
            pages: data.products?.pages,
            limitPerPage: data.products?.limitPerPage
        }
        state.categories = data.taxons
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
    clearFilters: (state) => {
        state.form = {
            name: '',
            code: '',
            status: undefined,
            product_taxons: '',
            locale_codes: undefined
        }
    },
    clearSearch: (state) => {
        state.form.name = ''
    },
    toggleAllProducts: (state, payload: boolean) => {
        state.isSelectedAll = payload;
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
    ...mixinFormMapperMutations(),
    ...mixinFormMapperMutationUpdateForm(),
    ...mixinFormMapperMutationSetForm()
} as MutationTree<IState>;
