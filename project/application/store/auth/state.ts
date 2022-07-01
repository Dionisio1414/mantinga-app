import { EStatus } from '~/constants/status';

export interface IState {
    status: EStatus;
    isAuthorized: boolean;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        isAuthorized: false,
    };
}
