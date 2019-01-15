import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from '../../../app.constant';
import { OutOfStockModal } from '../../../modals/outofstock/outofstock';
import { GlobalService } from '../../../services/global.service';
import * as account from '../../../store/account/account.actions';
import * as auth from '../../../store/auth/auth.actions';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as common from '../../../store/common/common.actions';
import * as categories from '../../../store/categories/categories.actions';
import * as fromRoot from '../../../store/index';

declare var $;
@Component({
    selector: 'lt-checkout-cart-later',
    templateUrl: './cart-later.html',
    styleUrls: ['./cart-later.less']
})

export class LtCheckoutCartLaterComponent implements OnDestroy {
    @Input('isLoggedIn')
    isLoggedIn: any;

    @Input('cartCount')
    cartCount: any;

    subscriber: Subscription;
    cartVendors$: Observable<any>;

    cartItems$: Observable<any>;
    cartInfo$: Observable<any>;
    cartItemsCount$: Observable<any>;
    isAuthenticated$: Observable<Boolean>;

    freeshippingHtml$: Observable<string>;
    shippingFee$: Observable<Number>;

    commonRegions$: Observable<any>;
    cartId: any;
    cartTotal: any;
    appliedLPoint: any = 0;
    regions: Array<any> = [];
    selectedRegion: any = null;
    selectedDistrict: any = null;
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

    addedProduct: any = {
        'cartItem': {

        }
    };

    cartSub: any;
    cart:any;

    cartSubDelete:any;
    checkCartLater:any = false;

    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private globalService: GlobalService,
        private dialogService: DialogService, private dispatcher: Dispatcher,
        private toastr: ToastrService) {

        this.cartLaterLoadSub = this.store.select(fromRoot.checkoutGetCartLater).subscribe(state => {
            this.cartLater = state;
        });
        this.store.dispatch(new checkout.CartLaterLoad({}));
    }

    ngAfterViewInit() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.cartLaterLoadSub.unsubscribe();
    }

    parseGifts(text: string) {
        return JSON.parse(text);
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

    equals(item1: any, item2: any) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    parseProduct(item,cartId){
        let lQty = item.qty ? item.qty : 1;
        let addedProduct = { cartItem : {
                quoteId : cartId,
                name    : item.name,
                sku     : item.sku,
                qty     : lQty
            }
        };
        if(typeof item.super_attributes != 'undefined' && item.super_attributes != '' && item.super_attributes != null && item.super_attributes != false ){
            let productOption    = {extension_attributes:{configurable_item_options:[]}};
            const superAttributes  = item.super_attributes.replace(/"/g,'').replace('{','').replace('}','').split(',');
            if(typeof superAttributes != 'undefined' && superAttributes.length > 0 ){
                for (var k in superAttributes){
                    productOption.extension_attributes.configurable_item_options.push({
                        option_id    : superAttributes[k].split(':')[0],
                        option_value : superAttributes[k].split(':')[1]
                    });
                }
            }
            addedProduct.cartItem['product_option'] = productOption;
        }

        return addedProduct;
    }

    addAllItemsToCart(){
        if(typeof this.cartLater.items != 'undefined' &&  this.cartLater.items.length > 0){
            const cartId   = localStorage.getItem('cartId');
            if (!cartId) {
                this.store.dispatch(new checkout.CartCreate());
            }
            const maxSold = 50;
            let cartInfo = JSON.parse(localStorage.getItem('cart'));
            if(this.cartLater.items.length + cartInfo.info.items_qty > maxSold){
                this.toastr.error('Sản phẩm này giới hạn số lượng khi đặt hàng. Bạn có thể mua tối đa ' + maxSold + ' sản phẩm cho mỗi đơn hàng.');
                return false;
            }
            const items = this.cartLater.items;
            if(items.length > 0){
                for(var i in items){
                    if(items[i].products.length > 0){
                        for(var j in items[i].products){
                            this.store.dispatch(new checkout.CartAddItems({product: this.parseProduct(items[i].products[j],cartId)}));
                            this.cartSub = this.store.select(fromRoot.checkoutGetSuccessMessage).subscribe(state => {
                                if(state == 'successfully'){
                                    this.removeCartLaterItem(items[i].products[j]);
                                }
                            });
                        }
                    }

                }
            }

            setTimeout(() => {
                this.store.dispatch(new checkout.CartLoad());
                this.store.dispatch(new checkout.CartLaterLoad({}));
            }, 1000);

        }

    }

    addItemTocart(item){
        $('.later-checked-content').hide();
        $('.lt-loader').css('visibility','visible');
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
            this.store.dispatch(new checkout.CartCreate());
        }

        this.store.dispatch(new checkout.CartAddItems({product: this.parseProduct(item,cartId),}));

        this.cartSub = this.store.select(fromRoot.checkoutGetSuccessMessage).subscribe(state => {
            if(state == 'successfully'){
                setTimeout(() => {
                    this.store.dispatch(new checkout.CartLoad());
                    this.removeCartLaterItem(item);
                }, 1000);

            }
        });
    }

    removeCartLaterItem(item){
        this.store.dispatch(new checkout.CartLaterDeleteItem(item));
        setTimeout(()=>{
            this.store.dispatch(new checkout.CartLaterLoad({}));
        },1000);

        return false;
    }
}
