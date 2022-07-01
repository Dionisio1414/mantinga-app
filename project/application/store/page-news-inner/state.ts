import { EStatus } from "~/constants/status";
import { IArticle } from "~/types/articles.interface";
import { IContentTypeTranslated } from "~/types/content-type.interface";
import { IDictionary } from "~/types/dictionary.interface";

export interface IState {
    contentTypes: IDictionary<IContentTypeTranslated>;
    data: IArticle | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        contentTypes: {},
        data: null,
        status: EStatus.INIT,
        error: null
    };
}
