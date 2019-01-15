import { Dispatcher, Store, Action } from '@ngrx/store';
import * as fromRoot from '../../../store';
import {LocalStorageManagement} from "../LocalStorageManagement";
import * as _ from 'lodash';

export abstract class AbstractCart{
    // protected dispatcher: any;
    protected selectedProduct: any = {};
    protected isItemAddedToCart: any;

    constructor(
        protected store: Store<fromRoot.AppState>,
        protected id: number
    ){
    }
    abstract getCartAddItemsAction(itemInfo):Action;
    abstract getCartRemoveItemsAction(itemInfo):Action;
    abstract getCartUpdateItemsAction(itemInfo):Action;
    abstract getCartCreateAction():Action;
    abstract getCartLoadAction():Action;
    abstract getUpdateCurrentStepAction(step):Action;
    abstract getCartCheckOrderStatusAction():Action;
    abstract getCartUpdateShippingInfoAction():Action;
    abstract getCartAddCouponAction(couponCode):Action;
    abstract getCartDeleteCouponAction():Action;
    abstract getCartApplyLPointAction(lpoint):Action;
    abstract getCartLoadShippingRuleAction(region):Action;
    abstract getCartGetPaymentMethodsAction():Action;
    abstract getCartSetPaymentMethodAction(info):Action;
    abstract getCartCCTransactionRequestAction(info):Action;
    abstract getCartUpdatePaymentInformationAction(info):Action;
    abstract getCartGetPaymentRulesAction():Action;
    abstract getCartRefreshAction():Action;
    abstract getCartRecreateAction(cartId):Action;


    abstract getCartId();
    abstract getCheckoutActions();

    loadCart(){
        this.store.dispatch(this.getCartLoadAction());
    }

    recreateCart(cartId){
        this.store.dispatch(this.getCartRecreateAction(cartId));
    }

    addToCart(product, qty){
        const cartId = this.getCartId();
        if (cartId) {
            let data = {
                cartItem: {
                    sku: product.sku,
                    name: product.name,
                    qty: qty,
                    quoteId: cartId
                }
            };

            if (product.type_id !== 'simple') {
                const options = [];
                _.each(product.options, option => {
                    options.push({
                        option_id: option.attribute_id,
                        option_value: option.value_index
                    });
                });
                data.cartItem['product_option'] = {
                    extension_attributes: {
                        configurable_item_options: options
                    }
                };
            }


            this.store.dispatch(this.getCartAddItemsAction(data));
        } else {
            this.store.dispatch(this.getCartCreateAction());
        }
    }

    removeCartItem(item){
        this.store.dispatch(this.getCartRemoveItemsAction(item))
    }

    updateCartItem(item){
        this.store.dispatch(this.getCartUpdateItemsAction(item))
    }

    loadShippingRule(region){
        this.store.dispatch(this.getCartLoadShippingRuleAction(region));
    }

    ngOnDestroy(){
        // this.dispatcher.unsubscribe();
    }
}