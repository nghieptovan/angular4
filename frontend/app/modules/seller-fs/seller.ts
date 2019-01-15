import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Dispatcher } from '@ngrx/store';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as common from '../../store/common/common.actions';
import * as products from '../../store/products/products.actions';
import {FacetsDefaultConstants} from "../../components/base/products/constants/FacetsDefaultConstants";
import * as checkout from '../../store/checkout/vendor-checkout/checkout.actions';
import {CART_TYPE, CartManagement} from "../../components/base/cart/CartManagement";
import * as vendor from '../../store/vendor/vendor.actions';
import * as auth from '../../store/auth/auth.actions';
import {LocalStorageManagement} from "../../components/base/LocalStorageManagement";

declare var $;
@Component({
    selector: 'app-vendor-fs',
    templateUrl: './seller.html',
    styleUrls: ['./seller.less']
})

export class LotteSellerFS {
    currentParams: any;
    currentFilter: any;

    urlInfoSub: any;
    sellerName: any;
    isLandingStyle: boolean = false;
    vendorInfoSub: any;
    vendorInfo:any;
    vendorLandingSettingSub: any;
    vendorLandingSetting: any;

    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dispatcher: Dispatcher,
        private globalService: GlobalService) {

        // this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo).subscribe(info => {
        //     if (!info.vendor) {
        //         this.store.dispatch(new products.ResetProductState());
        //     }
        //     if (info.type === 'vendor') {
        //         this.loadProductsByVendor(info.vendor.id);
        //         this.sellerName = info.vendor.vendor_name;
        //     }
        // });

        // //fixme: remove this line after create attr on magento
        // this.isLandingStyle = this.currentFilter.landing;

        this.vendorInfoSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            if (vendorInfo) {
                this.vendorInfo = vendorInfo;
                this.isLandingStyle = vendorInfo.landing_type;
                this.store.dispatch(new products.ResetProductState());
                this.sellerName = vendorInfo.name;

                if (this.isLandingStyle) {
                    this.currentFilter = this.activatedRoute.snapshot.queryParams;
                    // if(vendorInfo && [101433, 101713].indexOf(parseInt(vendorInfo.id)) !== -1
                    //     && !(this.currentFilter.mode && this.currentFilter.mode.toLocaleLowerCase() === 'private2310')){
                    //     this.router.navigateByUrl('404', { skipLocationChange: true });
                    // }

                    this.loadCart(this.vendorInfo.id);
                    this.store.dispatch(new vendor.LoadLandingSetting({id: this.currentParams}));
                } else {
                    this.loadProductsByVendor(vendorInfo.id);
                }
            }
        });

        this.vendorLandingSettingSub = this.store.select(fromRoot.vendorGetLandingSetting).subscribe(setting => {
            if(setting && this.vendorInfo && this.vendorInfo.id) {
                this.vendorLandingSetting = setting;
                this.loadProductsByVendor(this.vendorInfo.id);
            }
        });

        this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case auth.LOGIN_SUCCESS:
                    const vendorCartIds = LocalStorageManagement.getInstance().getStorageVendorCart();
                    if(!(vendorCartIds && vendorCartIds[this.vendorInfo.id])){
                        this.loadCart(this.vendorInfo.id);
                    }
                    break;
                default:
                    break;
            }
        });

        this._registerRouterChangeEvents();
    }

    ngAfterViewInit() {
        this.currentFilter = this.activatedRoute.snapshot.queryParams;
    }

    _registerRouterChangeEvents() {
        this.activatedRoute.params.subscribe((params: any) => {
            // if (this.currentParams !== params.slug) {
            if (this.currentParams !== params.id) {
                this.store.dispatch(new vendor.Load({ id: params.id }));
                // this.store.dispatch(new common.LoadUrlInfo({ type: 'seller', slug: params.slug, id: params.id }));
                // this.currentParams = params.slug;
                this.currentParams = params.id;
            }
        });
    }

    loadCart(vendorId){
        CartManagement.getInstance(this.store).loadCart({
            type: CART_TYPE.VENDOR_CART,
            id: vendorId,
        });
    }

    loadProductsByVendor(vendorId) {
        let sortOrder = this.vendorLandingSetting && this.vendorLandingSetting.sort_field?this.vendorLandingSetting.sort_field:FacetsDefaultConstants.orderDefault;
        if (this.currentFilter) {
            const requestBody = {
                key: vendorId,
                priceMax: 0,
                type: 'vendor',
                params: this.globalService.parseParamsToRequestBody(this.currentFilter)
            };
            requestBody.params.order = requestBody.params.order?requestBody.params.order:sortOrder;
            if(this.isLandingStyle && requestBody.params) requestBody.params.hitsPerPage = 30;
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        } else {
            const actionPayload = {
                key: vendorId,
                params: {
                    page: 1,
                    hitsPerPage: this.isLandingStyle?30:40,
                    facets: FacetsDefaultConstants.facets,
                    order: sortOrder
                },
                type: 'vendor'
            };

            if (actionPayload.key) {
                this.store.dispatch(new products.Load(actionPayload));
            }
        }
    }

    ngOnDestroy() {
        // this.urlInfoSub.unsubscribe();
        this.store.dispatch(new vendor.clearStage());
        this.globalService.removeTrackingCode();
        this.vendorLandingSettingSub.unsubscribe();
    }
}
