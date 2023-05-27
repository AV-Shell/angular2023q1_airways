import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { commonInitialState, responseInitialState } from './state';
import { ICommonState, TMoneyField, TMoneyFormat } from './models';

function getMoneyField(f: TMoneyFormat): TMoneyField {
  switch (f) {
    case 'EUR':
      return 'eur';
    case 'RUB':
      return 'rub';
    case 'PLN':
      return 'pln';
    default:
      return 'usd';
  }
}

export const commonReducer = createReducer(
  commonInitialState,
  on(actions.changeDataFormatValue, (state, { value }): ICommonState => ({ ...state, dateFormat: value })),
  on(
    actions.changeMoneyFormatValue,
    (state, { value }): ICommonState => ({ ...state, moneyFormat: value, moneyField: getMoneyField(value) }),
  ),
);

export const airResponseReducer = createReducer(
  responseInitialState,
);

