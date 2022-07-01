export interface IImageBlockProperties {
    image: {
        url: string;
    };
    'image-alt': {
        value: string;
    }
}

export interface IImageBlock {
    code: string;
    properties: IImageBlockProperties;
}