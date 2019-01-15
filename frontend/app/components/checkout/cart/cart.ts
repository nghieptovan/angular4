import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from '../../../app.constant';
import { FreeshippingAreaModal} from '../../../modals/freeshipping-area/freeshipping-area';
import { OutOfStockModal } from '../../../modals/outofstock/outofstock';
import { GlobalService } from '../../../services/global.service';
import * as account from '../../../store/account/account.actions';
import * as auth from '../../../store/auth/auth.actions';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as common from '../../../store/common/common.actions';
import * as categories from '../../../store/categories/categories.actions';
import * as fromRoot from '../../../store/index';
import {LocalStorageConstants} from "../../base/constants/LocalStorageConstants";

import { WishlistModal } from '../../../modals/wishlist/wishlist';
import { ShareCartModal } from '../../../modals/sharecart/sharecart';
import {RegionManagement} from "../../base/RegionManagement";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {GlobalConstants} from "../../base/constants/GlobalConstants";
import {VendorShippingTypeManagement} from "../../base/VendorShippingTypeManagement";

declare var $;
@Component({
    selector: 'lt-checkout-cart',
    templateUrl: './cart.html',
    styleUrls: ['./cart.less']
})

export class LtCheckoutCartComponent implements OnDestroy {
    @Input('isLoggedIn')
    isLoggedIn: any;

    subscriber: Subscription;
    cartVendorsSub: any;

    cartItems$: Observable<any>;
    cartInfo$: Observable<any>;
    cartItemsCount$: Observable<any>;
    isAuthenticated$: Observable<Boolean>;

    freeshippingHtml$: Observable<string>;
    shippingFee$: Observable<any>;

    commonRegions$: Observable<any>;
    cartId: any;
    cartTotal: any;
    appliedLPoint: any = 0;
    regions: Array<any> = [];
    // selectedRegion: any = null;
    // selectedDistrict: any = null;
    selectedRegion: any = {
        city: null,
        district: null,
        ward: null,
        isOther: false
    };
    cityFocus: boolean = false;
    districtFocus: boolean = false;
    regionId: any;
    districtId: any;
    orderItems: Array<any> = [];
    updatedItem: any;
    likedItem: any;

    cartVendors: any;
    previousUrl: String;

    cartTotalSub: any;
    cartLaterLoadSub: any;
    cartLaterCreateSub:any;
    cartLater:any;

    cartLaterSub:any;

    canUpdateShippingAddress:any = false;

    region : any;
    district : any;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    vendorShippingTypeMgr: VendorShippingTypeManagement = VendorShippingTypeManagement.getInstance();
    shipTypeOptions: any = GlobalConstants.SHIP_TYPE_OPTIONS;
    shipTypeSelected: any = this.shipTypeOptions.standard;
    shipCarriers: any = GlobalConstants.SHIPPING_CARRIER;


    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private globalService: GlobalService,
        private dialogService: DialogService, private dispatcher: Dispatcher,
        private toastr: ToastrService) {
        this.cartVendorsSub = this.store.select(fromRoot.checkoutGetShippingVendors).subscribe(cartVendors => {
            this.cartVendors = cartVendors;
            if(this.cartVendors && this.cartVendors.by_group){
                this.cartVendors = this.vendorPickupMgr.loadSelectedShipType(this.cartVendors);
                this.cartVendors = this.vendorShippingTypeMgr.loadSelectedShipType(this.cartVendors);
            }
        });

        this.cartTotalSub = this.store.select(fromRoot.checkoutGetCartTotal)
            .subscribe((cartTotal) => {
                this.cartTotal = cartTotal;
                if (cartTotal.total_segments && cartTotal.total_segments.length) {
                    const lpointSegment = _.find(cartTotal.total_segments, (segment: any) => {
                        return segment.code === 'lpoint';
                    });
                    if (lpointSegment) {
                        this.appliedLPoint = parseInt(lpointSegment.value, 10);
                    }
                }
            });
        this.cartInfo$ = this.store.select(fromRoot.checkoutGetCartInfo);
        this.isAuthenticated$ = this.store.select(fromRoot.authGetLoggedInState);
        this.freeshippingHtml$ = this.store.select(fromRoot.checkoutGetFreeshippingHtml);
        this.shippingFee$ = this.store.select(fromRoot.checkoutGetShippingFee);
        this.commonRegions$ = this.store.select(fromRoot.commonGetRegions);
        this.globalService.getCartCurrentTimeStamp();
    }

    ngAfterViewInit() {
        this.cartId = localStorage.getItem('cartId');
        if (this.cartId) {
            this.store.dispatch(new common.LoadTrackingCode({ type: 'cart', id: this.cartId }));
        } else {
            this.store.dispatch(new common.LoadTrackingCode({ type: 'cart', id: 0 }));
        }
    }

    ngOnInit() {
        this.store.select(fromRoot.checkoutGetCartTotal).subscribe((cartTotal) => {
            this.orderItems = cartTotal.items;
        });

        this.commonRegions$.subscribe((regions) => {
            this._bindRegionData(regions);
        });

        this.subscriber = this.dispatcher
            .subscribe((action) => {
                switch (action.type) {
                    case auth.LOGIN_SUCCESS:
                        this.store.dispatch(new checkout.UpdateCurrentStep(2));
                        break;
                    case checkout.CART_UPDATE_ITEM_FAILED:
                        this.updatedItem.new_qty = this.updatedItem.qty;
                        break;
                    case common.LOAD_COUNTRY_INFORMATION_SUCCESS:
                        this._bindRegionData(action.payload);
                        break;
                    case checkout.CART_UPDATE_ITEM_SUCCESS:
                        if (this.cartId) {
                            this._loadDefaultShippingRule();
                            this.store.dispatch(new common.LoadTrackingCode({ type: 'cart', id: this.cartId }));
                        }
                        break;
                    case checkout.CART_DELETE_ITEM_SUCCESS:
                        if (this.cartId) {
                            this._loadDefaultShippingRule();
                            this.store.dispatch(new common.LoadTrackingCode({ type: 'cart', id: this.cartId }));
                        }
                        break;
                    case checkout.CART_LOAD_SUCCESS:
                        this._loadDefaultShippingRule();
                        break;
                    case checkout.CART_DELETE_MULTIPLE_ITEMS_SUCCESS:
                        this.store.dispatch(new checkout.UpdateCurrentStep(2));
                        if (this.cartId) {
                            this._loadDefaultShippingRule();
                            this.store.dispatch(new common.LoadTrackingCode({ type: 'cart', id: this.cartId }));
                        }
                        break;
                    default:
                        break;
                }
            });
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
        this.cartTotalSub.unsubscribe();
        this.cartVendorsSub.unsubscribe();
        this.globalService.reloadCartWhenTimestampChanged();
        this.globalService.removeTrackingCode();
    }

    private _loadDefaultShippingRule() {
        RegionManagement.getInstance(this.store).loadCartShippingRule();
    }

    private _bindRegionData(regions) {
        this.regions = regions;
        this.selectedRegion = RegionManagement.getInstance(this.store).getCurrentRegion();
        if(!this.selectedRegion || !this.selectedRegion.city){
            this.selectedRegion = RegionManagement.getInstance(this.store).getDefaultRegion(regions);
        }
        this._loadDefaultShippingRule();
    }

    getShippingRuleForItem(id) {
        if (this.cartVendors.by_group) {
            const rule = this.cartVendors.by_group.find((x: any) => {
                // return parseInt(x.item_id, 10) === parseInt(id, 10);
                return x.items.find((item) => {
                    return item.toString() === id.toString();
                });
            });
            if (rule) {
                return rule;
            }
        }
        return false;
    }

    _shippingRuleIsNotMatched() {
        if (this.cartVendors && this.cartVendors.by_group) {
            return _.find(this.cartVendors.by_group, (item: any) => {
                return !item.vendor_shippable;
            });
        }
        return false;
    }

    selectArea(region, district) {
        this.selectedRegion.ward = null;
        if (region && region.id) {
            this.selectedRegion.district = null;
        }
        this.selectedRegion.isOther = true;

        if(district && district.id){
            RegionManagement.getInstance(this.store).loadCartShippingRule();
        }

        RegionManagement.getInstance(this.store).updateCurrentRegion(this.selectedRegion);
    }

    shareCart() {
        this.cartInfo$.subscribe((cartInfo) => {
            this.store.select(fromRoot.commonGetLinkBaseUrl).subscribe((baseUrl) => {
                const url = 'http://www.facebook.com/sharer/sharer.php?u=' + baseUrl + 'sm_cartcustom/share/index/shared_id/' + cartInfo.id;
                window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            }).unsubscribe();
        }).unsubscribe();
    }

    goToNextStep() {
        const totalItemsCount = _.sumBy(this.orderItems, function (item) {
            return item.qty;
        });
        let isMaxSellInShoppingCart = false;
        let maxSellItem = null;

        _.each(this.orderItems, (item: any) => {
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
        const outOfStockItems = this.orderItems.filter((item) => {
            return !item.is_in_stock || item.is_disabled || item.in_stock < item.qty;
        });
        const isOutOfStock = outOfStockItems.length > 0;
        const ruleIsNotMatched = this._shippingRuleIsNotMatched();
        if (isOutOfStock) {
            const disposable = this.dialogService.addDialog(OutOfStockModal, {
                orderItems: outOfStockItems
            }).subscribe((confirm) => {
                if (confirm) {
                    this.store.dispatch(new checkout.CartDeleteMultipleItems(outOfStockItems));
                }
                disposable.unsubscribe();
            });

        } else if (ruleIsNotMatched) {
            const errorMessage = ruleIsNotMatched.express && ruleIsNotMatched.express.fail_message?ruleIsNotMatched.express.fail_message:'Có sản phẩm trong giỏ hàng không được giao ở vị trí bạn đã chọn';
            this.toastr.error(errorMessage, 'Không thể thanh toán');
        } else if (totalItemsCount > AppConstants.MAX_ITEMS_COUNT_IN_CART) {
            const overCount = totalItemsCount - AppConstants.MAX_ITEMS_COUNT_IN_CART;
            const errorMessage = 'Chúng tôi giới hạn tối đa ' + AppConstants.MAX_ITEMS_COUNT_IN_CART + ' sản phẩm trong giỏ hàng, vui lòng bỏ bớt ' + overCount + ' sản phẩm ra khỏi giỏ hàng';
            this.toastr.error(errorMessage, 'Lỗi');
        } else {
            this.store.dispatch(new checkout.UpdateCurrentStep(2));
        }
    }

    parseGifts(text: string) {
        return JSON.parse(text);
    }

    updateItem(item) {
        this.updatedItem = item;
        const updatedItem = Object.assign({}, this.updatedItem, {
            item_id: item.item_id,
            qty: item.new_qty,
            old_qty: item.qty
        });
        this.store.dispatch(new checkout.CartUpdateItem(updatedItem));
    }

    removeItem(item) {
        this.store.dispatch(new checkout.CartDeleteItem(item));
        return false;
    }

    changeItemInCart(flag, item) {
        if (flag === '+' && item.in_stock - item.new_qty > 0) {
            item.new_qty++;
        } else if (flag === '-' && item.new_qty > 0) {
            item.new_qty--;
        }
        this.onItemChange(item);
    }

    onItemChange(item) {
        setTimeout(() => {
            if (parseInt(item.new_qty, 10) >= parseInt(item.in_stock, 10)) {
                item.new_qty = item.in_stock;
            } else if (parseInt(item.new_qty, 0) <= 0) {
                item.new_qty = 1;
            }
            if(item.new_qty <= item.in_stock){
                this.updateItem(item);
            }
        }, 100);

    }

    onQtyChange(item, event){

    }

    onQtyPressed(item, event) {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            return false;
        }
        return true;
    }

    addToWishlist(item) {
        this.likedItem = item;
        this.store.dispatch(new account.AddProductToWishList(item.product_id));
    }

    gotoProductDetail(product) {
        const slug = product.product_path.replace('/', '');
        this.router.navigate(['product', product.product_id, slug]);
    }

    goToVendorPage(id, path) {
        this.router.navigate(['seller', id, path.replace('/', '')]);
    }

    goToBrandPage(id, path) {
        this.router.navigate(['brand', id, path.replace('/brand/', '')]);
    }

    openFreeShipPopUp(vendorId) {
        this.dialogService.addDialog(FreeshippingAreaModal,  {vendorId});
    }

    equals(item1: any, item2: any) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    backToHome() {
        this.store.dispatch(new categories.SetSelectedStore(''));
        this.router.navigate(['/']);
        return false;
    }

    addToCartlater(item){
        this.store.dispatch(new checkout.CartLaterAddItem(item));
        this.store.select(fromRoot.checkoutCartLaterAddItem).subscribe((message) => {
            if(!message.error && typeof message.error != 'undefined' && typeof message.quote_later_id != 'undefined' ){
                localStorage.setItem('cartLaterId',message.quote_later_id);
                this.store.dispatch(new checkout.CartLaterLoad({}));
                this.removeItem(item);
            }

        });
    }

    openWishlist(){
        this.dialogService.addDialog(WishlistModal);
    }

    openShareCart(){
        this.dialogService.addDialog(ShareCartModal);
    }

    openUpdateShippingAddress(){
        this.canUpdateShippingAddress = true;
    }

    closeUpdateShippingAddress(){
        this.canUpdateShippingAddress = false;
    }

    onChangeShipType(shipType, vendorId, reloadShippingRule:boolean = true){
        switch (shipType){
            case this.shipTypeOptions.standard:
                this.vendorShippingTypeMgr.storeStorageVendorShippingType(vendorId, {shipping_type: this.shipTypeOptions.standard});
                this.vendorPickupMgr.storeStorageVendorPickup(vendorId, {isActive: false});
                break;
            case this.shipTypeOptions.express:
                this.vendorShippingTypeMgr.storeStorageVendorShippingType(vendorId, {shipping_type: this.shipTypeOptions.express});
                this.vendorPickupMgr.storeStorageVendorPickup(vendorId, {isActive: false});
                break;
            case this.shipTypeOptions.pickup:
                this.vendorShippingTypeMgr.storeStorageVendorShippingType(vendorId, {shipping_type: this.shipTypeOptions.pickup});
                this.vendorPickupMgr.storeStorageVendorPickup(vendorId, {isActive: true});
                break;
        }

        // if(reloadShippingRule){
            RegionManagement.getInstance(this.store).loadCartShippingRule();
        // }
    }

}
