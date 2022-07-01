import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    productsList: (state) => {
        return state.productsList
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    form: state => {
        return state.form;
    },
    message: state => {
        return state.message
    },
    generatingStatus: state => {
        return state.generatingStatus
    },
} as GetterTree<IState, IRootState>;
