import { EStatus } from "~/constants/status";
import { IMenuItem } from "~/types/menu.interface";
export interface IState {
    error: Error | null;
    status: EStatus;
    header_menu: IMenuItem | {};
    footer_nav: IMenuItem | {};
    footer_products: IMenuItem | {};
    footer_socials: IMenuItem | {};
    header_socials: IMenuItem | {};
}

export default (): IState => {
    return {
        error: null,
        status: EStatus.INIT,
        header_menu: {},
        footer_nav: {},
        footer_products: {},
        footer_socials: {},
        header_socials: {}
    };
}
