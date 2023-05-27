export interface IAirRequest {
  from: string;
  to: string;
  way: string;
  endDate: string;
  startDate: string;
  passengersCount: number;
}

export interface IAirportsNames {
  airportTo: string;
  airportFrom: string;
}
