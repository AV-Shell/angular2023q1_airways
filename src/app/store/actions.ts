import { createAction, props } from '@ngrx/store';
import { IAirResponseExt, IFlightSearchState, ISelectFlightState, TDataFormat, TMoneyFormat } from './models';
import { ICheckResponse, ILoginRequest, ILoginResponse, IRegisterRequest } from '../core/models/core.models';

export const changeDataFormatValue = createAction('[Header] set data format value', props<{ value: TDataFormat }>());
export const changeMoneyFormatValue = createAction('[Header] set money format value', props<{ value: TMoneyFormat }>());
export const changeFlightSearchValue = createAction('[Main] set flight search values', props<{ value: IFlightSearchState }>());

export const getAirSearchResultSuccessfull = createAction(
  '[App Effect] set fetched flights search result',
  props<{ result: IAirResponseExt }>(),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAirSearchResultError = createAction('[App Effect] failed flights search result', props<{ error: string }>());

export const redirectAction = createAction('[Router] redirect ');
export const emptyAction = createAction('[Some] empty ');
export const startAppAction = createAction('[App start] cher LS ');

export const changeFlightSelectValue = createAction(
  '[flight select] change flight select values',
  props<{ values: Partial<ISelectFlightState> }>(),
);

export const tryLogin = createAction('[Login] try to login', props<{ values: ILoginRequest }>());
export const tryRegister = createAction('[Login] try to Register', props<{ values: IRegisterRequest }>());
export const tryCheckUser = createAction('[Login] try to CheckUser', props<{ id: number; token: string }>());

export const getLoginResultSuccessfull = createAction('[Login/Register] set login result', props<{ result: ILoginResponse }>());
export const getLoginResultError = createAction('[Login] failed login', props<{ error: string }>());
export const getRegisterResultError = createAction('[Login] failed register', props<{ error: string }>());
export const getCheckedUserSuccessfull = createAction(
  '[App Start] check saved user',
  props<{ result: ICheckResponse; token: string }>(),
);
export const getCheckUserResultError = createAction('[Check user] failed', props<{ error: string }>());
