import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as rechargeAction from '../../../../store/recharge/recharge.actions';

@Component({
    selector: 'app-general-product-list',
    templateUrl: './product-list.html'
})
export class GeneralProductList {

    providerSelectedSub: any
    providerSelected: any

    productLoadSub: any
    productLoads: any

    cartInfoSub: any
    cartInfo: any

    cartRequestSub: any
    cartRequest: any

    selectedPaymentSub: any
    selectedPayment: any

    cartCreateSub: any

    constructor(protected  store: Store<fromRoot.AppState>, protected activatedRoute: ActivatedRoute) {

        this.providerSelectedSub = this.store.select(fromRoot.rechargeSelectProvider).subscribe(providerSelected => {
            this.providerSelected = providerSelected;
        });

        this.productLoadSub = this.store.select(fromRoot.rechargeGetRechargeProduct).subscribe(productLoads => {
            this.productLoads = productLoads;
        });

        this.cartInfoSub = this.store.select(fromRoot.rechargeGetCartInfo).subscribe(cartInfo => {
            this.cartInfo = cartInfo;
        });

        this.cartRequestSub = this.store.select(fromRoot.rechargeGetCartRequest).subscribe(cartRequest => {
            this.cartRequest = cartRequest;
        });

        this.cartCreateSub = this.store.select(fromRoot.rechargeGetCreateCart).subscribe(cartCreate => {
            if (cartCreate.result && cartCreate.reason === 'for_loading') {
                this.store.dispatch(new rechargeAction.UpdateCartProduct({'cartRequest': this.cartRequest}));
            }
        });

        this.selectedPaymentSub = this.store.select(fromRoot.rechargeSelectPayment).subscribe(state => {
            this.selectedPayment = state;
        });

    }

    ngOnInit(): void {
        this.loadProducts();
    }

    ngOnDestroy() {
        this.providerSelectedSub.unsubscribe();
        this.productLoadSub.unsubscribe();
        this.cartInfoSub.unsubscribe();
        this.cartRequestSub.unsubscribe();
        this.selectedPaymentSub.unsubscribe();
    }

    loadProducts() {
        this.store.dispatch(new rechargeAction.LoadProductRecharge(null));
    }

    getPromotionTagDescription(product) {
        const promotionTag = product.promotion_tag;
        const currentPrice = product.price;
        let discountAmount = 0;
        if (promotionTag.simple_action === 'by_percent') {
            discountAmount = currentPrice * promotionTag.discount_amount / 100;
            discountAmount = (discountAmount > promotionTag.max_discount_amount) ? promotionTag.max_discount_amount : discountAmount;
        } else {
            discountAmount = (discountAmount > currentPrice) ? currentPrice : discountAmount;
        }

        if (promotionTag.description) {
            promotionTag.description = promotionTag.description.replace('__COUPON_CODE__', promotionTag.coupon_code);
            promotionTag.description = promotionTag.description.replace('__FINAL_PRICE__', (currentPrice - discountAmount).toString().toVndCurrency());
        }

        promotionTag.description = promotionTag.description === undefined ? '' : promotionTag.description;

        return promotionTag.description;
    }

    isProductVisible(product) {
        if (product.phone_card_provider_code === this.providerSelected.value) {
            return true;
        }
        return false;
    }

    selectProduct(product) {

        const rechargeCartId = localStorage.getItem('rechargeCartId');

        if (this.cartRequest) {
            this.cartRequest.product_id = product.id;
            this.cartRequest.product_name = product.name;
        }

        if (rechargeCartId) {
            this.store.dispatch(new rechargeAction.UpdateCartProduct({'cartRequest': this.cartRequest}));
        } else {
            this.store.dispatch(new rechargeAction.CreateCart(null));
        }
    }
}
