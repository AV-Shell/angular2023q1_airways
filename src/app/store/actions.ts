import { createAction, props } from '@ngrx/store';
import { IAirResponseExt, IFlightSearchState, ISelectFlightState, TDataFormat, TMoneyFormat } from './models';

export const changeDataFormatValue = createAction('[Header] set data format value', props<{ value: TDataFormat }>());
export const changeMoneyFormatValue = createAction('[Header] set money format value', props<{ value: TMoneyFormat }>());
export const changeFlightSearchValue = createAction('[Main] set flight search values', props<{ value: IFlightSearchState }>());

export const getAirSearchResultSuccessfull = createAction(
  '[App Effect] set fetched flights search result',
  props<{ result: IAirResponseExt }>(),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAirSearchResultError = createAction('[App Effect] failed flights search result', props<{ error: string }>());

export const redirectAction = createAction('[Router] redirect ');

export const changeFlightSelectValue = createAction(
  '[flight select] change flight select values',
  props<{ values: Partial<ISelectFlightState> }>(),
);
