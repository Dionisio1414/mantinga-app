import { IDictionary } from "./dictionary.interface";
export interface IMenuLink {
    html: null | string;
    id: number;
    locale: string;
    title: string;
    url: string;
}

export interface IMenuLinkImage {
    id: number;
    path: string;
    url: string;
    title: string;
}

export interface IMenuPage {
    name: string;
    slug: string;
}
export interface IMenuEntity {
    children: [];
    id: number;
    images: IMenuLinkImage[];
    level: number;
    openInNewTab: boolean;
    page: {
        code: number;
        id: number;
        translations: IDictionary<IMenuPage>
    };
    position: number;
    taxon: string | null;
    translations: IDictionary<IMenuLink>,
    type: string;
}


export interface IMenuItem {
    code: string;
    id: number;
    items: IMenuEntity[],
    showMenu: string;
    type: string;
}

export interface IMenuResponse {
    items: IMenuItem[];
}


