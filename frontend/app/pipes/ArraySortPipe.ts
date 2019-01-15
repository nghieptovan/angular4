import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import {VendorPriorityConstants} from "../components/base/products/constants/VendorPriorityConstant";

@Pipe({ name: 'array_sort' })
export class ArraySortPipe implements PipeTransform {
    compare(x: string, y: string, sortby: string){
        let compare = x.toString().localeCompare(y.toString());
        if(compare === 0){
            return 0
        }

        return sortby === 'asc'?compare:-compare;
    }

    transform(array: Array<Object>, prop:string = null, sortby:string = 'asc', max:number = -1): Array<Object>{
        if(array === undefined)
            return undefined;

        array.sort((a: any, b: any) => {
            const x = prop !== null?a[prop]:a;
            const y = prop !== null?b[prop]:b;

            const pa = VendorPriorityConstants.vendors[x.toString().trim()];
            const pb = VendorPriorityConstants.vendors[y.toString().trim()];
            let temp = 0;

            if(pa && pb){
                temp = this.compare(pa.toString(), pb.toString(), sortby);
            } else if(pa) {
                temp = sortby === 'asc'?-1:1;
            } else if(pb){
                temp = sortby === 'asc'?1:-1;
            } else {
                temp = this.compare(x.toString(), y.toString(), sortby);
            }

            return temp;
        });

        if(max === -1) {
            return array;
        }

        if(max > 0 && array.length > max) {
            return array.slice(array.length - max);
        }

        return array;
    }
}

