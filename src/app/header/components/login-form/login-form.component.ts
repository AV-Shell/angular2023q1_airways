import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tryLogin } from 'src/app/store/actions';
import { IAppState } from 'src/app/store/models';
import { userSelector } from 'src/app/store/selectors';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public hide = true;

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private subs!: Subscription;

  constructor(private store: Store<IAppState>, private dialogRef: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {
    this.subs = this.store.select(userSelector).subscribe(data => {
      this.form.setErrors({ error: data.loginError });

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

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(tryLogin({ values: { email: this.form.value.email, password: this.form.value.password } }));
    }
  }
}
