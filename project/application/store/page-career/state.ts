import { EStatus } from "~/constants/status";
import { IContentTypeTranslated } from "~/types/content-type.interface";
import { IDictionary } from "~/types/dictionary.interface";
import { IJob } from "~/types/job.interface";

export interface IState {
    contentTypes: IDictionary<IContentTypeTranslated>;
    status: EStatus;
    error: Error | null;
    jobs: IJob[];
}

export default (): IState => {
    return {
        contentTypes: {},
        status: EStatus.INIT,
        error: null,
        jobs: []
    };
}
