import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const requiredWhenValidator = (masterFieldName: string, masterFieldValue: any, validatorsArray: ValidatorFn[]) => {
  const validatorFn: ValidatorFn = (control: AbstractControl) => {
    // @ts-ignore
    const masterField: AbstractControl | null = control.parent?.controls[masterFieldName];

    if (masterField instanceof AbstractControl && masterField.value === masterFieldValue) {
      for (const validator of validatorsArray) {
        const resp: ValidationErrors | null = validator(control);
        if (resp) {
          return resp;
        }
      }
    }
    return null;
  };

  return validatorFn;
};

