export interface ICardButton {
    new_tab: {
        value: boolean;
    };
    text: {
        value: string;
    };
    url: {
        value: string
    }
}

export interface IContentTypeCardListEntity {
    buttons: {
        value: ICardButton[]
    };
    cover_image: {
        value: boolean;
    };
    image: {
        url: string;
    };
    'image-alt': {
        value: string;
    };
    text: {
        value: string;
    };
    title: {
        value: string;
    }
}

export interface IContentTypeCardListProperties {
    Title: {
        value: string;
    };
    blocks: {
        value: IContentTypeCardListEntity[];
    }
}

export interface IContentTypeCardList {
    code: string;
    properties: IContentTypeCardListProperties;
}