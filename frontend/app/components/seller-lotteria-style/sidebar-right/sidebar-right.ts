import {Component, OnInit} from '@angular/core';
import {Store, Dispatcher} from "@ngrx/store";
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../store';
import {BaseProductsComponent} from "../../base/products/products";
import * as products from '../../../store/products/products.actions';
import {CommonFSProductsComponent} from "../../common-fs/products/products";
import {AppState} from "../../../store/index";
import {CART_TYPE, CartManagement} from "../../base/cart/CartManagement";
import * as _ from 'lodash';
import {ToastrService} from "ngx-toastr";
import {DialogService} from "ng2-bootstrap-modal";
import {OutOfStockModal} from "../../../modals/outofstock/outofstock";
import {AppConstants} from "../../../app.constant";
import * as checkout from "../../../store/checkout/vendor-checkout/checkout.actions";
import {LocalStorageManagement} from "../../base/LocalStorageManagement";
import {RegionManagement} from "../../base/RegionManagement";

@Component({
    selector: 'app-seller-lotteria-sidebar',
    templateUrl: 'sidebar-right.html'
})

export class SellerLotteriaSidebarComponent {
    cartItemsSub: any;
    cartTotalSub: any;
    shippingFeeSub: any;
    vendorInfoSub: any;
    cartItems: Array<any> = [];
    cartTotal: any;
    shippingFee: number = 0;
    vendorInfo: any;

    cartTotalValid: boolean;
    regionValid: boolean;
    shipping_comments: string = '';
    timeOutRegionSupportEventId: any;
    vendorLandingSettingSub: any;
    vendorLandingSetting: any;

    constructor(
        protected store: Store<AppState>,
        private dialogService: DialogService,
        private dispatcher: Dispatcher,
        private toastr: ToastrService
    ){
        this.vendorLandingSettingSub = this.store.select(fromRoot.vendorGetLandingSetting).subscribe(setting => {
            if(setting) {
                this.vendorLandingSetting = setting;
            }
        });

        // fixme: workaround for bug of angular core 4.2
        // ref: https://github.com/angular/angular/issues/17572#issuecomment-309229619
        this.cartItemsSub = this.store.select(fromRoot.vendorCheckoutGetCartItems).subscribe(items => {
            setTimeout(() => {
                this.cartItems = items;
            },0);
        });

        this.cartTotalSub = this.store.select(fromRoot.vendorCheckoutGetCartTotal).subscribe(total => {
            setTimeout(() => {
                this.cartTotal = total;
                this.cartTotalValid = this.cartTotal && this.vendorLandingSetting && this.vendorLandingSetting.min_order_amount
                    ? this.cartTotal.base_subtotal >= this.vendorLandingSetting.min_order_amount:false;
            },0);
        });

        this.shippingFeeSub = this.store.select(fromRoot.vendorCheckoutGetShippingFee).subscribe((shippingFee: number) => {
            this.shippingFee = shippingFee;
        });

        this.vendorInfoSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            if (vendorInfo) {
                this.vendorInfo = vendorInfo;
            }
        });

        this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_UPDATE_ITEM_FAILED:
                    break;
                case checkout.CART_UPDATE_ITEM_SUCCESS:
                    break;
                case checkout.CART_DELETE_ITEM_SUCCESS:
                    break;
                case checkout.CART_LOAD_SUCCESS:
                    break;
                case checkout.CART_DELETE_MULTIPLE_ITEMS_SUCCESS:
                    this.goToStep2();
                    break;
                default:
                    break;
            }
        });
    }

    updateItem(item){
        const updatedItem = Object.assign({}, item, {
            item_id: item.item_id,
            qty: item.qty,
            old_qty: item.old_qty
        });

        CartManagement.getInstance(this.store).updateCartItem(updatedItem, {
            type: CART_TYPE.VENDOR_CART,
            id: this.vendorInfo.id,
        });
    }

    removeItem(item){
        CartManagement.getInstance(this.store).removeCartItem(item, {
            type: CART_TYPE.VENDOR_CART,
            id: this.vendorInfo.id,
        });
    }

    changeQty(item, qty) {
        if (item.qty === 1 && qty === -1) {
            return;
        }
        item.old_qty = item.qty;
        item.qty += qty;
        this.updateItem(item);
    }

    goToNextStep() {
        const totalItemsCount = _.sumBy(this.cartItems, function (item) {
            return item.qty;
        });
        let isMaxSellInShoppingCart = false;
        let maxSellItem = null;

        _.each(this.cartItems, (item: any) => {
            if (item.qty > _.get(item, 'extension_attributes.stock_item[0].max_sale_qty', item.in_stock)) {
                isMaxSellInShoppingCart = true;
                maxSellItem = _.cloneDeep(item);
            }
        });

        if (isMaxSellInShoppingCart) {
            this.toastr.error(`Vì giá đang tốt nhất, chúng tôi xin giới hạn tối đa sản phẩm ` + maxSellItem.name +
                ` trong một đơn hàng là ` + _.get(maxSellItem, 'extension_attributes.stock_item[0].max_sale_qty', maxSellItem.in_stock) + ` sản phẩm. Mong quý khách thông cảm!`, 'Lỗi');
            return false;
        }
        const outOfStockItems = this.cartItems.filter((item) => {
            return !item.is_in_stock || item.is_disabled || item.in_stock < item.qty;
        });
        const isOutOfStock = outOfStockItems.length > 0;
        if (isOutOfStock) {
            const disposable = this.dialogService.addDialog(OutOfStockModal, {
                orderItems: outOfStockItems
            }).subscribe((confirm) => {
                if (confirm) {
                    this.store.dispatch(new checkout.CartDeleteMultipleItems({
                        outOfStockItems: outOfStockItems,
                        vendorId: this.vendorInfo.id
                    }));
                }
                disposable.unsubscribe();
            });

        } else if (totalItemsCount > AppConstants.MAX_ITEMS_COUNT_IN_CART) {
            const overCount = totalItemsCount - AppConstants.MAX_ITEMS_COUNT_IN_CART;
            const errorMessage = 'Chúng tôi giới hạn tối đa ' + AppConstants.MAX_ITEMS_COUNT_IN_CART + ' sản phẩm trong giỏ hàng, vui lòng bỏ bớt ' + overCount + ' sản phẩm ra khỏi giỏ hàng';
            this.toastr.error(errorMessage, 'Lỗi');
        } else {
            this.goToStep2();
        }
    }

    goToStep2(){
        this.store.dispatch(new checkout.UpdateCurrentStep({
            step: 2,
            vendorId: this.vendorInfo.id
        }));
        LocalStorageManagement.getInstance().storeStorageVendorCartInfo(this.vendorInfo.id, {shipping_comments: this.shipping_comments});
    }

    onRegionSupport(regionSupport: boolean){
        // use time out to prevent update continuously that cause ExpressionChangedAfterItHasBeenCheckedError
        clearTimeout(this.timeOutRegionSupportEventId);
        this.timeOutRegionSupportEventId = setTimeout(() => {
            this.regionValid = regionSupport;
        },100);
    }

    reloadCartShippingRule(){
        const curRegion = RegionManagement.getInstance(this.store).getCurrentRegion();
        if(curRegion){
            CartManagement.getInstance(this.store).loadShippingRule({
                cityId: curRegion.city.id,
                districtId: curRegion.district && curRegion.district.id? curRegion.district.id:null,
                wardId: curRegion.ward && curRegion.ward.id? curRegion.ward.id:null,
            },
    {
                type: CART_TYPE.VENDOR_CART,
                id: this.vendorInfo.id
            });
        }
    }

    ngOnDestroy(){
        this.cartItemsSub.unsubscribe();
        this.cartTotalSub.unsubscribe();
        this.shippingFeeSub.unsubscribe();
        this.vendorLandingSettingSub.unsubscribe();
    }
}
