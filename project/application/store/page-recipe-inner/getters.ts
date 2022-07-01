import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    recipeData: state => {
        return state.recipeData;
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    generatingStatus: state => {
        return state.generatingStatus
    }
} as GetterTree<IState, IRootState>;
