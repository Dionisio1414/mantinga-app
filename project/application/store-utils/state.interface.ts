import { IState as IStateBrowserSupport } from '~/store/browser-support/state';
import { IState } from '~/store/locale/state';

export interface IRootState {
    'browser-support': IStateBrowserSupport;
    'locale': IState;
}