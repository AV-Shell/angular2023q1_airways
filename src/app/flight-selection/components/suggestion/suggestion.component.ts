import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IFlightInfoExt, IFormats } from 'src/app/store/models';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements OnInit, OnDestroy {
  @Input() from = false;
  @Input() formats: IFormats | undefined;
  @Input() value: IFlightInfoExt[] | undefined;

  @Output() showEditForm = new EventEmitter();

  // TODO: change to State/
  fromText = 'Warsaw Modlin';
  toText = 'Dublin';

  ngOnInit(): void {
    console.log();
  }

  ngOnDestroy(): void {
    console.log();
  }
}
