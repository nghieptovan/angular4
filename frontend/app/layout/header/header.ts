import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

import { AppConstants } from '../../app.constant';
import { LoginModal } from '../../modals/login/login';
import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as auth from '../../store/auth/auth.actions';
import * as categories from '../../store/categories/categories.actions';
import * as checkout from '../../store/checkout/checkout.actions';
import * as account from '../../store/account/account.actions';

declare var $;

@Component({
    selector: 'app-header',
    templateUrl: './header.html'
})

export class AppHeader {
    commonStoreLogos$: Observable<any>;
    commonNsoBaseUrl$: Observable<any>;
    authIsLoggedIn$: Observable<any>;
    accountOrders$: Observable<any>;
    cartItemsSub: any;
    cartItems: Array<any> = [];
    cartTotalSub: any;
    cartTotal: Array<any> = [];
    selectedStore$: Observable<any>;
    userInfo$: Observable<any>;
    selectedStoreSub: any;
    defaultStoreUrlKey: any = AppConstants.DEFAULT_STORE_URL_KEY;
    currentUrl: any;
    appConstants: any;
    isItemAddedSuccessfully: any;
    megamenu: any;
    secondMenu: any;
    promotionMenu: any;
    skinnyBanner: any;

    cmsContentSub: any;
    dispatcherSub: any;
    constructor(private store: Store<fromRoot.AppState>, private router: Router,
        private domSanitizer: DomSanitizer,
        private dispatcher: Dispatcher, private dialogService: DialogService,
        private globalService: GlobalService, private cookieService: CookieService) {
        this.commonStoreLogos$ = this.store.select(fromRoot.commonGetStoreLogos);
        this.commonNsoBaseUrl$ = this.store.select(fromRoot.commonGetNsoBaseUrl);
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);
        this.accountOrders$ = this.store.select(fromRoot.accountGetOrders);
        this.userInfo$ = this.store.select(fromRoot.accountGetInfo);

        // fixme: workaround for bug of angular core 4.2
        // ref: https://github.com/angular/angular/issues/17572#issuecomment-309229619
        this.cartItemsSub = this.store.select(fromRoot.checkoutGetCartItems).subscribe(items => {
            setTimeout(() => {
                this.cartItems = items;
            },0);
        });
        this.cartTotalSub = this.store.select(fromRoot.checkoutGetCartTotal).subscribe(cartTotal => {
            setTimeout(() => {
                this.cartTotal = cartTotal;
            },0);
        });
        this.selectedStore$ = this.store.select(fromRoot.categoriesGetSelectedStore);
        const storeKey = _.trim(window.location.pathname, '/');
        this.store.dispatch(new categories.SetSelectedStore(storeKey));
        this.appConstants = AppConstants;

        this.cmsContentSub = this.store.select(fromRoot.commonGetCmsContents)
            .subscribe((cmsContent) => {
                this.megamenu = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_mega_menu';
                });

                this.secondMenu = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_top_menu';
                });

                this.promotionMenu = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'tpo_fashion_home_page_promotion_menu';
                });

                this.skinnyBanner = _.find(cmsContent, (cms: any) => {
                    return cms.identifier === 'skinny_banner_bottom';
                });

                if (this.promotionMenu) {
                    this.runScript();
                }
            });
        this.dispatcherSub = this.dispatcher.subscribe((action) => {
            switch (action.type) {
                case categories.SET_SELECTED_STORE:
                    this.cookieService.delete('lotte_current_page', '/');
                    let storeCookie = AppConstants.DEFAULT_STORE_COOKIES.LOTTE_VN;
                    switch (action.payload) {
                        case AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_VN:
                            storeCookie = AppConstants.DEFAULT_STORE_COOKIES.LOTTE_VN;
                            break;
                        case AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_DEPARTMENT:
                            storeCookie = AppConstants.DEFAULT_STORE_COOKIES.LOTTE_DEPARTMENT;
                            break;
                        case AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_MART:
                            storeCookie = AppConstants.DEFAULT_STORE_COOKIES.LOTTE_MART;
                            break;
                        case AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_MART_HN:
                            storeCookie = AppConstants.DEFAULT_STORE_COOKIES.LOTTE_MART_HN;
                            break;
                        case AppConstants.DEFAULT_STORE_URL_KEY.LOTTE_DATVIET:
                            storeCookie = AppConstants.DEFAULT_STORE_COOKIES.LOTTE_DATVIET;
                            break;
                        default:
                            break;
                    }

                    this.cookieService.set('lotte_current_page', storeCookie, 0, '/');

                    break;

                case checkout.CART_ADD_ITEMS_SUCCESS:
                    this.showNotification();
                    break;
                case auth.LOGOUT_SUCCESS:
                    localStorage.removeItem('shippingAddress');
                    localStorage.removeItem('billingAddress');
                    this.cookieService.delete('mage-cache-sessid', '/');
                    this.cookieService.delete('PHPSESSID', '/');
                    this.cookieService.delete('remember_me_token', '/');
                    this.store.dispatch(new account.RefreshPage());
                    this.store.dispatch(new auth.RefreshPage());
                    this.store.dispatch(new checkout.CartRefresh());
                    if(this.router.url.indexOf('/game/') <= -1){
                        this.router.navigate(['account/logout-success']);
                    }

                    break;
                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.cmsContentSub.unsubscribe();
        this.dispatcherSub.unsubscribe();
        this.cartItemsSub.unsubscribe();
        this.cartTotalSub.unsubscribe();
    }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: any) => {
                this.currentUrl = _.trim(event.url, '/');
            });
    }

    onDataClick(event) {
        const aTarget = _.find(event.path, (ele: any) => {
            return ele.tagName === 'A';
        });
        if (aTarget && aTarget.getAttribute('href')) {
            const href = aTarget.getAttribute('href');
            if (
                href.includes('/mobilerecharge') ||
                href.includes('/seller')
            ) {
                window.location.replace(href);
            } else {
                this.router.navigate([href]);
            }
            $('.promo-menu-drop').removeClass('open');
            $('.megamenu').removeClass('open');
            return false;
        }
    }

    onPromotionClicked(event) {
        const aTarget = _.find(event.path, (ele: any) => {
            return ele.tagName === 'A';
        });

        if (aTarget && aTarget.getAttribute('href')) {
            const href = aTarget.getAttribute('href');
            if (href.includes('campaign') || href.includes('promotions')) {
                this.router.navigate([href]);
                $('.promo-menu-drop').removeClass('open');
                return false;
            }
        }
    }

    onSecondMenuClicked(event) {
        const aTarget = _.find(event.path, (ele: any) => {
            return ele.tagName === 'A';
        });

        if (aTarget && aTarget.getAttribute('href')) {
            const href = aTarget.getAttribute('href');
            if (href.startsWith('/campaign') || href.startsWith('/promotions')  || href.startsWith('/category')) {
                this.router.navigate([href]);
                return false;
            }
        }
    }

    runScript() {
        setTimeout(() => {
            $('.promo-menu-drop a').on('mouseenter', () => {
                $('.promo-menu-drop').addClass('open');
                if (!$('body').hasClass('css-backdrop-lt')) {
                    $('body').addClass('css-backdrop-lt');
                    $('body').prepend(`<div class='backdrop-lt'> </div>`);
                }
            });

            $('.promo-menu-drop').on('mouseleave', () => {
                $('.promo-menu-drop').removeClass('open');
                $('.backdrop-lt').remove();
                $('body').removeClass('css-backdrop-lt');
            });

            $('.megamenu').on('mouseleave', () => {
                $('.megamenu').removeClass('open');
                $('body').removeClass('css-backdrop-lt');
                $('.backdrop-lt').remove();
            });

            $('.megamenu').on('mouseenter', () => {
                $('.megamenu').addClass('open');
                if (!$('body').hasClass('css-backdrop-lt')) {
                    $('body').addClass('css-backdrop-lt');
                    $('body').prepend(`<div class='backdrop-lt'> </div>`);
                }
            });
        }, 300);
    }

    showLoginModal(isRegisterTab = false) {
        this.dialogService.addDialog(LoginModal, {
            isRegisterTab: isRegisterTab
        });
    }

    logout() {
        this.store.dispatch(new auth.Logout(1));
    }

    showNotification() {
        this.isItemAddedSuccessfully = true;
        setTimeout(() => {
            this.isItemAddedSuccessfully = false;
        }, 4000);
    }

    removeItem(item) {
        this.store.dispatch(new checkout.CartDeleteItem(item));
        return false;
    }

    goToCheckoutPage() {
        this.router.navigate(['checkout'], { queryParams: { step: 1 } });
    }
}
