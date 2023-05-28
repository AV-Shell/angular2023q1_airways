import { createSelector } from '@ngrx/store';
import { IAppState, ISelectFlightState } from './models';
import { ICommonState } from './models';
import { IAirResponseExt } from './models';
import { IFlightSearchState } from './models';
import { ILoginResponse } from '../core/models/core.models';

export const commonStateSelector = (state: IAppState) => state.commonState;

export const flightSearchStateSelector = (state: IAppState) => state.flightSearchState;

export const airResponseSelector = (state: IAppState) => state.airResponseState;
export const selectFlightSelector = (state: IAppState) => state.selectFlightState;
export const userSelector = (state: IAppState) => state.userState;

export const flightSelection = createSelector(
  commonStateSelector,
  flightSearchStateSelector,
  airResponseSelector,
  selectFlightSelector,
  userSelector,
  (
    commonState: ICommonState,
    flightSearchState: IFlightSearchState,
    airResponseState: IAirResponseExt,
    selectFlightState: ISelectFlightState,
    userState: ILoginResponse,
  ) => {
    return {
      commonState,
      flightSearchState,
      airResponseState,
      selectFlightState,
      userState,
    };
  },
);
