import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';

import { IState } from './state';

export default {
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
            'products[]': null,
            locale: 'lt',
            isShoppingCart: false
        }
    },
    ...mixinFormMapperMutations()
} as MutationTree<IState>;
