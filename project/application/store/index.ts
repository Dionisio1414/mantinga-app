
export const actions = {
    nuxtServerInit({ dispatch }: any) {
        // Do not remove this line. If undefined API url will be
        // passed to request, the app will send a request to itself
        // and fall into endless loop
        // if (app.$config.apiURL === undefined) {
        //     throw new Error('API URL is undefined');
        // }
        dispatch('auth/setTokenFromCookie');
        dispatch('favourite-products/setFavouritesProductsFromCookie');
    },
    nuxtClientInit({ dispatch, rootGetters }: any) {
        const requestsList = [
            dispatch(`browser-support/checkSupport`),
            dispatch('locale/checkUserLocale'),
            dispatch('menu/fetchMenuList'),
            dispatch('categories-list/fetchCategories')
        ]

        if(rootGetters['auth/isAuthorized']) {
            requestsList.push(dispatch('user-info/fetchUserInfo'));
        }

        Promise.all(requestsList)
    }
}