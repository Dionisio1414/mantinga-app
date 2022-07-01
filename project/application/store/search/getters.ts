import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IProductSearchItem } from '~/types/search.interface';

export default {
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    result: state => {
        return state.result
    },
    resultForLayout: (state, _, rootState) => {
        const locale = rootState.locale.currentLocale || 'lt';
        
        const returnedObj = {
            products: state.result?.products?.products.map((p: IProductSearchItem) => {
                return {
                    name: p.name,
                    image: p.image,
                    id: p.id,
                    slug: p.slug,
                }
            }) || [],
            articles: state.result?.articles?.articles.map(a => {
                return {
                    name: a.translations[locale]?.name,
                    slug: a.translations[locale]?.slug,
                    id: a.id,
                    image: a.image,
                }
            }) || [],
            recipes: state.result?.recipes?.recipes.map(r => {
                return {
                    name: r.translations[locale]?.name,
                    slug: r.translations[locale]?.slug,
                    id: r.id,
                    image: r.images[0]?.url || '',
                }
            }) || [],
        }

        if (returnedObj.articles.length > 3) {
            returnedObj.articles = returnedObj.articles.slice(0, 3)
        }

        if (returnedObj?.recipes.length > 3) {
            returnedObj.recipes = returnedObj.recipes.slice(0, 3)
        }

        return returnedObj
    },
    searchStr: state => {
        return state.searchStr
    }
} as GetterTree<IState, IRootState>;
