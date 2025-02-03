import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEmailValidator(emailControlName: string, confirmEmailControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const email = formGroup.get(emailControlName);
    const confirmEmail = formGroup.get(confirmEmailControlName);

    if (email?.value !== confirmEmail?.value) {
      confirmEmail?.setErrors({ 'emailMismatch': true });
    } else {
      confirmEmail?.setErrors(null);
    }

    return null;
  };
}