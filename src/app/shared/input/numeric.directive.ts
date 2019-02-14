import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


export const pattern = /^[0-9]*$/;

/**
 * Validator for number
 * Checks for number in string field
 */
export function numericValidator(): ValidatorFn {
    return control => {
        const value = control.value;
        if (typeof value === 'string' && !pattern.test(control.value)) {
            control.patchValue(control.value.replace(/[^0-9]/, ''), { emitEvent: false });
        }
        
        return null;
    };
}


@Directive({
    selector: '[appNumeric]',
    providers: [{provide: NG_VALIDATORS, useExisting: NumericValidatorDirective, multi: true}]
})
export class NumericValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        return numericValidator()(control);
    }
    
}

