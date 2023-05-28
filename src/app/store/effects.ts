import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap, tap, EMPTY } from 'rxjs';
import { AirHttpService } from '../core/services/air.http.service';
import * as allActions from './actions';
import { IAirResponseExt, IFlightSearchState } from './models';
import { IAirRequest, ICheckResponse, ILoginRequest, ILoginResponse, IRegisterRequest } from '../core/models/core.models';
import { Router } from '@angular/router';
import { LocalstorageService } from '../core/services/localstorage.service';

@Injectable()
export class AirEffects {
  constructor(
    private actions: Actions,
    private airS: AirHttpService,
    private readonly router: Router,
    private ls: LocalstorageService,
  ) {}

  startApp = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.startAppAction),
      switchMap(() => {
        const token = this.ls.getItem<string>('token');
        const id = this.ls.getItem<number>('id');

        if (typeof id !== 'number' || typeof token !== 'string') {
          return of(allActions.emptyAction());
        }

        return this.airS.checkUser(id, token).pipe(
          map((value: ICheckResponse) => allActions.getCheckedUserSuccessfull({ result: value, token })),
          catchError(error => {
            return of(allActions.getCheckUserResultError({ error: error.error?.message ?? error.message ?? 'something went wrong' }));
          }),
        );
      }),
    ),
  );

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
            const err =
              (typeof error === 'string' && error) ||
              (typeof error?.error === 'string' && error?.error) ||
              (typeof error?.message === 'string' && error?.message) ||
              (typeof error?.error?.message === 'string' && error?.error?.message) ||
              'something went wrong';

            return of(allActions.getLoginResultError({ error: err }));
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

  setTockenToLocalstore = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.getLoginResultSuccessfull),
      switchMap(({ result }: { result: ILoginResponse }) => {
        this.ls.setItem('token', result.accessToken);
        this.ls.setItem('id', result.user.id);

        return of(allActions.emptyAction()).pipe(
          catchError(() => {
            return of(allActions.emptyAction());
          }),
        );
      }),
    ),
  );
  removeTockenFromLocalstore = createEffect(() =>
    this.actions.pipe(
      ofType(allActions.getCheckUserResultError),
      switchMap(() => {
        this.ls.removeItem('token');
        this.ls.removeItem('id');

        return of(allActions.emptyAction()).pipe(
          catchError(() => {
            return of(allActions.emptyAction());
          }),
        );
      }),
    ),
  );
}
