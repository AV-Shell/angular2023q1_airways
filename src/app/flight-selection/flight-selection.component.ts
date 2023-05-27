import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAirResponseExt, IAppState, ICommonState, IFormats } from '../store/models';
import { Store } from '@ngrx/store';
import { airResponseSelector, commonStateSelector } from '../store/selectors';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  showEditForm = false;

  airResponse: IAirResponseExt | null = null;
  subs!: Subscription;

  moneys = ['EUR', 'USA', 'RUB', 'PLN'];

  public commonState!: ICommonState;

  public formats!: IFormats;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.subs = this.store.select(commonStateSelector).subscribe(data => {
      this.commonState = data;
      this.formats = {
        dateFormat: data.dateFormat,
        moneyFormat: data.moneyFormat,
        moneyField: data.moneyField,
      };
    });
    this.subs.add(
      this.store.select(airResponseSelector).subscribe(data => {
        this.airResponse = data;
      }),
    );
  }

  onShowEditForm() {
    this.showEditForm = !this.showEditForm;
    console.log('this.showEditForm', this.showEditForm);
  }

  backClick() {
    console.log('backClick');
  }

  continueClick() {
    console.log('continueClick');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
