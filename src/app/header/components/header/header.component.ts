import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS, StepState } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { IAppState, ICommonState, TDataFormat, TMoneyFormat } from 'src/app/store/models';
import { commonStateSelector, userSelector } from 'src/app/store/selectors';
import { Observable, Subscription } from 'rxjs';
import { changeDataFormatValue, changeMoneyFormatValue } from 'src/app/store/actions';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

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
  name = 'Lena';
  animal!: string;

  step = 0;
  isLogged = false;
  fullName = '';

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

  urlsWithStepper = ['/flight-selection', '/passengers-info', '/summary'];

  moneys: Array<TMoneyFormat> = ['EUR', 'USD', 'RUB', 'PLN'];

  public commonState!: Observable<ICommonState>;

  private sub!: Subscription;

  public showStepper = false;
  public isMainPage = true;

  public myStep: { s1: StepState; s2: StepState; s3: StepState } = {
    s1: 'number',
    s2: 'number',
    s3: 'number',
  };

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private store: Store<IAppState>, private router: Router) {}

  ngOnInit(): void {
    this.commonState = this.store.select(commonStateSelector);

    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showStepper = this.urlsWithStepper.includes(event.url);
        this.isMainPage = event.url === '/main' || event.url === '/';

        switch (event.url) {
          case '/main':
          case '/':
            this.myStep.s1 = 'number';
            this.myStep.s2 = 'number';
            this.myStep.s3 = 'number';
            break;
          case '/flight-selection':
            this.myStep.s1 = 'edit';
            this.myStep.s2 = 'number';
            this.myStep.s3 = 'number';
            break;
          case '/passengers-info':
            this.myStep.s1 = 'done';
            this.myStep.s2 = 'edit';
            this.myStep.s3 = 'number';
            break;
          case '/summary':
            this.myStep.s1 = 'done';
            this.myStep.s2 = 'done';
            this.myStep.s3 = 'edit';
            break;

          default:
            break;
        }
      }
    });

    this.sub.add(
      this.store.select(userSelector).subscribe(data => {
        this.isLogged = !!data.accessToken;

        const fullNamme = this.isLogged ? `${data.user.firstName} ${data.user.lastName}` : '';

        this.fullName = fullNamme.length > 10 ? fullNamme.slice(0, 15) + '...' : fullNamme;
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onLogoClick() {
    this.router.navigate(['/main']);
  }

  log(data: unknown) {
    //stepper selection change
  }

  onChangeDataFormat(data: { value: TDataFormat }) {
    this.store.dispatch(changeDataFormatValue({ value: data.value }));
  }
  onChangeMoneyFormat(data: { value: TMoneyFormat }) {
    this.store.dispatch(changeMoneyFormatValue({ value: data.value }));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  openSettings(): void {
    this.router.navigate(['/settings']);
  }
}
