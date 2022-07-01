import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    recipesTimes: state => {
        return state.recipeTimes;
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    }
} as GetterTree<IState, IRootState>;
