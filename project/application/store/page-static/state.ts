import { EStatus } from "~/constants/status";
import { IContentTypeTranslated } from "~/types/content-type.interface";
import { IDictionary } from "~/types/dictionary.interface";

export interface IState {
    pageTranslations: IDictionary<IContentTypeTranslated> | null;
    status: EStatus;
    error: Error | null;
    pageCode: string;
}

export default (): IState => {
    return {
        pageTranslations: null,
        status: EStatus.INIT,
        error: null,
        pageCode: ''
    };
}
