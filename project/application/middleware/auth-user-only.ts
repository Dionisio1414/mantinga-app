import { Middleware } from '@nuxt/types';

const authUserOnlyMiddleware: Middleware = function ({ redirect, store, app }) {
    const isAuthorized = store.getters['auth/isAuthorized'];

    if (!isAuthorized) {
        return redirect(app.localePath({ name: 'login' }));
    }
}

export default authUserOnlyMiddleware
