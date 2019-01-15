import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DeliveryAreaModal } from '../../../modals/delivery-area/delivery-area';
import { ProductSizeModal } from '../../../modals/size/size';
import { GlobalService } from '../../../services/global.service';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as products from '../../../store/products/products.actions';
import { AppConstants } from './../../../app.constant';

declare var $;

@Component({
    selector: 'lt-product-detail',
    templateUrl: './detail.html'
})

export class LtProductDetail {
    productIsLoading: any;
    authIsLogged$: Observable<any>;
    cartIsLoading$: Observable<any>;
    commonRegions$: Observable<any>;
    shippingRules$: Observable<any>;
    installmentMinumumPrice: any;

    owlCarouselOptions: any = {
        items: 1,
        dots: false,
        nav: true,
        navText: ['<div class=\'icon--prev\'> </div>', '<div class=\'icon--next\'> </div>']
    };

    isProductCheckedOut: boolean;
    addedProduct: any = {
        'cartItem': {
            'qty': 1
        }
    };
    userWishlist: any = [];
    isInUserWishlist: Boolean;
    isValidateProductQty: Boolean;
    productDetail: any;
    productChildren: Array<any> = [];
    productOptions: any = [];
    selectedOptions = [];
    selectedSku: any = {};
    stockAlertEmail = '';
    hasRegisteredStockAlert = false;
    registerAlertSuccessMessage = 'Hoorayyyy! Bạn chắc chắn sẽ nhận được Email thông báo khi có hàng và giá tốt trở lại!';
    REGEX_EMAIL = AppConstants.REGEX.EMAIL;
    currentCity: any = null;
    currentDistrict: any = null;

    subscriber: Subscription;

    userWishlistSub: any;
    activatedRouteSub: any;
    userInfoSub: any;
    productDetailSub: any;
    productIsLoadingSub: any;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute, private store: Store<fromRoot.AppState>,
        private dispatcher: Dispatcher,
        private dialogService: DialogService, private globalService: GlobalService,
        private toastr: ToastrService, private domSanitizer: DomSanitizer) {

        this.installmentMinumumPrice = AppConstants.CHECKOUT.INSTALLMENT_MINIMUM_PRICE;
        this.productIsLoadingSub = this.store.select(fromRoot.productsGetLoadingState)
            .subscribe((loading) => {
                setTimeout(() => {
                    this.productIsLoading = loading;
                }, 2);
            });
        this.cartIsLoading$ = this.store.select(fromRoot.checkoutGetLoadingState);
        this.commonRegions$ = this.store.select(fromRoot.commonGetRegions);
        this.authIsLogged$ = this.store.select(fromRoot.authGetLoggedInState);
        this.shippingRules$ = this.store.select(fromRoot.productsGetShippingRules);
        this.userWishlistSub = this.store.select(fromRoot.accountGetWishList)
            .subscribe((wishlist) => {
                this.userWishlist = wishlist;
                const productId = this.activatedRoute.params['value'].id;
                this.isInUserWishlist = _.findIndex(this.userWishlist, item => item['product_id'] === productId) > -1;
            });
        this.userInfoSub = this.store.select(fromRoot.accountGetInfo)
            .subscribe((info) => {
                if (!_.isEmpty(info)) {
                    this.stockAlertEmail = info.email;
                }
            });

        this.activatedRouteSub = this.activatedRoute.params.subscribe(() => {
            this.addedProduct = {
                'cartItem': {
                    'qty': 1
                }
            };
        });

        this.productDetailSub = this.store.select(fromRoot.productsGetDetails).subscribe((product) => {
            this.productDetail = {};
            if (!_.isEmpty(product)) {

                this.productDetail.extension_attributes = {};
                this.productDetail = product;
                this.productDetail.extension_attributes['block_marketing_area'] = this.domSanitizer.bypassSecurityTrustHtml(this.productDetail.extension_attributes.block_marketing_area);
                if (this.productDetail.extension_attributes && this.productDetail.extension_attributes.promotion && this.productDetail.extension_attributes.promotion.length) {
                    const price = this.productDetail.extension_attributes.final_price;
                    const promotion = this.productDetail.extension_attributes.promotion[0];

                    this.productDetail.extension_attributes.final_price_after_discount =
                        Number.parseInt((price * (1 - 0.01 * promotion.discount_amount)).toString());

                    if (price - this.productDetail.extension_attributes.final_price_after_discount > promotion.max_discount_amount) {
                        this.productDetail.extension_attributes.final_price_after_discount = price - promotion.max_discount_amount;
                    }
                }

                this._processOptions();
                if (this.productDetail.extension_attributes.related_products) {
                    this.initCarouselSlider();
                }

                setTimeout(() => {
                    this.globalService.runScript('banner-top-countdown');
                }, 400);
            }
        });
    }

    ngOnDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }

        if (this.userWishlistSub) {
            this.userWishlistSub.unsubscribe();
        }
        this.activatedRouteSub.unsubscribe();
        this.userInfoSub.unsubscribe();
        this.productDetailSub.unsubscribe();
    }

    ngAfterViewInit() {
        this.commonRegions$.subscribe((regions) => {
            if (regions && regions.length) {
                this._bindRegionData(regions);
            }
        });
        this.subscriber = this.dispatcher
            .subscribe((action) => {
                switch (action.type) {
                    case products.LOAD_PRODUCT_DETAILS_FAILED:
                        if (action.payload.status === 404) {
                            this.router.navigateByUrl('404', { skipLocationChange: true });
                        }
                        break;

                    case checkout.CART_CREATE_SUCCESS:
                        if (this.addedProduct && this.addedProduct.cartItem) {
                            this.addedProduct.cartItem.quoteId = action.payload;
                            this.store.dispatch(new checkout.CartAddItems({
                                product: this.addedProduct,
                                isCheckoutClicked: this.isProductCheckedOut
                            }));
                        }

                        break;

                    case checkout.CART_ADD_ITEMS_SUCCESS:
                        if (this.isProductCheckedOut) {
                            this.isProductCheckedOut = false;
                            this.router.navigate(['/checkout'], { queryParams: { step: 1 } });
                        }
                        break;

                    case checkout.CART_ADD_ITEMS_FAILED:
                        if (this.isProductCheckedOut) {
                            this.isProductCheckedOut = false;
                        }
                        break;

                    case account.WISHLIST_ADD_PRODUCT_SUCCESS:
                        this.isInUserWishlist = true;
                        break;
                    case products.REGISTER_STOCK_ALERT_SUCCESS:
                        this.hasRegisteredStockAlert = true;
                        break;
                    case products.LOAD_PRODUCT_DETAILS_SUCCESS:
                        if (!action.payload.status || (action.payload.extension_attributes && !action.payload.extension_attributes.can_show)) {
                            this.router.navigateByUrl('404', { skipLocationChange: true });
                        }
                        break;
                    default:
                        break;
                }
            });
    }

    private _checkCartRules() {
        const qty = this.addedProduct.cartItem.qty;
        const maxSold = _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50);
        if (qty > AppConstants.MAX_ITEMS_COUNT_IN_CART) {
            this.toastr.error('Không thể cập nhật, chúng tôi giới hạn tối đa ' + AppConstants.MAX_ITEMS_COUNT_IN_CART + ' sản phẩm trong giỏ hàng', 'Lỗi');
            return false;
        }
        if (this.productDetail.type_id === 'simple') {
            // if (qty > this.productDetail.extension_attributes.stock_item.qty) {
            //     this.toastr.error('Xin lỗi quý khách, số lượng sản phẩm trong kho chỉ còn ' + this.productDetail.extension_attributes.stock_item.qty + '.', 'Lỗi');
            //     return false;
            // }
        } else {
            if (!this.selectedSku) {
                this.toastr.error('Vui lòng chọn tùy chọn cho sản phẩm.', 'Lỗi');
                return false;
            }
            if (qty > this.selectedSku.qty) {
                this.toastr.error('Xin lỗi quý khách, số lượng sản phẩm trong kho chỉ còn ' + this.productDetail.extension_attributes.stock_item.qty + '.', 'Lỗi');
                return false;
            }
        }

        if (!isNaN(maxSold) && qty > maxSold) {
            this.toastr.error('Sản phẩm này giới hạn số lượng khi đặt hàng. Bạn có thể mua tối đa ' + maxSold + ' sản phẩm cho mỗi đơn hàng.', 'Lỗi');
            return false;
        }
        return true;
    }

    private _processOptions() {
        if (_.get(this.productDetail, 'extension_attributes.configurable_children', null)) {
            this.productChildren = _.get(this.productDetail, 'extension_attributes.configurable_children', []);
            this.productChildren = _.filter(this.productChildren, child => child.qty);
        } else {
            this.productChildren = [];
        }

        const countProduct = _.sumBy(this.productChildren, (child) => {
            return _.get(child, 'qty', 0);
        });

        if (!countProduct && this.productChildren.length) {
            _.set(this.productDetail, 'extension_attributes.is_out_of_stock', true);
        }

        // Get all options from children & remove duplicate
        let options = _.flatMap(this.productChildren, 'option');
        options = _.unionWith(options, _.isEqual);
        this.productOptions = _.toArray(_.groupBy(options, (option: any) => option.name));
        const minProductChildPrice = _.minBy(this.productChildren, child => child.final_price);
        const minProductIndex = _.findIndex(this.productChildren, (child) => {
            return minProductChildPrice ? minProductChildPrice.final_price === child.final_price : false;
        });

        // Select first option as default
        _.forEach(this.productOptions, function (group: any) {
            _.forEach(group, (option: any, index:any) => {
                if (index === minProductIndex) {
                    this.selectedOptions[option.name] = option;
                    this.selectOption(group, option);
                }
            });
        }.bind(this));
    }

    checkDisabledProductOptions(option, productOptions, group, children) {
        _.each(productOptions, (grp) => {
            if (grp !== group) {
                _.each(grp, (attr: any) => {
                    attr.isDisabled = false;
                });
                if (option.isSelected) {
                    _.each(grp, (opt: any) => {
                        const groupOptions = [option, opt];
                        const skus = _.find(this.productChildren, (child) => {
                            const sortGroupOptions = _.map(_.sortBy(groupOptions, s => s.option_id), (sort:any) => {
                                return _.omit(sort, ['isDisabled', 'isSelected'])
                            });

                            const sortChildOptions = _.map(_.sortBy(child.option, s => s['option_id']), (sort) => {
                                return _.omit(sort, ['isDisabled', 'isSelected'])
                            });

                            return _.isEqual(sortGroupOptions, sortChildOptions);
                        });
                        if (!skus) {
                            opt.isDisabled = true;
                        }
                    });
                }
            }
        });
    }

    selectOption(group, option) {
        if (option.isDisabled) {
            return;
        }
        if (!option.isSelected) {
            _.each(group, (attr: any) => {
                attr.isSelected = false;
            });
            option.isSelected = true;
            this.selectedOptions[option.name] = option;
            const checkedOptions = _.values(this.selectedOptions);
            this.selectedSku = _.find(this.productChildren, (child) => {
                const sortGroupOptions = _.map(_.sortBy(checkedOptions, s => s.option_id), (sort:any) => {
                    return _.omit(sort, ['isDisabled', 'isSelected'])
                });

                const sortChildOptions = _.map(_.sortBy(child.option, s => s['option_id']), (sort) => {
                    return _.omit(sort, ['isDisabled', 'isSelected'])
                })
                return _.isEqual(sortGroupOptions.sort(), sortChildOptions.sort());
            });
            if (this.selectedSku) {
                _.merge(this.productDetail.extension_attributes.stock_item, {
                    product_id: this.selectedSku.id,
                    qty: this.selectedSku.qty,
                    is_in_stock: this.selectedSku.qty > 0
                });

                if (this.productDetail.extension_attributes && this.productDetail.extension_attributes.promotion && this.productDetail.extension_attributes.promotion.length) {
                    const price = this.selectedSku.final_price;
                    const promotion = this.productDetail.extension_attributes.promotion[0];

                    this.productDetail.extension_attributes.final_price_after_discount =
                        Number.parseInt((price * (1 - 0.01 * promotion.discount_amount)).toString());

                    if (price - this.productDetail.extension_attributes.final_price_after_discount > promotion.max_discount_amount) {
                        this.productDetail.extension_attributes.final_price_after_discount = price - promotion.max_discount_amount;
                    }
                }
            }
        } else {
            option.isSelected = false;
            delete this.selectedOptions[option.name];
            this.selectedSku = null;
        }

        this.checkDisabledProductOptions(option, this.productOptions, group, this.productChildren);
    }

    showModalSize() {
        const disposable = this.dialogService.addDialog(ProductSizeModal);
    }

    registerStockEmail(form) {
        if (form.valid) {
            const payload = {
                product_id: this.productDetail.id,
                email: this.stockAlertEmail
            };
            this.store.dispatch(new products.RegisterStockAlert(payload));
        }
    }

    checkout() {
        if (this._checkCartRules()) {
            this.isProductCheckedOut = true;
            this.addToCart();
        }
    }

    addToCart() {

        if (this.addedProduct.cartItem.qty < _.get(this.productDetail, 'extension_attributes.stock_item.min_sale_qty', 1)) {
            this.isValidateProductQty = true;
            this.addedProduct.cartItem.qty = _.get(this.productDetail, 'extension_attributes.stock_item.min_sale_qty', 1);
            return;
        }
        if (this._checkCartRules()) {
            this.addedProduct.cartItem.sku = this.productDetail.sku;
            this.addedProduct.cartItem.name = this.productDetail.name;
            if (this.productDetail.type_id !== 'simple' && this.selectedSku) {
                // this.addedProduct.cartItem.sku = this.selectedSku.sku;
                const options = [];
                _.forOwn(this.selectedOptions, (option: any, key: any) => {
                    options.push({
                        option_id: option.option_id,
                        option_value: option.option_value
                    });
                });
                this.addedProduct.cartItem.product_option = {
                    extension_attributes: {
                        configurable_item_options: options
                    }
                };
            }
            const cartId = localStorage.getItem('cartId');
            if (cartId) {
                this.addedProduct.cartItem.quoteId = cartId;
                this.store.dispatch(new checkout.CartAddItems({
                    maximumShopping: _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50),
                    product: this.addedProduct,
                    isCheckoutClicked: this.isProductCheckedOut })
                );
            } else {
                this.store.dispatch(new checkout.CartCreate());
            }
        }
    }

    changeQty(qty) {
        if (this.addedProduct.cartItem.qty === 1 && qty === -1) {
            return;
        }
        this.addedProduct.cartItem.qty += qty;
    }

    onChangeLocation(city, district) {
        if (!district) {
            this.currentDistrict = null;
        }
        if (this.currentCity) {
            const payload = {
                productId: this.activatedRoute.snapshot.paramMap.get('id'),
                region: {
                    cityId: this.currentCity.id,
                    districtId: this.currentDistrict ? this.currentDistrict.id : 0
                }
            };
            this.store.dispatch(new products.ProductLoadShippingRule(payload));
        }
    }

    addToWishlist() {
        if (localStorage.getItem('token')) {
            if (!this.isInUserWishlist) {
                this.store.dispatch(new account.AddProductToWishList(this.productDetail.id));
            }
            this.router.navigate(['/account/wishlist']);
        } else {
            this.router.navigate(['/account/login'], { queryParams: { redirect: '/account/wishlist' } });
        }
    }

    getShareUrl(socialName) {
        let url = '';
        const currentUrl = encodeURIComponent(location.href);
        switch (socialName) {
            case 'facebook':
                url = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl;
                break;
            case 'twitter':
                url = 'https://twitter.com/share?url=' + currentUrl;
                break;
            case 'google':
                url = 'https://plus.google.com/share?url=' + currentUrl;
                break;
            default:
                break;
        }
        return url;
    }

    share(socialName) {
        const url = this.getShareUrl(socialName);
        const intWidth = '500';
        const intHeight = '400';
        const strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=no';
        window.open(url, 'LotteVN', strParam).focus();
        return false;
    }

    getPromotionHtml(promotion) {
        if (promotion) {
            // return promotion.replace('pro-tips', '').replace('tips-content', '').replace('inner', '');
            const replace = '<h4>Tiết kiệm hơn khi nhập M&atilde; Giảm Gi&aacute;</h4>\r\n<div class="promotion-row">\r\n<ul class="clearfix">\r\n<li>Chỉ c&ograve;n</li>\r\n<li class="pro-col-2">_FINAL_PRICE_</li>\r\n<li>\r\n<div>Nhập m&atilde;:&nbsp;<strong>_COUPON_CODE_</strong>&nbsp;(_DISCOUNT_AMOUNT_)</div>\r\n_PRO_TIPS_</li>\r\n</ul>\r\n</div>';
            return promotion.replace(replace,'');
        }
        return '';
    }

    equals(item1: any, item2: any) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    private _bindRegionData(regions) {
        this.currentCity = regions.find((region) => {
            return region.id.toString() === AppConstants.DEFAULT_REGION.CITY_ID.toString();
        });

        if (this.currentCity) {
            this.currentDistrict = this.currentCity.districts.find((district) => {
                return AppConstants.DEFAULT_REGION.DISTRICT_ID && district.id.toString() === AppConstants.DEFAULT_REGION.DISTRICT_ID.toString();
            });
        }

        if (this.currentCity) {
            this.onChangeLocation(this.currentCity, this.currentDistrict);
        }
    }

    initCarouselSlider() {
        this.owlCarouselOptions = {
            items: 1,
            dots: false,
            nav: true,
            navText: ['<span class=\'icon-wrap\'></span>', '<span class=\'icon-wrap\'></span>']
        };
    }

    goProductDetail(product) {
        this.router.navigate(['product/', product.entity_id, product.url_key]);
        return false;
    }

    openDeliveryAreaModal(isDeliveryCondition) {
        this.dialogService.addDialog(DeliveryAreaModal, {
            isDeliveryCondition: isDeliveryCondition
        });
    }

    validateProductQty(ev) {
        this.isValidateProductQty = false;
        if (this.addedProduct.cartItem.qty && this.addedProduct.cartItem.qty < _.get(this.productDetail, 'extension_attributes.stock_item.min_sale_qty', 1)) {
            this.isValidateProductQty = true;
            this.addedProduct.cartItem.qty = _.get(this.productDetail, 'extension_attributes.stock_item.min_sale_qty', 1);
            ev.preventDefault();
        }
        if (this.addedProduct.cartItem.qty > _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50)) {
            this.addedProduct.cartItem.qty = _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50);
            ev.preventDefault();
        }
    }
}
