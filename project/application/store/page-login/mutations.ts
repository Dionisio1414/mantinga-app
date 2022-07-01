import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';

import { IState } from './state';

export default {
    loginInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    loginSuccess: (state) => {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    loginError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    clearForm: (state) => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            email: '',
            password: ''
        }
    },
    ...mixinFormMapperMutations()
} as MutationTree<IState>;
