import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IContentTypeResponse } from '~/types/content-type.interface';

import { IState } from './state';

export default {
    fetchPageInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
        state.pageTranslations = null;
    },
    fetchPageSuccess: (state, { translations, code }: IContentTypeResponse) => {
        state.pageCode = code
        state.pageTranslations = translations;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchPageError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },

} as MutationTree<IState>;
