import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAirResponseExt, IAppState, ICommonState, IFlightSearchState, IFormats, ISelectFlightState } from '../store/models';
import { Store } from '@ngrx/store';
import { flightSelection } from '../store/selectors';
import { changeFlightSearchValue } from '../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  showEditForm = false;

  airResponse: IAirResponseExt | null = null;
  flightSearch: IFlightSearchState | null = null;
  selectFlight: ISelectFlightState | null = null;
  subs!: Subscription;

  moneys = ['EUR', 'USA', 'RUB', 'PLN'];

  public commonState!: ICommonState;

  public formats!: IFormats;

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit(): void {
    this.subs = this.store.select(flightSelection).subscribe(data => {
      this.commonState = data.commonState;
      this.formats = {
        dateFormat: data.commonState.dateFormat,
        moneyFormat: data.commonState.moneyFormat,
        moneyField: data.commonState.moneyField,
      };
      this.airResponse = data.airResponseState;
      this.flightSearch = data.flightSearchState;
      this.selectFlight = data.selectFlightState;
    });
  }

  onShowEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  backClick() {
    this.router.navigate(['/main']);
  }

  continueClick() {
    // if (false) {
    //   this.router.navigate(['/passengers-info']);
    // } else {
    //   console.log('openRegistration');
    // }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get airportsThereWay() {
    return {
      airportFrom: this.flightSearch?.airportFrom ?? '',
      airportTo: this.flightSearch?.airportTo ?? '',
    };
  }

  get airportsBackWay() {
    return {
      airportFrom: this.flightSearch?.airportTo ?? '',
      airportTo: this.flightSearch?.airportFrom ?? '',
    };
  }

  get continueDisabled() {
    return this.flightSearch?.tripType === 1
      ? !this.selectFlight?.selectedThereWay || !this.selectFlight?.selectedBackWay
      : !this.selectFlight?.selectedThereWay;
  }

  get selectedThereWay() {
    return this.selectFlight?.selectedThereWay;
  }

  get selectedBackWay() {
    return this.selectFlight?.selectedBackWay;
  }

  public newSearchDataSubmit() {
    const data: IFlightSearchState = {
      adults: 2,
      child: 2,
      infants: 2,
      tripType: 1,
      airportFrom: 'Los Angeles Intl',
      airportTo: 'Dallas Fort Worth Intl',
      codeFrom: 'LAX',
      codeTo: 'DFW',
      searchFrom: 'Los Angeles Intl (LAX)',
      searchTo: 'Dallas Fort Worth Intl (DFW)',
      end: 'Mon Jul 31 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      start: 'Sun Jul 02 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      error: '',
    };

    this.store.dispatch(changeFlightSearchValue({ value: data }));
  }
}
