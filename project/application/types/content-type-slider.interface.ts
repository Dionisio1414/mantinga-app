export interface ISlideProperties {
    alt: {
        value: string | null;
    },
    image: {
        url: string | null;
    },
    image_mobile?: {
        url?: string | null;
    },
    new_tab: {
        value: boolean;
    },
    url: {
        value: string | null;
    },
    'youtube-thumbnail': [],
    'youtube-thumbnail-alt': {
        value: string | null;
    },
    youtube_url?: {
        value?: string;
    },
    text_one: {
        value: string;
    },
    text_two: {
        value: string;
    }
}

export interface IContentTypeSliderProperties {
    image_blocks: {
        value: ISlideProperties[]
    },
    autoplay_speed?: {
        value: string;
    }
}