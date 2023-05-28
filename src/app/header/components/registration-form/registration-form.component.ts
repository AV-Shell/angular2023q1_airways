import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './password-validator';
import { onlyLettersValidator } from 'src/app/core/validators/onlyLetters.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
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
  }

  public register(): void {
    this.form.markAllAsTouched();
    // console.log(this.form);
    // if (this.form.valid) {
    // }
  }
}
