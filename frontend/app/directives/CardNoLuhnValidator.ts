import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

@Directive({
    selector: '[cardNoLuhnValidator][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: CardNoLuhnValidatorDirective, multi: true }
    ]
})
export class CardNoLuhnValidatorDirective implements Validator {

    validator: ValidatorFn;
    constructor() {
        this.validator = this.cardNoLuhnValidator();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

    cardNoLuhnValidator(): ValidatorFn {
        return (c: FormControl) => {
            if(c.value && this._luhnAlgorithm(c.value.toString())){
                return null;
            } else {
                return { cardNoLuhnValidator: { valid: false } };
            }
        }
    }

    private _luhnAlgorithm(cardNo: string){
        // remove non-numerics
        const v = "0123456789";
        let w:any = "", i, j, k, m, c, a, x;
        for (i = 0; i < cardNo.length; i++) {
            x = cardNo.charAt(i);
            if (v.indexOf(x, 0) != -1) w += x;
        }

        if(!(w.length >= 16 && w.length <= 19)){
            return false;
        }

        // validate number
        j = w.length / 2;
        k = Math.floor(j);
        m = Math.ceil(j) - k;
        c = 0;
        for (i = 0; i < k; i++) {
            a = w.charAt(i * 2 + m) * 2;
            c += a > 9 ? Math.floor(a / 10 + a % 10) : a;
        }
        for (i = 0; i < k + m; i++) {
            c += w.charAt(i * 2 + 1 - m) * 1;
        }
        return (c % 10 === 0);
    }
}
