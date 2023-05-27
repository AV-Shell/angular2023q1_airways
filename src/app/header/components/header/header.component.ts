import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { IAppState, ICommonState, TDataFormat, TMoneyFormat } from 'src/app/store/models';
import { commonStateSelector } from 'src/app/store/selectors';
import { Observable, Subscription } from 'rxjs';
import { changeDataFormatValue, changeMoneyFormatValue } from 'src/app/store/actions';
import { NavigationEnd, Router } from '@angular/router';

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
export class HeaderComponent implements OnInit, OnDestroy {
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

  urlsWithStepper = ['/flight-selection'];

  moneys: Array<TMoneyFormat> = ['EUR', 'USD', 'RUB', 'PLN'];

  public commonState!: Observable<ICommonState>;

  private sub!: Subscription;

  public showStepper = false;
  public isMainPage = true;

  constructor(private _formBuilder: FormBuilder, private store: Store<IAppState>, private router: Router) {}

  ngOnInit(): void {
    this.commonState = this.store.select(commonStateSelector);

    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showStepper = this.urlsWithStepper.includes(event.url);
        this.isMainPage = event.url === '/main' || event.url === '/'
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onLogoClick() {
    this.router.navigate(['/main']);
  }

  //TODO:
  log(data: unknown) {
    // console.log('this step', this.step);
    // console.log(data);
  }

  onChangeDataFormat(data: { value: TDataFormat }) {
    this.store.dispatch(changeDataFormatValue({ value: data.value }));
  }
  onChangeMoneyFormat(data: { value: TMoneyFormat }) {
    this.store.dispatch(changeMoneyFormatValue({ value: data.value }));
  }
}
