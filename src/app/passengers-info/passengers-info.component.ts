import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAirResponseExt, IAppState, ICommonState, IFlightSearchState, IFormats, ISelectFlightState } from '../store/models';
import { Store } from '@ngrx/store';
import { flightSelection } from '../store/selectors';
import { ILoginResponse } from '../core/models/core.models';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { onlyLettersValidator } from '../core/validators/onlyLetters.validator';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent implements OnInit, OnDestroy {
  airResponse: IAirResponseExt | null = null;
  flightSearch: IFlightSearchState | null = null;
  selectFlight: ISelectFlightState | null = null;
  userState: ILoginResponse | null = null;
  subs!: Subscription;
  form!: FormGroup;

  moneys = ['EUR', 'USA', 'RUB', 'PLN'];

  commonState!: ICommonState;

  formats!: IFormats;

  public countries = [
    {
      name: 'Afghanistan',
      dialCode: '+93',
      code: 'AF',
    },
    {
      name: 'Aland Islands',
      dialCode: '+358',
      code: 'AX',
    },
    {
      name: 'Albania',
      dialCode: '+355',
      code: 'AL',
    },
    {
      name: 'Algeria',
      dialCode: '+213',
      code: 'DZ',
    },
    {
      name: 'American Samoa',
      dialCode: '+1684',
      code: 'AS',
    },
    {
      name: 'Belarus',
      dialCode: '+375',
      code: 'BY',
    },
    {
      name: 'Belgium',
      dialCode: '+32',
      code: 'BE',
    },
    {
      name: 'Romania',
      dialCode: '+40',
      code: 'RO',
    },
    {
      name: 'Russia',
      dialCode: '+7',
      code: 'RU',
    },
    {
      name: 'Rwanda',
      dialCode: '+250',
      code: 'RW',
    },
    {
      name: 'United Kingdom',
      dialCode: '+44',
      code: 'GB',
    },
    {
      name: 'United States',
      dialCode: '+1',
      code: 'US',
    },
    {
      name: 'Uruguay',
      dialCode: '+598',
      code: 'UY',
    },
  ];

  get phoneGet(): AbstractControl | null {
    return this.form.get('contact.phone');
  }

  get phoneCodeGet(): AbstractControl | null {
    return this.form.get('contact.phoneCode');
  }

  get adultsArray() {
    return this.form.get('adultsArray') as FormArray;
  }
  get kidsArray() {
    return this.form.get('kidsArray') as FormArray;
  }
  get infantsArray() {
    return this.form.get('infantsArray') as FormArray;
  }

  getArrayField(a: string, i: number, f: string) {
    return this.form.get(`${a}.${i}.${f}`);
  }

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit() {
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
      this.userState = data.userState;
    });

    const match = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    this.form = new FormGroup({
      adultsArray: new FormArray(this.flightSearch?.adults ? this.returnAdult(this.flightSearch?.adults) : []),
      kidsArray: new FormArray(this.flightSearch?.child ? this.returnAdult(this.flightSearch?.child) : []),
      infantsArray: new FormArray(this.flightSearch?.infants ? this.returnAdult(this.flightSearch?.infants) : []),
      contact: new FormGroup({
        phoneCode: new FormControl(this.userState?.user.countryCode ?? this.countries[0].dialCode, [Validators.required]),
        phone: new FormControl(this.userState?.user.phoneNumber ?? '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        email: new FormControl(this.userState?.user.email ?? '', [Validators.required, Validators.pattern(match)]),
      }),
    });

  }

  returnAdult(adultsCount: number) {
    const arr = new Array(adultsCount).fill(1).map(x => {
      return new FormGroup({
        firstName: new FormControl('', [Validators.required, onlyLettersValidator]),
        lastName: new FormControl('', [Validators.required, onlyLettersValidator]),
        gender: new FormControl('male', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        isNeedAssistant: new FormControl(false),
      });
    });
    return arr;
  }

  returnInfants(adultsCount: number) {
    const arr = new Array(adultsCount).fill(1).map(x => {
      return new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
      });
    });
    return arr;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  backClick() {
    this.router.navigate(['/flight-selection']);
  }

  continueClick() {
    this.router.navigate(['/summary']);
  }
}
