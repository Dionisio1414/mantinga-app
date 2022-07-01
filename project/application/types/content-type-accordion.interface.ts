export interface IContentTypeAccordionItem {
    text: {
        value: string;
    },
    title: {
        value: string;
    }
}

export interface IContentTypeAccordionProperties {
    blocks: {
        value: IContentTypeAccordionItem[];
    };
}

export interface IContentTypeAccordion {
    code: string;
    properties: IContentTypeAccordionProperties;
}