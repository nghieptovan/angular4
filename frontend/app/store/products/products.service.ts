import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import {Ship60Service} from "../shipping-service/ship60.service";

@Injectable()
export class ProductsService {
    page: any;

    constructor(private httpService: HttpService, private ship60: Ship60Service) {

    }

    getProducts(key, params, type) {
        const data = _.cloneDeep(params);
        data.page--;
        data.analyticsTags = 'pc';
        switch (type) {
            case 'category':
                return this.httpService.postElastic(`categories/` + key + `/products`, { params: data });
            case 'brand':
                // if (!data.facetFilters) {
                //     data.facetFilters = [{
                //         'product_brand_id': key
                //     }];
                // } else {
                //     data.facetFilters.push({
                //         'product_brand_id': key
                //     });
                // }
                //
                // return this.httpService.postElastic(`products/query`, { params: data });
                return this.httpService.postElastic(`brand/`+ key + `/products`, { params: data });
            case 'vendor':
                // if (!data.facetFilters) {
                //     data.facetFilters = [{
                //         'vendor_id': [key]
                //     }];
                // } else {
                //     data.facetFilters.push({
                //         'vendor_id': [key]
                //     });
                // }
                // return this.httpService.postElastic(`products/query`, { params: data });
                return this.httpService.postElastic(`vendors/`+ key + `/products`, { params: data });
            case 'search':
                return this.httpService.postElastic(`products/query`, { params: data });
            case 'tpo_detail':
                return this.httpService.postElastic('hashtags/' + key + '/products', {params: data});
            default:
                break;
        }
    }

    checkOmniBlink(key, type){
        let data = {
            page: 0,
            hitsPerPage:0,
            facets: [
                {
                    "type":"mkt_delivery_time",
                    "limit":500
                },
                {
                    "type":"memberships",
                    "limit":500
                }
            ]
        };
        switch (type) {
            case 'category':
                return this.httpService.postElastic(`categories/` + key + `/products`, { params: data });
            case 'brand':
                return this.httpService.postElastic(`brand/`+ key + `/products`, { params: data });
            case 'vendor':
                return this.httpService.postElastic(`vendors/`+ key + `/products`, { params: data });
            case 'search':
                data['query'] = key;
                return this.httpService.postElastic(`products/query`, { params: data });
            case 'tpo_detail':
                return this.httpService.postElastic('hashtags/' + key + '/products', {params: data});
            default:
                break;
        }
    }

    searchProduct(filter) {
        return this.httpService.postElastic('products/query',
            { 'params': 'query=' + filter.keyword + '&hitsPerPage=' + filter.pageSize + '&page=' + filter.page + '&analyticsTags=autocomplete' });
    }

    getSearchCampaign(key) {
        return this.httpService.postElastic('campaigns/query', { 'params': 'query=' + key + '&&hitsPerPage=3' });
    }

    getSearchSuggestion(key) {
        return this.httpService.postElastic('search_query/suggestions', { 'params': 'query=' + key + '&analyticsTags=autocomplete' });
    }

    getRelatedProducts(productId) {
        return this.httpService.getAnonymous('lotte_product/related/' + productId);
    }

    loadShippingRules(productId, region) {
        return this.httpService.getAnonymous('lotte_carts/shipping-rule-product?product_id=' + productId
            + '&region_id=' + region.cityId
            + '&district_id=' + region.districtId
            + '&ward_id=' + region.wardId
        );
    }

    loadExpressShippingRules(data) {
        return this.ship60.getShippingRules(data);
    }

    loadAdditionalDetails(productId) {
        // return this.httpService.getAnonymous('lotte_product/details?id=' + productId + '&isDetailPage=1');
        return this.httpService.getElastic('products/' + productId + '/detail');
    }

    loadReviews(productId) {
        return this.httpService.getAnonymous('lotte_product/product_reviews?product_id=' + productId);
    }

    postReview(payload) {
        if (localStorage.getItem('token')) {
            return this.httpService.post('lotte_product/product_reviews', payload);
        } else {
            return this.httpService.postAnonymous('lotte_product/product_reviews', payload);
        }
    }

    registerStockAlert(payload) {
        return this.httpService.postAnonymous('productalert/add/stock', payload);
    }
}
