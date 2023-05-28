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

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: 'male' | 'female';
  countryCode: number;
  phoneNumber: number;
  citizenship: string;
  termsUse: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    birthDay: string;
    gender: 'male' | 'female';
    countryCode: string;
    phoneNumber: string;
    citizenship: string;
    termsUse: boolean;
    id: number;
  };
}

export interface ICheckResponse {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: 'male' | 'female';
  countryCode: number;
  phoneNumber: number;
  citizenship: string;
  termsUse: boolean;
  id: number;
}
