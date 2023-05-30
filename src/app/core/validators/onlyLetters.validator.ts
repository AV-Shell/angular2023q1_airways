import { AbstractControl, ValidatorFn } from '@angular/forms';

const IS_HAS_NO_LETTERS_REGEX = /[^\p{Alpha}\p{M}\p{Join_C}]/u;

export const onlyLettersValidator: ValidatorFn = (control: AbstractControl) => {
  if (typeof control.value === 'string' && control.value.search(IS_HAS_NO_LETTERS_REGEX) === -1) {
    return null;
  }
  return { onlyLetters: 'Your name must contain only letters' };
};
