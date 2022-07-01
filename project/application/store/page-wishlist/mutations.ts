import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';
import { IManagerProduct, IManagerProductsResponse } from '~/types/manager-products.interface';

import { IState } from './state';

export default {
    fetchProductsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
        state.productsList = [];
    },
    fetchProductsSuccess: (state, data: IManagerProductsResponse) => {
        state.productsList = data?.products?.products || []
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProductsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    productInquiryInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    productInquirySuccess: (state, { result }: { result: string }) => {
        state.status = EStatus.SUCCESS;
        state.error = null;
        state.message = result;
    },
    productInquiryError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload?.response?.data;
    },
    clearForm: (state) => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            email: '',
            name: '',
            phone: '',
            message: '',
            consent: 1,
            locale: 'lt',
            isShoppingCart: true
        }
    },
    updateProductsList: (state, productId: number) => {
        state.productsList = state.productsList.filter((p: IManagerProduct) => p.id !== productId);
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
    ...mixinFormMapperMutations()
} as MutationTree<IState>;
