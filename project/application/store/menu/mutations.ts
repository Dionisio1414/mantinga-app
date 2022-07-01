import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IMenuResponse } from '~/types/menu.interface';

import { IState } from './state';

import { MENU } from '~/constants/menu';

export default {
    FETCH_MENU: (state,) => {
        state.error = null;
        state.status = EStatus.PROCESSING;
    },
    FETCH_MENU_SUCCESS: (state, { items }: IMenuResponse) => {
        state.header_menu = items.find(e => e.code === MENU.HEADER_NAV) || {}
        state.footer_nav = items.find(e => e.code === MENU.FOOTER_NAV) || {}
        state.footer_products = items.find(e => e.code === MENU.FOOTER_PRODUCTS) || {}
        state.footer_socials = items.find(e => e.code === MENU.FOOTER_SOCIALS) || {}
        state.header_socials = items.find(e => e.code === MENU.HEADER_SOCIALS) || {}

        state.error = null;
        state.status = EStatus.SUCCESS;
    },
    FETCH_MENU_ERROR: (state, error: Error) => {
        state.error = error;
        state.status = EStatus.ERROR
    },
} as MutationTree<IState>;
