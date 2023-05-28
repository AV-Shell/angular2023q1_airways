import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { filter, switchMap, tap, of, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/models';
import { flightSelection } from 'src/app/store/selectors';

export const preventLoadGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store<{ appState: IAppState }>);
  const router = inject(Router);
  const id = route.params['cardId'];
  console.log('route.url', route);

  const url = route.url[0].path;
  console.log('route.url', url);
  // if (!id) {
  //   router.navigate(['/main']);

  //   return false;
  // }

  return store.select(flightSelection).pipe(
    tap(x => console.log('s', x)),
    map(st => {
      switch (url) {
        case 'flight-selection':
          if (!st.flightSearchState.searchFrom || !st.airResponseState.thereWay) {
            router.navigate(['/main']);
          }
          // return !!st.airResponseState?.thereWay;
          break;
        case 'passengers-info':
          if (!st.userState.accessToken || !st.selectFlightState.isSubmitted) {
            router.navigate(['/flight-selection']);
          }
          // return true;
          break;

        default:
          break;
      }
      return true;
    }),
    // filter(video => !!video),
    // switchMap(() => of(true)),
  );
};
