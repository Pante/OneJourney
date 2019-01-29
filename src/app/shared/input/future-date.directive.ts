import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import * as moment from 'moment';


export function futureDateValidator(): ValidatorFn {
    return control => {
        const value = control.value;
        if (typeof value === 'string' && moment(value).isBefore(moment())) {
            return { 'older': true };
        }
        
        return null;
    };
}


@Directive({
    selector: '[appFutureDate]',
    providers: [{provide: NG_VALIDATORS, useExisting: FutureDateValidatorDirective, multi: true}]
})
export class FutureDateValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        return futureDateValidator()(control);
    }
    
}

