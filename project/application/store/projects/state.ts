import { EStatus } from "~/constants/status";
import { IProjects } from "~/types/projects.interface";

export interface IState {
    projects: IProjects[] | null;
    projectsInner: IProjects | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        projects: null,
        projectsInner: null,
        status: EStatus.INIT,
        error: null
    };
}
