import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { IFlightInfoExt, IFormats } from 'src/app/store/models';

@Component({
  selector: 'app-flight-full-info',
  templateUrl: './flight-full-info.component.html',
  styleUrls: ['./flight-full-info.component.scss'],
})
export class FlightFullInfoComponent {
  @Input() isReturn = false;
  @Input() selected = false;
  @Input() unaviable = false;

  @Input() value: IFlightInfoExt | undefined;
  @Input() formats: IFormats | undefined;

  get startDate() {
    if (this.value?.startDate && this.value?.startTime) {
      const [addHours, addMinutes] = this.value.startTime.split(':');

      return moment(this.value.startDate).add({ hours: +addHours, minutes: +addMinutes }).toLocaleString();
    }
    return '';
  }

  get endDate() {
    if (this.value?.startDate && this.value?.startTime && this.value?.timeWay) {
      const [addHours, addMinutes] = this.value.startTime.split(':');

      return moment(this.value.startDate)
        .add({ hours: +addHours, minutes: +addMinutes + +this.value.timeWay })
        .toLocaleString();
    }
    return '';
  }
  get timeWay() {
    if (this.value?.timeWay) {
      return `${(this.value?.timeWay / 60) | 0}h ${this.value?.timeWay % 60}m`;
    }
    return '';
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
}
