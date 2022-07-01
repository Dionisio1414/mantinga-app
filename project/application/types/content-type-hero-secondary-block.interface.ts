export interface IHeroSecondaryBlockProperties {
    alt: {
        value: string;
    };
    image: {
        url: string;
    };
    text: {
        value: string;
    },
    title: {
        value: string
    }
}

export interface IHeroSecondaryBlock {
    code: string;
    properties: IHeroSecondaryBlockProperties;
}