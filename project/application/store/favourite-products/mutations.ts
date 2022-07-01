import { MutationTree } from 'vuex';

import { IState } from './state';

export default {
    setFavouritesProductsFromCookie: (state, payload) => {
        const result = [];
        for (const key in payload) {
            if (payload[key]) {
                result.push(payload[key])
            }
        }
        state.favouriteProducts = result;
    },
} as MutationTree<IState>;
