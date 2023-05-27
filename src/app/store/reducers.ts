import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { commonInitialState, flightSearchInitialState, responseInitialState } from './state';
import { IAirResponseExt, ICommonState, IFlightSearchState, TMoneyField, TMoneyFormat } from './models';

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

export const flightSearchReducer = createReducer(
  flightSearchInitialState,
  on(
    actions.changeFlightSearchValue,
    (state, { value }): IFlightSearchState => ({
      ...state,
      ...value,
    }),
  ),
  on(
    actions.getAirSearchResultError,
    (state, { error }): IFlightSearchState => ({
      ...state,
      error,
    }),
  ),
);

export const airResponseReducer = createReducer(
  responseInitialState,
  on(actions.changeFlightSearchValue, (): null => {
    return null;
  }),
  on(
    actions.getAirSearchResultSuccessfull,
    (state, { result }): IAirResponseExt => ({
      ...state,
      ...result,
    }),
  ),
);
