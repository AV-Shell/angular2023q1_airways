import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './password-validator';
import { onlyLettersValidator } from 'src/app/core/validators/onlyLetters.validator';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/store/models';
import { userSelector } from 'src/app/store/selectors';
import { tryRegister } from 'src/app/store/actions';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  public hide = true;

  public form!: FormGroup;

  public countries = [
    {
      name: 'Afghanistan',
      dialCode: '+93',
      code: 'AF',
    },
    {
      name: 'Aland Islands',
      dialCode: '+358',
      code: 'AX',
    },
    {
      name: 'Albania',
      dialCode: '+355',
      code: 'AL',
    },
    {
      name: 'Algeria',
      dialCode: '+213',
      code: 'DZ',
    },
    {
      name: 'American Samoa',
      dialCode: '+1684',
      code: 'AS',
    },
    {
      name: 'Belarus',
      dialCode: '+375',
      code: 'BY',
    },
    {
      name: 'Belgium',
      dialCode: '+32',
      code: 'BE',
    },
    {
      name: 'Romania',
      dialCode: '+40',
      code: 'RO',
    },
    {
      name: 'Russia',
      dialCode: '+7',
      code: 'RU',
    },
    {
      name: 'Rwanda',
      dialCode: '+250',
      code: 'RW',
    },
    {
      name: 'United Kingdom',
      dialCode: '+44',
      code: 'GB',
    },
    {
      name: 'United States',
      dialCode: '+1',
      code: 'US',
    },
    {
      name: 'Uruguay',
      dialCode: '+598',
      code: 'UY',
    },
  ];

  public maxDate!: Date;

  private subs!: Subscription;

  constructor(private store: Store<IAppState>, private dialogRef: MatDialogRef<LoginDialogComponent>) {}

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get firstName(): AbstractControl | null {
    return this.form.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.form.get('lastName');
  }

  get date(): AbstractControl | null {
    return this.form.get('date');
  }

  get phone(): AbstractControl | null {
    return this.form.get('phone');
  }

  public ngOnInit() {
    const match = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(match)]),
      password: new FormControl('', [Validators.required, passwordValidator(8)]),
      firstName: new FormControl('', [Validators.required, onlyLettersValidator]),
      lastName: new FormControl('', [Validators.required, onlyLettersValidator]),
      date: new FormControl('', [Validators.required]),
      gender: new FormControl('male'),
      phoneCode: new FormControl(this.countries[0].dialCode, [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      citizenship: new FormControl(this.countries[0].code, [Validators.required]),
    });

    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 15, 0, 1);
    this.subs = this.store.select(userSelector).subscribe(data => {
      this.form.setErrors({ error: data.registerError });

      if (data.accessToken) {
        this.closeDialog();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  public register(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formValue = this.form.value;
      const birthDay = new Date(formValue.date).toISOString();

      this.store.dispatch(
        tryRegister({
          values: {
            email: formValue.email,
            password: formValue.password,
            birthDay,
            citizenship: formValue.citizenship,
            countryCode: formValue.phoneCode,
            phoneNumber: formValue.phone,
            gender: formValue.gender,
            termsUse: true,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
          },
        }),
      );
    }
  }
}
