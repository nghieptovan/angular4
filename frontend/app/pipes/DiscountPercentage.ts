import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'percentize'})
export class DiscountPercentagePipe implements PipeTransform {

    transform(value: any, args: any) {
        const currentPrice = Number.parseFloat(value);
        const basePrice = Number.parseFloat(args);
        const percent = (((basePrice - currentPrice) / basePrice) * 100).toFixed(0);
        return percent ? percent + '%' : null;
    }
}
