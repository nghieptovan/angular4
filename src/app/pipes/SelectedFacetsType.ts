import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'facetstype'})
export class SelectedFacetsPipeType implements PipeTransform {
    transform(state: any, type: string) {
        const arr = [];
        if (state.requestBody.params && state.requestBody.params.facetFilters) {
            _.each(state.requestBody.params.facetFilters, (filter) => {
                _.each(filter[Object.getOwnPropertyNames(filter)[0]], (value) => {
                    const tmp = Object.getOwnPropertyNames(filter)[0];
                    if(type === tmp){
                        arr.push({
                            type: tmp,
                            name: value,
                            isChecked: true
                        });
                    }
                });
            });
        }

        if (state.requestBody.params && state.requestBody.params.numericFilters) {
            const priceFilter = state.requestBody.params.numericFilters;
            if (priceFilter[0].price_default.gte) {
                arr.push({type: 'price', name: '>= ' + priceFilter[0].price_default.gte.toString().toVndCurrency(), isGreaterThan: true});
            }

            if (priceFilter[0].price_default.lte) {
                arr.push({type: 'price', name: '<= ' + priceFilter[0].price_default.lte.toString().toVndCurrency(), isGreaterThan: false});
            }
        }
        return arr;
    }
}
