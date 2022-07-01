import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { ISearchResult } from '~/types/search.interface';

import { IState } from './state';

export default {
    searchInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
        state.result = null;
    },
    searchSuccess: (state, result: ISearchResult) => {
        state.result = result;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    searchError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    updateSearchStr: (state, searchStr: string) => {
        state.searchStr = searchStr
    }
} as MutationTree<IState>;
