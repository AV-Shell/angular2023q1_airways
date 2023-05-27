import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { IAppState, ICommonState, TDataFormat, TMoneyFormat } from 'src/app/store/models';
import { commonStateSelector } from 'src/app/store/selectors';
import { Observable } from 'rxjs';
import { changeDataFormatValue, changeMoneyFormatValue } from 'src/app/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class HeaderComponent implements OnInit {
  step = 0;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  datas = [
    { value: 'MM/DD/YYYY', selected: true },
    { value: 'DD/MM/YYYY', selected: true },
    { value: 'YYYY/DD/MM', selected: true },
    { value: 'YYYY/MM/DD', selected: true },
  ];

  moneys: Array<TMoneyFormat> = ['EUR', 'USD', 'RUB', 'PLN'];

  public commonState!: Observable<ICommonState>;

  constructor(private _formBuilder: FormBuilder, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.commonState = this.store.select(commonStateSelector);
  }

  //TODO:
  log(data: unknown) {
    console.log('this step', this.step);
    console.log(data);
  }

  onChangeDataFormat(data: { value: TDataFormat }) {
    this.store.dispatch(changeDataFormatValue({ value: data.value }));
  }
  onChangeMoneyFormat(data: { value: TMoneyFormat }) {
    this.store.dispatch(changeMoneyFormatValue({ value: data.value }));
  }
}
