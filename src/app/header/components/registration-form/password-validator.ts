import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const errorList: { [key: string]: string } = {};
        if (!control.value) {
            return null;
        }

        if (control.value.length < min) {
            errorList['minLength'] = `${min} characters`;
        }

        if (!control.value.match(/[A-Z]/)) {
            errorList['uppercase'] = ` 1 uppercase letter`;
        }

        if (!control.value.match(/[a-z]/)) {
            errorList['lowercase'] = ` 1 lowercase letter`;
        }

        if (!control.value.match(/[0-9]/)) {
            errorList['number'] = ` 1 digit`;
        }

        if (!control.value.match(/[^a-zA-Z0-9]/)) {
            errorList['symbol'] = ` 1 specific character`;
        }

        return Object.keys(errorList).length !== 0 ? { invalidPassword: errorList } : null;
    };
}
