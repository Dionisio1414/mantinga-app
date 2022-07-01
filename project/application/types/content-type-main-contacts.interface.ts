export interface IContentTypeMainContactsProperties {
    company_name: IContentTypeMainContactsValue;
    coordinates: IContentTypeMainContactsValue;
    address: IContentTypeMainContactsValue;
    phones: {
        value: IContentTypeMainContactsPhones[]
    };
    email: IContentTypeMainContactsValue;
    company_codes: IContentTypeMainContactsValue;
    blocks: { 
        value: IContentTypeMainContactsBlocks[] 
    }
}

export interface IContentTypeMainContactsValue {
    value: string;
}

export interface IContentTypeMainContactsPhones {
    phone: IContentTypeMainContactsValue
}

export interface IContentTypeMainContactsBlocks {
    title: IContentTypeMainContactsValue;
    phone: IContentTypeMainContactsValue;
    email: IContentTypeMainContactsValue;
}

export interface IContentTypeMainContacts {
    code: string;
    properties: IContentTypeMainContactsProperties;
}