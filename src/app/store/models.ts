export type TDataFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/DD/MM' | 'YYYY/MM/DD';
export type TMoneyFormat = 'EUR' | 'USD' | 'RUB' | 'PLN';
export type TMoneyField = 'eur' | 'usd' | 'rub' | 'pln';

export interface ICommonState {
  dateFormat: TDataFormat;
  moneyFormat: TMoneyFormat;
  moneyField: TMoneyField;
  isSign: boolean;
  token: string | null;
}

export interface IFlightSearchState {
  adults: number;
  child: number;
  infants: number;
  tripType: number;
  searchFrom: string;
  searchTo: string;
  airportFrom: string;
  airportTo: string;
  codeFrom: string;
  codeTo: string;
  start: string;
  end: string;
}

export interface IFlightSearchFormSubmit {
  adults: string;
  child: string;
  infants: string;
  tripType: string;
  from: string;
  to: string;
  start: Date;
  end: Date;
}

export interface IAppState {
  commonState: ICommonState;
  airResponseState: IAirResponseExt;
  flightSearchState: IFlightSearchState;
}

export interface IFormats {
  dateFormat: TDataFormat;
  moneyFormat: TMoneyFormat;
  moneyField: TMoneyField;
}

export interface IAirResponse {
  from: string;
  to: string;
  way: string;
  endDate: string;
  startDate: string;
  thereWay: IFlightInfo[];
  backWay?: IFlightInfo[];
}

export interface IFlightInfo {
  startTime: string;
  timeWay: number;
  flightNumber: string;
  price: {
    eur: number;
    usd: number;
    pln: number;
    rub: number;
  };
  available: number;
  isFlight: boolean;
  direct: {
    isDirect: boolean;
    airportRedirect: string[] | Array<string[]>;
  };
}

export interface IFlightInfoExt extends IFlightInfo {
  startDate: string;
}

export interface IAirResponseExt {
  from: string;
  to: string;
  way: string;
  endDate: string;
  startDate: string;
  thereWay: IFlightInfoExt[];
  backWay?: IFlightInfoExt[];
}

export interface IAirRequest {
  from: string;
  to: string;
  way: string;
  endDate: string;
  startDate: string;
  passengersCount: number;
}
