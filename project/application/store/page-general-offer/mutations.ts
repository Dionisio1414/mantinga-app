import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';
import { IOfferResponse } from '~/types/job.interface';

import { IState } from './state';

export default {
    fetchOfferInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchOfferSuccess: (state, data: IOfferResponse) => {
        state.offer = data;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchOfferError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    sendJobInquiryInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    sendJobInquirySuccess: (state, { result }: { result: string }) => {
        state.message = result || '';
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    sendJobInquiryError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    clearForm: (state) => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            email: '',
            name: '',
            phone: '',
            message: '',
            locale: '',
            file: null
        }
    },

    ...mixinFormMapperMutations()
} as MutationTree<IState>;
