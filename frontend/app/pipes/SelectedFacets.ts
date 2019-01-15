import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import {FacetTypeConstants} from "../components/base/products/constants/FacetTypeConstants";

@Pipe({name: 'facets'})
export class SelectedFacetsPipe implements PipeTransform {
    transform(state: any) {
        const arr = [];
        if (state.requestBody.params && state.requestBody.params.facetFilters) {
            _.each(state.requestBody.params.facetFilters, (filter) => {
                _.each(filter[Object.getOwnPropertyNames(filter)[0]], (value) => {
                    const type = Object.getOwnPropertyNames(filter)[0];
                    let name = value;
                    let id = value;

                    if(
                        type === FacetTypeConstants.FACET_TYPE_VENDOR_ID
                        || type === FacetTypeConstants.FACET_MKT_DELIVERY_TIME
                    ) return;

                    // Array use for category, otherwise, use for brand, seller, search ...
                    if(type === FacetTypeConstants.FACET_TYPE_LEAF_CATEGORY){
                        const facet = _.find(state.products.facets[type], item => {
                            if(item.name == name) return item;
                        })

                        if(facet){
                            name = facet.value;
                            id = facet.name;
                        }
                    }

                    arr.push({
                        type: type,
                        value: name,
                        data:{
                            name: name,
                            id: id
                        },
                        isChecked: true
                    });
                });
            });
        }

        if (state.requestBody.params && state.requestBody.params.numericFilters) {
            const priceFilter = state.requestBody.params.numericFilters;
            if(priceFilter[0]){
                let gte = priceFilter[0].price_default.gte? priceFilter[0].price_default.gte:0;
                let lte = priceFilter[0].price_default.lte? priceFilter[0].price_default.lte:0;
                arr.push({
                    type: 'price',
                    data:{
                        name: gte.toString().toVndCurrency() +' - '+ lte.toString().toVndCurrency(),
                        id: ''
                    }
                });
            }
        }
        return arr;
    }
}
