import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { commonInitialState } from './state';
import { ICommonState } from './models';

export const commonReducer = createReducer(
  commonInitialState,
  on(actions.changeDataFormatValue, (state, { value }): ICommonState => ({ ...state, dateFormat: value })),
  on(actions.changeMoneyFormatValue, (state, { value }): ICommonState => ({ ...state, moneyFormat: value })),
);
