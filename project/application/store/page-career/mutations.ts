import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IContentTypeResponse } from '~/types/content-type.interface';
import { IJobsResponse } from '~/types/job.interface';

import { IState } from './state';

export default {
    fetchCareerPageInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchCareerPageSuccess: (state, { translations }: IContentTypeResponse) => {
        state.contentTypes = translations;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchCareerPageError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    fetchJobsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchJobsSuccess: (state, data: IJobsResponse) => {
        state.jobs = data['hydra:member'];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchJobsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;
