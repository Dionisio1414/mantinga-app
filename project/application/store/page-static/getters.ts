import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IMetaInfo } from '~/types/meta.interface';

export default {
    contentTypes: (state, _, rootState) => {
        const locale = rootState.locale.currentLocale || 'lt';

        return state.pageTranslations?.[locale]?.contentType || [];
    },
    pageName: (state, _, rootState ) => {
        const locale = rootState.locale.currentLocale || 'lt';

        return state.pageTranslations?.[locale]?.name || '';
    },
    pageCode: (state) => {
        return state.pageCode
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    metaInfo: (state, _, rootState) => {
        const locale = rootState.locale.currentLocale || 'lt';
        const translatedPage = state.pageTranslations?.[locale];
        const metaInfo: IMetaInfo = {
            title: translatedPage?.title || '',
            metaDescription: translatedPage?.metaDescription || '',
            metaKeywords: translatedPage?.metaKeywords || ''
        } 
        
        return metaInfo
    },
    pageTranslations: (state) => {
        return state.pageTranslations
    }
} as GetterTree<IState, IRootState>;
