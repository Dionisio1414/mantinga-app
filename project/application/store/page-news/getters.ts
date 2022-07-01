import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IMetaInfo } from '~/types/meta.interface';

export default {
    productNews: (state) => {
        return state.productNews;
    },
    companyNews: (state) => {
        return state.companyNews;
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    metaInfo: (state, _, rootState) => {
        const locale = rootState.locale.currentLocale || 'lt';
        const translatedPage = state.contentTypes[locale];
        const metaInfo: IMetaInfo = {
            title: translatedPage?.title || '',
            metaDescription: translatedPage?.metaDescription || '',
            metaKeywords: translatedPage?.metaKeywords || ''
        } 
        
        return metaInfo
    }
} as GetterTree<IState, IRootState>;
