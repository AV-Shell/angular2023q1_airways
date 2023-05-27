import { IAppState } from './models';

export const commonStateSelector = (state: IAppState) => state.commonState;

export const flightSearchStateSelector = (state: IAppState) => state.flightSearchState;

export const airResponseSelector = (state: IAppState) => state.airResponseState;
