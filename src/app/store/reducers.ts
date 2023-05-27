import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { commonInitialState, flightSearchInitialState, responseInitialState, selectFlightInitialState } from './state';
import { IAirResponseExt, ICommonState, IFlightSearchState, ISelectFlightState, TMoneyField, TMoneyFormat } from './models';

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

export const selectFlightReducer = createReducer(
  selectFlightInitialState,
  on(actions.changeFlightSearchValue, (): ISelectFlightState => {
    return {
      selectedBackWay: null,
      selectedIndexBackWay: 3,
      selectedIndexThereWay: 3,
      selectedThereWay: null,
    };
  }),
  on(
    actions.getAirSearchResultSuccessfull,
    (state, { result }): ISelectFlightState => ({
      ...state,
      selectedIndexThereWay: 3,
      selectedIndexBackWay: result.thereWay.length > 3 ? result.thereWay.length - 4 : 0,
    }),
  ),
  on(
    actions.changeFlightSelectValue,
    (state, { values }): ISelectFlightState => ({
      ...state,
      ...values,
    }),
  ),
);
