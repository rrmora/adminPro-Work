import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControlsValidationService {

  constructor() { }
  public validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true, emitEvent: true });


        /* const controlErrors: ValidationErrors = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log({
              'control': field,
              'error': keyError,
              'value': controlErrors[keyError]
            });
          });
        } */
        // if(!control.valid)
        //     console.log(field + ' not valid. Value: ' + control.value + ' Errors: ' + JSON.stringify(control.errors))
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  public validateControl(control: FormControl) {         //{1}

  if (control instanceof FormControl) {             //{4}
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({onlySelf: true });
    control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }
}
}
