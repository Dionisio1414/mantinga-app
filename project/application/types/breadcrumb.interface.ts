import { RawLocation } from 'vue-router';

export interface IBreadcrumb {
    key: string | number;
    title: string;
    link: RawLocation;
}
