import { createAction, props } from '@ngrx/store';
import { IFlightSearchState, TDataFormat, TMoneyFormat } from './models';

export const changeDataFormatValue = createAction('[Header] set data format value', props<{ value: TDataFormat }>());
export const changeMoneyFormatValue = createAction('[Header] set money format value', props<{ value: TMoneyFormat }>());
export const changeFlightSearchValue = createAction('[Main] set flight search values', props<{ value: IFlightSearchState }>());
