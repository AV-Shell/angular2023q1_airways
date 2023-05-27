import { IAirResponseExt, ICommonState, IFlightSearchState } from './models';

export const commonInitialState: ICommonState = {
  dateFormat: 'YYYY/MM/DD',
  moneyFormat: 'USD',
  moneyField: 'usd',
  isSign: false,
  token: null,
};

export const flightSearchInitialState: IFlightSearchState = {
  adults: 0,
  child: 0,
  infants: 0,
  tripType: 1,
  searchFrom: '',
  searchTo: '',
  airportFrom: '',
  airportTo: '',
  codeFrom: '',
  codeTo: '',
  start: '',
  end: '',
  error: '',
};

export const responseInitialState: IAirResponseExt | null = null;
