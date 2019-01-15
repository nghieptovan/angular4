import { IsMilkModal } from './../../modals/ismilk/ismilk';
import { IsSupplementModal } from './../../modals/issupplement/issupplement';
import { IsBeerModal } from './../../modals/isbeer/isbeer';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import * as products from '../../store/products/products.actions';
import { GlobalService } from '../../services/global.service';

// Redux
@Component({
    selector: 'app-product',
    templateUrl: './product.html',
    styleUrls: ['./product.less']
})

export class LotteProduct {
    subscriber: Subscription;

    activatedRouteSub: any;
    constructor(private store: Store<fromRoot.AppState>,
        private globalService: GlobalService,
        private dispatcher: Dispatcher,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute) {
    }

    ngAfterViewInit() {
        this.subscriber = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case products.LOAD_PRODUCT_DETAILS_SUCCESS:

                    // Show milk warning dialog
                    if (action.payload.extension_attributes
                        && action.payload.extension_attributes.is_product_milk
                        && localStorage.getItem('milkNotShowAgain') !== 'yes') {
                            this.dialogService.addDialog(IsMilkModal);
                    }else if(
                        action.payload.extension_attributes
                        && action.payload.extension_attributes.is_supplement
                        && localStorage.getItem('supplementNotShowAgain') !== 'yes'
                    ){
                            this.dialogService.addDialog(IsSupplementModal);
                    }else if(
                        action.payload.extension_attributes
                        && action.payload.extension_attributes.is_beer
                        && localStorage.getItem('beerNotShowAgain') !== 'yes'
                    ){
                        this.dialogService.addDialog(IsBeerModal);
                    }
                    break;
                case common.LOAD_URL_INFO_SUCCESS:
                    if (action.payload.type === 'product') {
                        const productId = action.payload.product.id;
                        const productSku = action.payload.product.sku;
                        this.store.dispatch(new common.LoadTrackingCode({ type: 'product', id: productId }));
                    }
                    break;
                default:
                    break;
            }
        });

        this.store.dispatch(new common.SetProductPage());

        this.activatedRouteSub = this.activatedRoute.params.subscribe(() => {
            this._initComponent();
        });
    }

    ngOnDestroy() {
        if (this.activatedRouteSub) {
            this.activatedRouteSub.unsubscribe();
        }

        this.globalService.removeTrackingCode();
        this.store.dispatch(new common.ResetProductPage());
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }

    _initComponent() {
        const productSlug = this.activatedRoute.params['value'].slug;
        const productId = this.activatedRoute.params['value'].id;
        this.store.dispatch(new products.LoadProductDetails(productId));
        this.store.dispatch(new products.LoadProductsRelated(productId));
        this.store.dispatch(new products.GetProductReviews(productId));
        this.store.dispatch(new common.LoadUrlInfo({ type: 'product', slug: productSlug, id: productId }));
    }
}
