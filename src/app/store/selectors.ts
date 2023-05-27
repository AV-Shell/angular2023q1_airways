import { IAppState } from './models';

export const commonStateSelector = (state: IAppState) => state.commonState;

export const airResponseSelector = (state: IAppState) => state.airResponseState;
