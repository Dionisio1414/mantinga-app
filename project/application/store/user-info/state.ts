import { EStatus } from '~/constants/status';
import { IUserInfo } from '~/types/user-info.interface';

export interface IState {
    status: EStatus;
    error: any;
    userInfo: IUserInfo | null;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: false,
        userInfo: null
    };
}
