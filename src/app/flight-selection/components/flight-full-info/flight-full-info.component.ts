import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAirportsNames } from 'src/app/core/models/core.models';
import { changeFlightSelectValue } from 'src/app/store/actions';
import { IAppState, IFlightInfoExt, IFormats, ISelectFlightState } from 'src/app/store/models';

@Component({
  selector: 'app-flight-full-info',
  templateUrl: './flight-full-info.component.html',
  styleUrls: ['./flight-full-info.component.scss'],
})
export class FlightFullInfoComponent {
  @Input() backWay = false;
  @Input() selected = false;
  @Input() index!: number;

  @Input() value: IFlightInfoExt | undefined;
  @Input() formats: IFormats | undefined;
  @Input() airports: IAirportsNames = { airportTo: '', airportFrom: '' };

  constructor(private store: Store<IAppState>) {}

  get startDate() {
    return this.value?.startDate;
  }

  get endDate() {
    return this.value?.endDate;
  }
  get timeWay() {
    return this.value?.timeWayString;
  }

  get isDirect() {
    return this.value?.direct.isDirect;
  }

  get connectedText() {
    return this.isDirect ? '' : `${this.value?.direct.airportRedirect[1]} (${this.value?.direct.airportRedirect[0]})`;
  }

  get money() {
    return this.value?.price[this.formats?.moneyField ?? 'usd'];
  }

  get currencyFormat() {
    return this.formats?.moneyFormat ?? 'USD';
  }

  get unaviable() {
    return !this.value?.isFlight;
  }

  onSelectClick() {
    if (this.value) {
      const t: Partial<ISelectFlightState> = this.backWay
        ? {
            selectedBackWay: this.value,
            selectedIndexBackWay: this.index,
          }
        : {
            selectedIndexThereWay: this.index,
            selectedThereWay: this.value,
          };
      this.store.dispatch(changeFlightSelectValue({ values: t }));
    }
  }

  onEditClick() {
    if (this.value) {
      const t: Partial<ISelectFlightState> = this.backWay
        ? {
            selectedBackWay: null,
            selectedIndexBackWay: this.index,
          }
        : {
            selectedIndexThereWay: this.index,
            selectedThereWay: null,
          };
      this.store.dispatch(changeFlightSelectValue({ values: t }));
    }
  }
}
