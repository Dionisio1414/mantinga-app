export interface IHeroPrimaryBlockButton {
    new_tab: {
        value: boolean;
    };
    text: {
        value: string;
    };
    url: {
        value: string;
    }
}

export interface IHeroPrimaryBlockProperties {
    alt: {
        value: string;
    };
    button_blocks: {
        value: IHeroPrimaryBlockButton[];
    };
    image: {
        url: string;
    };
    text: {
        value: string;
    },
    title: {
        value: string;
    }
}


export interface IHeroPrimaryBlock {
    code: string;
    properties: IHeroPrimaryBlockProperties;
}

