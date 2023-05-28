import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const requiredWhenValidator = (masterFieldName: string, masterFieldValue: any, validatorsArray: ValidatorFn[]) => {
  const validatorFn: ValidatorFn = (control: AbstractControl) => {
    // @ts-ignore
    const masterField: AbstractControl | null = control.parent?.controls[masterFieldName];

    if (masterField instanceof AbstractControl && masterField.value === masterFieldValue) {
      console.log('validete requiredWhenValidator')
      for (const validator of validatorsArray) {
        const resp: ValidationErrors | null = validator(control);
        if (resp) {
          return resp;
        }
      }
    } else {
      console.log('else', {masterField, i: masterField instanceof AbstractControl, v: masterField?.value === masterFieldValue, masterFieldValue, masterFieldvalue2: masterField?.value })
    }

    return null;
  };

  return validatorFn;
};



export const vv:  ValidatorFn = (control: AbstractControl) => {
  console.log('vv validate')
  return null
}
