import { Middleware } from '@nuxt/types';

const authGuestOnlyMiddleware: Middleware = ({ redirect, store, app }) => {
    const isAuthorized = store.getters['auth/isAuthorized'];
    if (isAuthorized) {
        return redirect(app.localePath({ name: 'index' }));
    }
}

export default authGuestOnlyMiddleware