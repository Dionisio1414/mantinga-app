export interface IProductInquiryRequest {
    name: string;
    phone: string;
    email: string;
    message: string;
    consent: 0 | 1;
    'products[]'?: number[] | null;
    locale: string;
    isShoppingCart?: boolean;
}