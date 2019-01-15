import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import {VendorPriorityConstants} from "../components/base/products/constants/VendorPriorityConstant";

@Pipe({ name: 'shipping_rule' })
export class ShippingRule implements PipeTransform {
    transform(item_id: number, group: any): any{
        if (group) {
            const rule = group.find((x: any) => {
                // return parseInt(x.item_id, 10) === parseInt(id, 10);
                return x.items.find((item) => {
                    return item.toString() === item_id.toString();
                });
            });
            if (rule) {
                return rule;
            }
        }
        return false;
    }
}

