export interface IContentCardBadge {
    title: {
        value: string;
    }
}

export interface IContentCardButton {
    button_image: {
        url: string
    };
    button_style: {
        value: string;
    };
    button_title: {
        value: string;
    };
    button_url: {
        value: string;
    };
    open_in_new_tab: {
        value: boolean;
    }
}

export interface IContentCardMediaBlock {
    image: {
        url: string;
    };
    'image-alt': {
        value: string;
    }
}

export interface IContentCardMainImage {
    alt: {
        value: string;
    };
    image: {
        url: string;
    };
    image_style: {
        value: string;
    }
}

export interface IContentTypeContentCardProperties {
    background_color: {
        value: string;
    };
    background_fullscreen: {
        value: boolean;
    };
    badges: {
        value: IContentCardBadge[]
    };
    buttons: {
        value: IContentCardButton[]
    };
    date: {
        value: string;
    };
    images: {
        value: IContentCardMainImage[];
    };
    main_title: {
        value: string;
    };
    media_block: {
        value: IContentCardMediaBlock[]
    };
    media_left: {
        value: boolean;
    };
    subtitle: {
        value: string;
    };
    text: {
        value: string;
    };
    'youtube-thumbnail': {
        url: string;
    };
    'youtube-thumbnail-alt': {
        value: string;
    };
    youtube_url: {
        value: string;
    }
}

export interface IContentTypeContentCard {
    code: string;
    properties: IContentTypeContentCardProperties
}