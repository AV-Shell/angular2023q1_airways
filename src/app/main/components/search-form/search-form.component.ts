import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { airports } from 'src/constants';

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
    }
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
}

interface Airports {
  name: string;
  city: string;
  country: string;
  code: string;
}
