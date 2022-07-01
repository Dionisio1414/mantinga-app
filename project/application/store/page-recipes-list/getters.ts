import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    recipesList: state => {
        return state.recipes;
    },
    recipeItems: state => {
        return state.recipesItems;
    },
    recipesPagination: state => {
        return state.pagination;
    },
    recipesForm: state => {
        return state.form;
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    }
} as GetterTree<IState, IRootState>;
