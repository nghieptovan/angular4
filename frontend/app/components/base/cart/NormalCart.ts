import {AbstractCart} from "./AbstractCart";
import * as checkout from '../../../store/checkout/checkout.actions';
import {Action} from "@ngrx/store";

export class NormalCart extends AbstractCart{
    getCartRecreateAction(cartId):Action{
        return new checkout.CartRecreate(cartId);
    }

    getCartRefreshAction():Action{
        return new checkout.CartRefresh();
    }

    getCartGetPaymentRulesAction(): Action {
        return new checkout.CartGetPaymentRules();
    }

    getCartUpdatePaymentInformationAction(info: any): Action {
        return new checkout.CartUpdatePaymentInformation(info);
    }

    getCartCCTransactionRequestAction(info: any): Action {
        return new checkout.CartCCTransactionRequest(info);
    }

    getCartSetPaymentMethodAction(info): Action {
        return new checkout.CartSetPaymentMethod(info);
    }

    getCartGetPaymentMethodsAction(): Action {
        return new checkout.CartGetPaymentMethods();
    }

    getCartLoadShippingRuleAction(region: any): Action {
        return new checkout.CartLoadShippingRule(region);
    }

    getCartAddCouponAction(couponCode: any): Action {
        return new checkout.CartAddCoupon(couponCode);
    }

    getCartDeleteCouponAction(): Action {
        return new checkout.CartDeleteCoupon();
    }

    getCartApplyLPointAction(lpoint): Action {
        return new checkout.CartApplyLPoint(lpoint);
    }

    getCartUpdateShippingInfoAction(): Action {
        return new checkout.CartUpdateShippingInfo();
    }

    getUpdateCurrentStepAction(step): Action {
        return new checkout.UpdateCurrentStep(step);
    }

    getCartCheckOrderStatusAction(): Action {
        return new checkout.CartCheckOrderStatus();
    }

    getCartUpdateItemsAction(itemInfo: any): Action {
        return new checkout.CartUpdateItem(itemInfo);
    }

    getCartRemoveItemsAction(itemInfo: any): Action {
        return new checkout.CartDeleteItem(itemInfo);
    }

    getCartLoadAction(): Action {
        return new checkout.CartLoad();
    }

    getCheckoutActions() {
        return checkout;
    }

    getCartId() {
        return localStorage.getItem('cartId');
    }

    getCartAddItemsAction(itemInfo): Action {
        return new checkout.CartAddItems({ product: itemInfo});
    }

    getCartCreateAction(): Action {
        return new checkout.CartCreate();
    }
}