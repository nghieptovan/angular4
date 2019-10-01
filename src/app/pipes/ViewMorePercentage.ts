import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'vm_percentize'})
export class ViewMorePercentagePipe implements PipeTransform {

    transform(value: any, args: any) {
        const current = Number.parseFloat(value);
        const base = Number.parseFloat(args);
        const percent = ((current / base) * 100).toFixed(0);

        return percent ? percent + '%' : '0 %';
    }
}
