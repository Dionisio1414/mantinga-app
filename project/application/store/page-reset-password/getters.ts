import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    form: state => {
        return state.form;
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    token: state => {
        return state.token
    }
} as GetterTree<IState, IRootState>;
