import {AbstractCart} from "./AbstractCart";
import * as checkout from '../../../store/checkout/vendor-checkout/checkout.actions';
import {Action} from "@ngrx/store";
import {LocalStorageConstants} from "../constants/LocalStorageConstants";
import {LocalStorageManagement} from "../LocalStorageManagement";

export class VendorCart extends AbstractCart{
    getCartRecreateAction(cartId):Action{
        return new checkout.CartRecreate({
            cartId: cartId,
            vendorId: this.id
        });
    }

    getCartRefreshAction():Action{
        return new checkout.CartRefresh({vendorId: this.id});
    }

    getCartGetPaymentRulesAction(): Action {
        return new checkout.CartGetPaymentRules();
    }

    getCartUpdatePaymentInformationAction(info: any): Action {
        info.vendorId = this.id;
        return new checkout.CartUpdatePaymentInformation(info);
    }

    getCartCCTransactionRequestAction(info: any): Action {
        return new checkout.CartCCTransactionRequest(info);
    }

    getCartSetPaymentMethodAction(info: any): Action {
        info.vendorId = this.id;
        return new checkout.CartSetPaymentMethod(info);
    }

    getCartGetPaymentMethodsAction(): Action {
        return new checkout.CartGetPaymentMethods(this.id);
    }

    getCartLoadShippingRuleAction(region: any): Action {
        region.vendorId = this.id;
        return new checkout.CartLoadShippingRule(region);
    }

    getCartAddCouponAction(couponCode: any): Action {
        return new checkout.CartAddCoupon({
            vendorId: this.id,
            coupon: couponCode
        });
    }

    getCartDeleteCouponAction(): Action {
        return new checkout.CartDeleteCoupon({
            vendorId: this.id
        });
    }

    getCartApplyLPointAction(lpoint): Action {
        return new checkout.CartApplyLPoint({
            vendorId: this.id,
            lpoint: lpoint
        });
    }

    getCartUpdateShippingInfoAction(): Action {
        return new checkout.CartUpdateShippingInfo({vendorId: this.id});
    }

    getUpdateCurrentStepAction(step): Action {
        return new checkout.UpdateCurrentStep({
            step: step,
            vendorId: this.id
        });
    }

    getCartCheckOrderStatusAction(): Action {
        return new checkout.CartCheckOrderStatus();
    }

    getCartUpdateItemsAction(itemInfo: any): Action {
        itemInfo.vendorId = this.id;
        return new checkout.CartUpdateItem(itemInfo);
    }

    getCartRemoveItemsAction(itemInfo: any): Action {
        itemInfo.vendorId = this.id;
        return new checkout.CartDeleteItem(itemInfo);
    }

    getCartLoadAction(): Action {
        return new checkout.CartLoad({vendorId: this.id});
    }

    getCheckoutActions() {
        return checkout;
    }

    getCartId() {
        return LocalStorageManagement.getInstance().getStorageVendorCartId(this.id);
    }

    getCartAddItemsAction(itemInfo): Action {
        return new checkout.CartAddItems({ product: itemInfo, vendorId: this.id});
    }

    getCartCreateAction(): Action {
        return new checkout.CartCreate({vendorId: this.id});
    }

    // _loadDispatcher() {
    //     this.dispatcher = <any>this.dispatcher.subscribe((action) => {
    //         switch (action.type) {
    //             case checkout.CART_CREATE_SUCCESS:
    //                 this.selectedProduct.cartItem.quoteId = action.payload;
    //                 if (this.selectedProduct.cartItem.sku) {
    //                     this.store.dispatch(this.getCartAddItemsAction());
    //                 }
    //                 break;
    //
    //             case checkout.CART_CREATE_FAILED:
    //                 break;
    //
    //             case checkout.CART_ADD_ITEMS_SUCCESS:
    //                 if (action.payload.sku) {
    //                     this.isItemAddedToCart[action.payload.sku.toString()] = false;
    //                 }
    //
    //                 this.selectedProduct = {
    //                     'cartItem': {}
    //                 };
    //                 break;
    //
    //             case checkout.CART_ADD_ITEMS_FAILED:
    //                 // this.isItemAddedToCart = {};
    //                 // this.isCheckoutClicked = false;
    //                 // this.isCartBeingCreated = false;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    // }

}