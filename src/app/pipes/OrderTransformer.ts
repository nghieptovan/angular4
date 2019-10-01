import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'orderTransformer'})
export class OrderTransformerPipe implements PipeTransform {
    transform(value: any, args: any) {
        return value.map((item) => {
            if (!item.new_qty) {
                item.new_qty = _.clone(item.qty);
            }
            item.is_in_stock = item.in_stock - item.qty >= 0;
            return item;
        });
    }
}
