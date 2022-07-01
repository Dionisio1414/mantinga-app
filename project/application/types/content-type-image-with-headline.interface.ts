export interface IContentTypeImageWithHeadlineProperties {
    desktop_image: {
        url: string;
    },
    mobile_image: {
        url: string;
    },
    new_tab: {
        value: boolean
    },
    title: {
        value: string;
    },
    url: {
        value: string
    }
}

export interface IContentTypeImageWithHeadline {
    code: string;
    properties: IContentTypeImageWithHeadlineProperties;
}