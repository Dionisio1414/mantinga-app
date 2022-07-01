import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';

import { IState } from './state';

export default {
    sendEmailInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    sendEmailSuccess: (state) => {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    sendEmailError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    clearForm: (state) => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            email: '',
        }
    },
    ...mixinFormMapperMutations()
} as MutationTree<IState>;
