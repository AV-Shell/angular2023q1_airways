import { Component, Input } from '@angular/core';
import { IFlightInfoExt, IFormats } from 'src/app/store/models';

@Component({
  selector: 'app-flight-min-info',
  templateUrl: './flight-min-info.component.html',
  styleUrls: ['./flight-min-info.component.scss'],
})
export class FlightMinInfoComponent {
  @Input() value: IFlightInfoExt | undefined;
  @Input() formats: IFormats | undefined;
  @Input() selected = false;
  // @Input() unaviable = false;

  get money() {
    return this.value?.price[this.formats?.moneyField ?? 'usd'];
  }

  get currencyFormat() {
    return this.formats?.moneyFormat ?? 'USD';
  }

  get unaviable() {
    return !this.value?.isFlight;
  }
}
