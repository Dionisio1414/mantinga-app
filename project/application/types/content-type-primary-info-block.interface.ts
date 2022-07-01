export interface IPrimaryInfoBlockItem {
    button_new_tab: {
        value: boolean;
    },
    button_text: {
        value: string;
    },
    button_url: {
        value: string;
    },
    cover_image: {
        value: boolean;
    },
    image: {
        url: string;
    },
    'image-alt': {
        value: string;
    },
    text: {
        value: string;
    },
    title: {
        value: string;
    }
}

export interface IPrimaryInfoBlockProperties {
    blocks: {
        value: IPrimaryInfoBlockItem[]
    },
    columns: {
        value: string;
    }
}

export interface IContentTypeSliderProperties {
    image_blocks: {
        value: IPrimaryInfoBlockProperties[]
    }
}