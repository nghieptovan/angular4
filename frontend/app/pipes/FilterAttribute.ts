import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'attribute' })
export class FilterAttributePipe implements PipeTransform {
    transform(attributes: any, params: any) {
        const attr = _.find(attributes, (item: any) => {
            return params.attribute_code === params;
        });

        if (attr) {
            return attr.value;
        }

        return '';
    }
}
