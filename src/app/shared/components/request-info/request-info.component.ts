import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlightSearchState } from 'src/app/store/models';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss'],
})
export class RequestInfoComponent {
  @Input() showEdit = false;
  @Input() flightSearchState: IFlightSearchState | null = null;

  @Output() showEditForm = new EventEmitter();

  editClick() {
    this.showEditForm.emit();
  }

  get persons() {
    return this.flightSearchState ? this.flightSearchState.adults + this.flightSearchState.child + this.flightSearchState.infants : 0;
  }
}
