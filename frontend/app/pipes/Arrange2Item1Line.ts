import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import {VendorPriorityConstants} from "../components/base/products/constants/VendorPriorityConstant";

@Pipe({ name: 'arrange2Item1Line' })
export class Arrange2Item1Line implements PipeTransform {
    transform(array: Array<Object>): Array<Object>{
        let res = [], temp = [];
        _.each(array, (item, idx) => {
            if(idx % 2 === 0){
                temp = [];
                temp.push(item);
                res.push(temp);
            } else {
                temp.push(item);
            }
        });

        return res;
    }
}

