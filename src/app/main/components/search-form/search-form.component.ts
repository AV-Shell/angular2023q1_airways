import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('adults') adults!: ElementRef<HTMLInputElement>;
  @ViewChild('child') child!: ElementRef<HTMLInputElement>;
  @ViewChild('infants') infants!: ElementRef<HTMLInputElement>;

  public form: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    tripType: new FormControl('1'),
    start: new FormControl(''),
    end: new FormControl(''),
    adults: new FormControl(0),
    child: new FormControl(0),
    infants: new FormControl(0),
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

  get passengersValue() {
    const adults = this.form.get('adults');
    const child = this.form.get('child');
    const infants = this.form.get('infants');
    if (adults && child && infants) {
      return [
        `${adults.value ? `${adults.value} Adult${adults.value === 1 ? '' : 's'}` : ''}`,
        `${child.value ? `${child.value} Child${child.value === 1 ? '' : 'ren'}` : ''}`,
        `${infants.value ? `${infants.value} Infant${infants.value === 1 ? '' : 's'}` : ''}`,
      ]
        .filter(x => x)
        .join(', ');
    }
    return '';
  }

  get adultsValue() {
    return this.form.get('adults')?.value;
  }

  get childValue() {
    return this.form.get('child')?.value;
  }

  get infantsValue() {
    return this.form.get('infants')?.value;
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

  public decreasePassengers(formFieldName: 'adults' | 'child' | 'infants'): void {
    const field = this.form.get(formFieldName);
    if (field) {
      const currentValue = field.value;
      const nextValue = currentValue < 1 ? 0 : currentValue - 1;
      field.setValue(nextValue);
      this.setInputStyle(this[formFieldName].nativeElement);
    }
  }

  public increasePassengers(formFieldName: 'adults' | 'child' | 'infants'): void {
    const field = this.form.get(formFieldName);
    if (field) {
      const currentValue = field.value;
      const nextValue = currentValue >= 0 ? currentValue + 1 : 0;
      field.setValue(nextValue);

      this.setInputStyle(this[formFieldName].nativeElement);
    }
  }

  public setInputStyle(tag: HTMLInputElement) {
    if (tag) {
      let len = 0;
      if (typeof tag.value === 'number') {
        len = String(tag.value).length;
      } else if (typeof tag.value === 'string') {
        len = tag.value.length;
      }
      len = len > 0 ? len : 1;
      tag.size = len;
      tag.style.width = len + 0.5 + 'ch';
    }
  }

  public setInputStyleEvent(a: Event) {
    if (a.target instanceof HTMLInputElement) {
      this.setInputStyle(a.target);
    }
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
