import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    news: state => {
        return state.news
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    currentType: state => {
        return state.currentType
    },
    pagination: state => {
        return state.pagination
    }
} as GetterTree<IState, IRootState>;
