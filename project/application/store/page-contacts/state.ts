import { EStatus } from "~/constants/status";
import { IContentTypeTranslated } from "~/types/content-type.interface";
import { IDictionary } from "~/types/dictionary.interface";

export interface IState {
    contentTypes: IDictionary<IContentTypeTranslated>;
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        contentTypes: {},
        status: EStatus.INIT,
        error: null
    };
}
