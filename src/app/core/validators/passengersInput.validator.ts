import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passengersInputValidator: ValidatorFn = (c: AbstractControl) => {
  const group: FormGroup = c as FormGroup;

  const control1 = group.controls['adults'];
  const control2 = group.controls['child'];
  const control3 = group.controls['infants'];
  if (isNaN(control1.value) || isNaN(control2.value) || isNaN(control3.value)) {
    const ve: ValidationErrors = { valueMustBeANumber: 'Value must be a number' };
    return ve;
  }
  if (control1.value < 0 || control2.value < 0 || control3.value < 0 || control1.value + control2.value + control3.value <= 0) {
    const ve: ValidationErrors = { valueMustBeGreaterThanNull: "Passengers can't be zero" };
    return ve;
  }
  return null;
};
