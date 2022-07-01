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

export interface IContentTypeCardsEntity {
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

export interface IContentTypeCardsProperties {
    blocks: {
        value: IContentTypeCardsEntity[];
    }
}

export interface IContentTypeCards {
    code: string;
    properties: IContentTypeCardsProperties;
}