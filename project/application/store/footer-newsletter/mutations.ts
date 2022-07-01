import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';

import { IState } from './state';

export default {
    subscribeToNewsletterInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    subscribeToNewsletterSuccess: (state, payload: { message: string }) => {
        state.status = EStatus.SUCCESS;
        state.error = null;
        state.message = payload.message
    },
    subscribeToNewsletterError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload?.response?.data;
    },
    clearForm: (state) => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            email: ''
        }
    },
    ...mixinFormMapperMutations()
} as MutationTree<IState>;
