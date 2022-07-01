import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    headerMenu: (state) => {
        return state.header_menu;
    },
    headerSocials: (state) => {
        return state.header_socials
    },
    footerNav: (state) => {
        return state.footer_nav;
    },
    footerProducts: (state) => {
        return state.footer_products;
    },
    footerSocials: (state) => {
        return state.footer_socials
    }
} as GetterTree<IState, IRootState>;
