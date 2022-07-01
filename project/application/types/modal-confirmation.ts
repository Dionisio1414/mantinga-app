import { IDictionary } from "./dictionary.interface";

export interface IModalConfirmationProps {
    message?: string,
    actionButtonTitle?: string;
    cancelButtonTitle?: string;
    params?: IDictionary<any>;
}