import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { airports } from 'src/app/constants/airports';
import { changeFlightSearchValue } from 'src/app/store/actions';
import { IAppState, IFlightSearchFormSubmit, IFlightSearchState } from 'src/app/store/models';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    tripType: new FormControl('1'),
    start: new FormControl(''),
    end: new FormControl(''),
    adults: new FormControl('2'),
    child: new FormControl('2'),
    infants: new FormControl('2'),
  });
  public options: Airports[] = airports;
  public filteredFrom!: Observable<Airports[]> | null;
  public filteredTo!: Observable<Airports[]> | null;
  public tripType!: string;
  public isOneWay!: boolean;
  public minDate = new Date();
  public maxDate!: Date;

  constructor(private store: Store<IAppState>) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  get from(): AbstractControl | null {
    return this.form.get('from');
  }

  get to(): AbstractControl | null {
    return this.form.get('to');
  }

  public ngOnInit(): void {
    this.isOneWay = this.form.get('tripType')?.value !== '1';
    this.filteredFrom = this.filterAirports(this.from);
    this.filteredTo = this.filterAirports(this.to);
  }

  public changeCalendar(e: MatRadioChange): void {
    this.isOneWay = e.value !== '1';
  }

  public buildValue(airport: Airports): string {
    return `${airport.name} (${airport.code})`;
  }

  public switchAirports(): void {
    const fromValue = this.from?.value;
    const toValue = this.to?.value;
    this.from?.setValue(toValue);
    this.to?.setValue(fromValue);
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(1);
      console.log(this.form);
      this.setAction(this.form.value);
    }
  }

  private filterAirports(control: AbstractControl | null): Observable<Airports[]> | null {
    if (!control) {
      return null;
    }
    return control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  private filter(value: string): Airports[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(({ name, city, country, code }: Airports) =>
      `${name} ${city} ${country} ${code}`.toLowerCase().includes(filterValue),
    );
  }

  private setAction(value: IFlightSearchFormSubmit) {
    const stateValues: IFlightSearchState = {
      adults: +value.adults,
      child: +value.child,
      infants: +value.infants,
      tripType: +value.tripType,
      airportFrom: value.from.slice(0, -6),
      airportTo: value.to.slice(0, -6),
      codeFrom: value.from.slice(-4, -1),
      codeTo: value.to.slice(-4, -1),
      searchFrom: value.from,
      searchTo: value.to,
      end: value.end.toString(),
      start: value.start.toString(),
      error: '',
    };

    this.store.dispatch(changeFlightSearchValue({ value: stateValues }));
  }
}

interface Airports {
  name: string;
  city: string;
  country: string;
  code: string;
}
