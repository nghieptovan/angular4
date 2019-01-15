import { PaymentMethodTransformer } from './../../transformers/PaymentMethodTransformer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../../services/global.service';
import { HttpService } from '../../services/http.service';
import * as common from '../common/common.actions';
import * as fromRoot from '../index';
import * as products from './products.actions';
import { ProductsService } from './products.service';

declare var $;
@Injectable()
export class ProductEffects {
    page: any;
    category: any;
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private productsService: ProductsService,
        private store: Store<fromRoot.AppState>,
        private globalService: GlobalService) {
        this.store.select(fromRoot.categoriesGetEntities)
            .subscribe((category: any) => {
                if (category.level2) {
                    this.category = category.level2;
                } else {
                    if (category.level1) {
                        this.category = category.level1;
                    } else {
                        this.category = category;
                    }
                }
            });
    }

    @Effect()
    loadProducts$ = this._actions.ofType(products.LOAD)
        .switchMap((action) =>
            this.productsService.getProducts(action.payload.key, action.payload.params, action.payload.type)
                .map((data) => {
                    setTimeout(() => {
                        this.updateTrackingCodeProducts(data.json());
                        if (action.payload.type !== 'search') {
                            this.store.dispatch(new common.LoadTrackingCode({ type: action.payload.type, id: action.payload.key }));
                        } else {
                            this.store.dispatch(new common.LoadTrackingCode({ type: action.payload.type, q: action.payload.key, id: 'null' }));
                        }
                    }, 300);
                    return new products.LoadSuccess({ products: data.json(), requestBody: action.payload });
                }).catch((error) => {
                    return Observable.of(new products.LoadFailed(error));
                })
        );

    @Effect()
    loadProductDetails$ = this._actions.ofType(products.LOAD_PRODUCT_DETAILS)
        .switchMap((action) => this.productsService.loadAdditionalDetails(action.payload)
            .map(resp => {
                const data = resp.json();
                // Fake out of stock
                // data.extension_attributes.stock_item.is_in_stock = 0;
                return new products.LoadProductDetailsSuccess(data);
            }).catch((error) => {
                return Observable.of(new products.LoadProductDetailsFailed(error));
            })
        );

    @Effect()
    LoadProductsRelated$ = this._actions.ofType(products.LOAD_PRODUCT_RELATED)
        .switchMap((action) => this.productsService.getRelatedProducts(action.payload)
            .map(data => {
                return new products.LoadProductsRelatedSuccess(data.json());
            })
        ).catch((error) => {
            return Observable.of(new products.LoadProductsRelatedFailed(error));
        });

    @Effect()
    searchProduct$ = this._actions.ofType(products.SEARCH_PRODUCT)
        .switchMap((action) => {
            const searchProduct = this.productsService.searchProduct(action.payload);
            const searchProductSuggestion = this.productsService.getSearchSuggestion(action.payload.keyword);
            const observableArr = [];
            observableArr.push(searchProduct);
            observableArr.push(searchProductSuggestion);
            return Observable.forkJoin(observableArr)
                .map(search => {
                    return new products.SearchProductSuccess(search);
                }).catch((error) => {
                    return Observable.of(new products.SearchProductFailed(error));
                });
        });

    @Effect()
    loadShippingRules = this._actions.ofType(products.PRODUCT_LOAD_SHIPPING_RULE)
        .switchMap((action) =>
            this.productsService.loadShippingRules(action.payload.productId, action.payload.region)
                .map((resp) => {
                    return new products.ProductLoadShippingRuleSuccess(resp.json());
                })
        ).catch((error) => {
            return Observable.of(new products.ProductLoadShippingRuleFailed(error));
        });

    @Effect()
    loadExpressShippingRules = this._actions.ofType(products.PRODUCT_LOAD_EXPRESS_SHIPPING_RULE)
        .switchMap((action) =>
            this.productsService.loadExpressShippingRules(action.payload.data)
                .map((resp) => {
                    return new products.ProductLoadExpressShippingRuleSuccess(resp.json());
                })
        ).catch((error) => {
            return Observable.of(new products.ProductLoadExpressShippingRuleFailed(error));
        });

    @Effect()
    loadAdditionalDetails$ = this._actions.ofType(products.LOAD_ADDITIONAL_DETAILS)
        .switchMap((action) =>
            this.productsService.loadAdditionalDetails(action.payload)
                .map((resp) => {
                    return new products.LoadAdditionalDetailsSuccess(resp.json());
                })
        ).catch((error) => {
            return Observable.of(new products.LoadAdditionalDetailsFailed(error));
        });

    @Effect()
    loadReviews$ = this._actions.ofType(products.GET_PRODUCT_REVIEWS)
        .switchMap((action) =>
            this.productsService.loadReviews(action.payload)
                .map((resp) => {
                    const data = resp.json();
                    /* for (let i = 0; i = 20; i++) {
                        data.reviews.push({
                            'review_id': '788',
                            'created_at': '2017-10-18 07:51:59',
                            'entity_id': '2',
                            'entity_pk_value': '426917',
                            'status_id': '1',
                            'rel_entity_pk_value': null,
                            'helpfulness_yes': '0',
                            'helpfulness_no': '0',
                            'helpfulness_pcnt': null,
                            'approved_date': null,
                            'status_before': null,
                            'customer_buy': '0',
                            'detail_id': '788',
                            'title': 'Title',
                            'detail': 'cho mình hỏi sản phẩm này bảo hành 2 năm bằng giấy bảo hành là bảo hành tại cửa hàng hay là bảo hành quốc tế ạ??',
                            'nickname': 'Ngọc Uyên Phương',
                            'customer_id': '148946',
                            'percent': '20',
                            'value': '1',
                            'entity_code': 'product'
                        });
                    }*/
                    return new products.GetProductReviewsSuccess(data);
                })).catch((error) => {
                    return Observable.of(new products.GetProductReviewsFailed(error));
                });

    @Effect()
    postReview$ = this._actions.ofType(products.POST_PRODUCT_REVIEW)
        .switchMap((action) =>
            this.productsService.postReview(action.payload)
                .map((resp) => {
                    return new products.PostProductReviewSuccess(resp.text());
                })).catch((error) => {
                    return Observable.of(new products.PostProductReviewFailed(error));
                });

    @Effect()
    registerStockAlert$ = this._actions.ofType(products.REGISTER_STOCK_ALERT)
        .switchMap((action) =>
            this.productsService.registerStockAlert(action.payload)
                .map((resp) => {
                    return new products.RegisterStockAlertSuccess(resp.json());
                })).catch((error) => {
                    return Observable.of(new products.RegisterStockAlertFailed(error));
                });

    @Effect()
    getSearchSuggestion$ = this._actions.ofType(products.GET_SEARCH_SUGGESTION)
        .switchMap((action) => {
            return this.productsService.getSearchSuggestion('')
                .map(search => {
                    return new products.GetSearchSuggestionSuccess(search.json());
                }).catch((error) => {
                    return Observable.of(new products.GetSearchSuggestionFailed(error));
                });
        });

    @Effect()
    getSearchCampaign$ = this._actions.ofType(products.GET_SEARCH_CAMPAIGN)
        .switchMap((action) => {
            return this.productsService.getSearchCampaign(action.payload)
                .map(search => {
                    return new products.GetSearchCampaignSuccess(search.json());
                }).catch((error) => {
                    return Observable.of(new products.GetSearchCampaignFailed(error));
                });
        });

    @Effect() checkOmniBlink$ = this._actions.ofType(products.CHECK_OMNI_BLINK)
        .switchMap(action => {
            return this.productsService.checkOmniBlink(action.payload.key, action.payload.type).map(result => {
                const temp = result.json();
                if (temp) {
                    return new products.CheckOmniBlinkSuccess({ facets: temp.facets});
                } else {
                    return Observable.of(new products.CheckOmniBlinkFailed(null));
                }
            }).catch(error => {
                return Observable.of(new products.CheckOmniBlinkFailed(error));
            });
        });

    updateTrackingCodeProducts(data) {
        const products = this.mapProductsWithTracking(data.hits);
        window['LTAPITRACKINGPRODUCTS'] = products;
    }

    mapProductsWithTracking(products) {
        const result = _.map(products, (product: any) => {
            return {
                name: product.name,
                id: product.sku,
                price: product.price_default.toString(),
                brand: product.product_brand,
                variant: '',
                position: 1,
                category: this.category ? this.category.path_formatted : ''
            };
        });
        return result;
    }
}
