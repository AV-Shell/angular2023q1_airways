import { IAirResponseExt, ICommonState, IFlightSearchState, ISelectFlightState } from './models';

export const commonInitialState: ICommonState = {
  dateFormat: 'YYYY/MM/DD',
  moneyFormat: 'USD',
  moneyField: 'usd',
  isSign: false,
  token: null,
};

export const selectFlightInitialState: ISelectFlightState = {
  selectedBackWay: null,
  selectedIndexBackWay: 3,
  selectedIndexThereWay: 3,
  selectedThereWay: null,
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
