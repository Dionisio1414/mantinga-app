export interface IContentTypeImageTitle {
    code: string;
    properties: any;
}

export interface IContentTypeImageTitleProperties {
    alt: {
        value?: string;
    };
    image: {
        url: string;
    };
    text: {
        value: string;
    };
    title: {
        value: string
    }
}