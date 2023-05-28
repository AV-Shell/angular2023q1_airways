import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap, tap, EMPTY } from 'rxjs';
import { AirHttpService } from '../core/services/air.http.service';
import * as allActions from './actions';
import { IAirResponseExt, IFlightSearchState } from './models';
import { IAirRequest, ILoginRequest, ILoginResponse, IRegisterRequest } from '../core/models/core.models';
import { Router } from '@angular/router';

@Injectable()
export class AirEffects {
  constructor(private actions: Actions, private airS: AirHttpService, private readonly router: Router) {}

  getAirs = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.changeFlightSearchValue),
      switchMap(({ value }: { value: IFlightSearchState }) => {
        const request: IAirRequest = {
          endDate: value.end,
          from: value.codeFrom,
          to: value.codeTo,
          passengersCount: value.adults + value.child + value.infants,
          startDate: value.start,
          way: value.tripType === 1 ? 'round' : 'one-way',
        };
        return this.airS.getAirs(request).pipe(
          map((value: IAirResponseExt) => allActions.getAirSearchResultSuccessfull({ result: value })),
          catchError(error => {
            return of(allActions.getAirSearchResultError({ error: error.error?.message ?? error.message ?? 'something went wrong' }));
          }),
        );
      }),
    ),
  );

  getAirsResult = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.getAirSearchResultSuccessfull),
      switchMap(_ => {
        this.router.navigate([`/flight-selection/`]);
        return of(allActions.redirectAction());
      }),
    ),
  );

  getSelectResult = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.changeFlightSelectValue),
      switchMap(data => {
        if (data.values.isSubmitted) {
          this.router.navigate(['/passengers-info']);
        }
        return of(allActions.redirectAction());
      }),
    ),
  );

  getLogin = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.tryLogin),
      switchMap(({ values }: { values: ILoginRequest }) => {
        const request: ILoginRequest = {
          ...values,
        };
        return this.airS.login(request).pipe(
          map((value: ILoginResponse) => allActions.getLoginResultSuccessfull({ result: value })),
          catchError(error => {
            return of(allActions.getLoginResultError({ error: error.error?.message ?? error.message ?? 'something went wrong' }));
          }),
        );
      }),
    ),
  );

  getRegister = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.tryRegister),
      switchMap(({ values }: { values: IRegisterRequest }) => {
        const request: IRegisterRequest = {
          ...values,
        };
        return this.airS.register(request).pipe(
          map((value: ILoginResponse) => allActions.getLoginResultSuccessfull({ result: value })),
          catchError(error => {
            return of(allActions.getRegisterResultError({ error: error.error?.message ?? error.message ?? 'something went wrong' }));
          }),
        );
      }),
    ),
  );
}
