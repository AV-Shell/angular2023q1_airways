import { createAction, props } from '@ngrx/store';
import { TDataFormat, TMoneyFormat } from './models';

export const changeDataFormatValue = createAction('[Header] set data format value', props<{ value: TDataFormat }>());
export const changeMoneyFormatValue = createAction('[Header] set money format value', props<{ value: TMoneyFormat }>());