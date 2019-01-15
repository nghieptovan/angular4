import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

@Directive({
    selector: '[expiredDateValidator][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: ExpiredDateValidatorDirective, multi: true }
    ]
})
export class ExpiredDateValidatorDirective implements Validator {

    validator: ValidatorFn;
    constructor() {
        this.validator = this.expiredDateValidator();
    }
    validate(c: FormControl) {
        return this.validator(c);
    }

    normalizeYear(year){
        // Century fix
        const YEARS_AHEAD = 20;
        if (year<100){
            const nowYear = new Date().getFullYear();
            year += Math.floor(nowYear/100)*100;
            if (year > nowYear + YEARS_AHEAD){
                year -= 100;
            } else if (year <= nowYear - 100 + YEARS_AHEAD) {
                year += 100;
            }
        }
        return year;
    }

    expiredDateValidator(): ValidatorFn {
        return (c: FormControl) => {
            if(c.value){
                const match = c.value.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
                if (!match){
                    return { expiredDateValidator: { valid: false } };
                }

                const exp = new Date(this.normalizeYear(1*match[2]),1*match[1]-1,1).valueOf();
                const now = new Date();
                const currMonth = new Date(now.getFullYear(),now.getMonth(),1).valueOf();
                if (exp < currMonth){
                    return { expiredDateValidator: { valid: false } };
                }

                return null;
            }

            return { expiredDateValidator: { valid: false } };
        }
    }
}
