export interface IContentTypeSalesContactsPhones {
    phone: IContentTypeSalesContactsValue;
}

export interface IContentTypeSalesContactsValue {
    value: string;
}

export interface IContentTypeSalesContactsUrl {
    url: string;
}

export interface IContentTypeSalesContactsPropertiesValues {
    title: IContentTypeSalesContactsValue;
    subtitle: IContentTypeSalesContactsValue;
    flag: IContentTypeSalesContactsUrl;
    coordinates: IContentTypeSalesContactsValue;
    phones: {
        value: IContentTypeSalesContactsPhones[]
    };
    schedule: IContentTypeSalesContactsValue;
    email: IContentTypeSalesContactsValue;
    site_url: IContentTypeSalesContactsValue;
}

export interface IContentTypeSalesContactsProperties {
    entries: {
        value: IContentTypeSalesContactsPropertiesValues[]
    }
}

export interface IContentTypeSalesContacts {
    code: string;
    properties: IContentTypeSalesContactsProperties;
}