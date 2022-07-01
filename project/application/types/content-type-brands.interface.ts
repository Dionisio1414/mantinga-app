export interface IBrandImg {
    id: number;
    path: string;
}
export interface IBrandProperties {
    code: string;
    id: number;
    images: IBrandImg[],
    name: string;
    parentName: []
}
export interface IContentTypeBrandsProperties {
    brands: {
        value: IBrandProperties[]
    },
    button_text?: {
        value: string;
    },
    button_url?: {
        value: string;
    },
    second_title?: {
        value: string;
    },
    title: {
        value: string;
    }
}