export type TDataFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/DD/MM' | 'YYYY/MM/DD';
export type TMoneyFormat = 'EUR' | 'USA' | 'RUB' | 'PLN';

export interface ICommonState {
  dateFormat: TDataFormat;
  moneyFormat: TMoneyFormat;
  isSign: boolean;
  token: string | null;
}

export interface IAppState {
  commonState: ICommonState;
}
