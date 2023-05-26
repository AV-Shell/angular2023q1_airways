import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { airports } from 'src/constants';

// const airports = [
//   {
//     name: 'Hartsfield Jackson Atlanta Intl',
//     city: 'Atlanta',
//     country: 'United States',
//     code: 'ATL',
//   },
//   {
//     name: 'Chicago Ohare Intl',
//     city: 'Chicago',
//     country: 'United States',
//     code: 'ORD',
//   },
//   {
//     name: 'Capital Intl',
//     city: 'Beijing',
//     country: 'China',
//     code: 'PEK',
//   },
//   {
//     name: 'Heathrow',
//     city: 'London',
//     country: 'United Kingdom',
//     code: 'LHR',
//   },
//   {
//     name: 'Charles De Gaulle',
//     city: 'Paris',
//     country: 'France',
//     code: 'CDG',
//   },
//   {
//     name: 'Los Angeles Intl',
//     city: 'Los Angeles',
//     country: 'United States',
//     code: 'LAX',
//   },
//   {
//     name: 'Frankfurt Main',
//     city: 'Frankfurt',
//     country: 'Germany',
//     code: 'FRA',
//   },
//   {
//     name: 'Dallas Fort Worth Intl',
//     city: 'Dallas-Fort Worth',
//     country: 'United States',
//     code: 'DFW',
//   },
//   {
//     name: 'John F Kennedy Intl',
//     city: 'New York',
//     country: 'United States',
//     code: 'JFK',
//   },
// ];

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });
  public options: Airports[] = airports;
  public filteredFrom!: Observable<Airports[]> | null;
  public filteredTo!: Observable<Airports[]> | null;

  get from() {
    return this.form.get('from');
  }

  get to(): AbstractControl | null {
    return this.form.get('to');
  }

  public ngOnInit(): void {

    this.filteredFrom = this.filterAirports(this.from);
    this.filteredTo = this.filterAirports(this.to);
  }

  public buildValue(airport:Airports): string{
    return `${airport.name} (${airport.code})`;
  }

  private filterAirports(control: AbstractControl | null) {
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

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(1);
      console.log(this.form);
    }
  }
}

interface Airports {
  name: string;
  city: string;
  country: string;
  code: string;
}
