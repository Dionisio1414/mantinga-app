import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IProjects, IProjectsResponse } from '~/types/projects.interface';

import { IState } from './state';

export default {
    fetchProjectsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchProjectsSuccess: (state, payload: IProjectsResponse) => {
        state.projects = payload["hydra:member"];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProjectsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchProjectsInnerInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchProjectsInnerSuccess: (state, { "@context":context, ...rest }) => {
        state.projectsInner = rest;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProjectsInnerError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload;
    }
} as MutationTree<IState>;
