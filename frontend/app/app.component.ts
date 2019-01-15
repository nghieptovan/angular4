import { Component, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from './app.constant';
import { RegisterSuccessModal } from './modals/login/success/success';
import { GlobalService } from './services/global.service';
import * as fromRoot from './store';
import * as account from './store/account/account.actions';
import * as auth from './store/auth/auth.actions';
import * as checkout from './store/checkout/checkout.actions';
import * as vendorCheckout from './store/checkout/vendor-checkout/checkout.actions';
import * as common from './store/common/common.actions';
import * as products from './store/products/products.actions';
import { PlatformLocation } from '@angular/common'
import {LocalStorageConstants} from "./components/base/constants/LocalStorageConstants";
import {LocalStorageManagement} from "./components/base/LocalStorageManagement";
import {RegionManagement} from "./components/base/RegionManagement";

declare var $;
// import { TranslateService } from 'ng2-translate';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})

export class AppComponent {
    productsIsLoading$: Observable<any>;
    cartIsLoading: boolean;
    categoriesIsLoading: boolean;
    accountIsLoading: boolean;
    authIsLoading: boolean;
    commonIsLoading: boolean;
    isProductPage: any;

    subscription: Subscription;
    cartId: any;
    selectStore: any;
    isFixedHeaderShown: boolean;
    isCheckOutPage: boolean;

    lastOffsetTop: any = 0;
    sharedSessionSub: any;
    scrolldownPicel: any = 0;

    scrollupPicel: any = 0;
    preventScrollTop: boolean = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private store: Store<fromRoot.AppState>,
        private dispatcher: Dispatcher,
        private toastr: ToastrService,
        private dialogService: DialogService,
        private _elementRef : ElementRef,
        private globalService: GlobalService,
        private location: PlatformLocation
    ) {
        console.log('run');
        
    }

    _reloadStore() {
        this.store.dispatch(new common.LoadCountryInformation());
        this.store.dispatch(new products.GetSearchSuggestion(''));
    }

    @HostListener('window:scroll', [])
    onWindowScroll(ev) {
        const currentOffset = window.pageYOffset;
        const mainSelector = this._elementRef.nativeElement.querySelector('.main');
        const productDetailAttrSelector = this._elementRef.nativeElement.querySelector('.product-attributes');
        const productListLotSelector = this._elementRef.nativeElement.querySelector('.product-list-lot-wrap');
        const atTheEndListLotSelector = this._elementRef.nativeElement.querySelector('.at-the-end-list');
        const mainOffset = mainSelector?mainSelector.offsetTop:0;
        const productDetailAttrOffset = productDetailAttrSelector?productDetailAttrSelector.offsetTop:0;
        const productListLotOffset = productListLotSelector?productListLotSelector.offsetTop:0;
        const atTheEndListLotOffset = atTheEndListLotSelector?atTheEndListLotSelector.offsetTop:0;

        if (currentOffset > 27) {
            if (this.isProductPage) {
                $('body').addClass('header-scrolled');
            } else {
                if (currentOffset < this.lastOffsetTop) { // Scroll up
                    this.scrollupPicel++;
                    if (this.scrollupPicel > 5) {
                        $('body').addClass('header-scrolled');
                        $('body').removeClass('scroll-down');
                    }

                    this.scrolldownPicel = 0;
                } else { // Scroll down
                    this.scrolldownPicel++;
                    this.scrollupPicel = 0;
                    if (this.scrolldownPicel > 10) {
                        $('body').removeClass('header-scrolled');
                        $('body').addClass('scroll-down');
                    }
                }
            }
        } else {
            $('body').removeClass('header-scrolled');
        }

        if (window.pageYOffset >= mainOffset && $('body').hasClass('header-scrolled')) {
            $('body').addClass('filter-scrolled');
        } else {
            $('body').removeClass('filter-scrolled');
        }

        if (window.pageYOffset >= productDetailAttrOffset - 182 && $('body').hasClass('header-scrolled')) {
            $('.product-detail-tabs').addClass('fixtop-tab');
        } else {
            $('.product-detail-tabs').removeClass('fixtop-tab');
        }

        if (productListLotOffset > 0 && window.pageYOffset >= productListLotOffset) {
            $('.sidebar-right-lot').addClass('sidebar-fixedtop');
            $('body').removeClass('header-scrolled')
        } else {
            $('.sidebar-right-lot').removeClass('sidebar-fixedtop');
        }

        if (window.pageYOffset >= atTheEndListLotOffset - 480) {
            $('.sidebar-right-lot').addClass('sidebar-fixedtop-abs');
        } else {
            $('.sidebar-right-lot').removeClass('sidebar-fixedtop-abs');
        }

        this.lastOffsetTop = _.clone(currentOffset);

    }

    _registerAppLoader() {
        this.productsIsLoading$ = this.store.select(fromRoot.productsGetLoadingState);
        this.store.select(fromRoot.checkoutGetLoadingState)
            .subscribe((isLoading) => {
                setTimeout(() => {
                    this.cartIsLoading = isLoading;
                }, 200);
            });

        this.store.select(fromRoot.authGetLoadingState)
            .subscribe((isLoading) => {
                setTimeout(() => {
                    this.authIsLoading = isLoading;
                }, 200);
            });
        this.store.select(fromRoot.categoriesGetLoadingState)
            .subscribe((isLoading) => {
                setTimeout(() => {
                    this.categoriesIsLoading = isLoading;
                }, 200);
            });

        this.store.select(fromRoot.accountGetLoadingState)
            .subscribe((isLoading) => {
                setTimeout(() => {
                    this.accountIsLoading = isLoading;
                }, 200);
            });

        this.store.select(fromRoot.commonGetLoadingState)
            .subscribe((isLoading) => {
                setTimeout(() => {
                    this.commonIsLoading = isLoading;
                }, 200);
            });
    }

    _registerListener() {
        this.subscription = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case auth.LOGIN_SUCCESS:
                    const cartId = localStorage.getItem('cartId');
                    const vendorCartIds = LocalStorageManagement.getInstance().getStorageVendorCart();
                    // localStorage.clear();
                    // Keep local strorage save ship info.
                    LocalStorageManagement.getInstance().clearExclude([LocalStorageConstants.KEY_USER_SHIPPING_ADDRESS]);
                    localStorage.setItem('token', action.payload);
                    if (cartId) {
                        this.store.dispatch(new checkout.CartMerge(cartId));
                    } else {
                        this.store.dispatch(new checkout.CartLoad());
                    }

                    if(vendorCartIds){
                        _.forOwn(vendorCartIds, (cartData, vendorId) => {
                            this.store.dispatch(new vendorCheckout.CartMerge({
                                guestCartId: cartData.cartId,
                                vendorId: vendorId
                            }));
                        });
                    }

                    this.store.dispatch(new account.LoadInfo());
                    /*this.store.dispatch(new account.LoadWishList(0));*/
                    /*this.store.dispatch(new account.LoadOrders(null));*/
                    break;
                case account.REGISTER_SUCCESS:
                    try {
                        this.dialogService.removeAll();
                    } catch (error) {

                    }

                    document.body.classList.remove('body--block-scroll');
                    this.store.dispatch(new auth.LoginSuccess(action.payload.token));
                    if (this.router.url.indexOf('/checkout') !== 0) {
                        this.dialogService.addDialog(RegisterSuccessModal);
                    }
                    break;
                case common.RESET_URL_INFO:
                    this.globalService.removeTitleAndMetaHeader();
                    break;
                default:
                    break;
            }
        });
    }

    _registerRouteChangeEvent() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (!event.url.startsWith('/category') && !event.url.startsWith('/brand') && !event.url.startsWith('/seller')) {
                    this.store.dispatch(new common.ResetUrlInfo());
                }
                this.globalService.loadDefaultMetaTags(AppConstants.DEFAULT_META_TAGS);
                this._registerCheckOutPageEvents(event);

                // if(!((event.url.startsWith('/category')
                //         || event.url.startsWith('/brand')
                //         || event.url.startsWith('/seller')
                //         || event.url.startsWith('/search')
                //     )
                //     && event.url.includes('?'))
                // ){
                //     window.scrollTo(0, 0);
                // }
                if(!this.preventScrollTop){
                    window.scrollTo(0, 0);
                } else {
                    this.store.dispatch(new common.PreventScrollTop(false));
                }

                // Set active second menu if has class
                setTimeout(() => {
                    const aTags = $('.second-menu a');
                    _.each(aTags, (a: any) => {
                        if (window.location.toString().includes(a.href)) {
                            $(a).parent().addClass('active');
                        } else {
                            $(a).parent().removeClass('active');
                        }
                    });
                }, 300);
            }
        });
    }

    _registerCheckOutPageEvents(event) {
        setTimeout(() => {
            if (event.url.startsWith('/checkout')) {
                this.isCheckOutPage = true;
            } else {
                if (event.url.startsWith('/mobilerecharge/success') || event.url.startsWith('/mobilerecharge/failure')) {
                    this.isCheckOutPage = true;
                } else {
                    this.isCheckOutPage = false;
                }
            }
        }, 2);
    }
}
