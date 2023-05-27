import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss'],
})
export class RequestInfoComponent {
  @Input() showEdit = false;

  @Output() showEditForm = new EventEmitter();

  editClick() {
    this.showEditForm.emit();
  }

  //TODO: change
  destinationFrom = 'Dublin';
  destinationTo = 'Warsaw Modlin';
  twoway = true;
  dateFrom = 'Thu, 27 May 2023 14:22:18 GMT';
  dateTo = 'Thu, 25 May 2023 14:22:18 GMT';
  persons = 111;
  
}
