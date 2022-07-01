import { IProductCard } from '~/types/product.interface';
export interface IContentTypeLatestProductProperties {
    button_text?: {
        value: string;
    },
    button_url?: {
        value: string;
    },
    products?: {
        value: IProductCard[]
    },
    second_title?: {
        value: string;
    },
    title?: {
        value: string;
    }

}