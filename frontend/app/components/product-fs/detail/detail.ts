import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProductSizeModal } from '../../../modals/size/size';
import { ProductSizeChartModal } from '../../../modals/sizechart/sizechart';
import { GlobalService } from '../../../services/global.service';
import * as fromRoot from '../../../store';
import * as account from '../../../store/account/account.actions';
import * as checkout from '../../../store/checkout/checkout.actions';
import * as products from '../../../store/products/products.actions';
import {AppConstants} from './../../../app.constant';
import * as moment from 'moment';
import {LoginModal} from "../../../modals/login/login";
import {WishList} from "../../base/wishlist/wishlist";
import {RegionManagement} from "../../base/RegionManagement";
import {FSDeliveryAreaModal} from "../../../modals/delivery-area-fs/delivery-area";
import {FSFreeshippingAreaModal} from "../../../modals/freeshipping-area-fs/freeshipping-area";
import {GlobalConstants} from "../../base/constants/GlobalConstants";
import * as vendor from "../../../store/vendor/vendor.actions";
import {VendorPickupManagement} from "../../base/VendorPickupManagement";
import {VendorShippingTypeManagement} from "../../base/VendorShippingTypeManagement";
import {OvertimeExpressModal} from "../../../modals/overtime-express/overtime-express";
import {RMAExpressModal} from "../../../modals/rma-express/rma-express";
import {ExpressDeliveryAreaModal} from "../../../modals/express-delivery-area/delivery-area";
import {EVoucherAreaModal} from "../../../modals/e-voucher-area/evoucher-area";

declare var $;

@Component({
    selector: 'app-fs-product-detail',
    templateUrl: './detail.html'
})

export class FSProductDetail {
    productId: any;
    configurableAttributes: Array<any> = [];
    attributeIds: Array<any> = [];
    mediaGallery: any = {
        thumb:[],
        big: []
    };
    curThumbIdx: any;
    curImgUrl: string;
    selectedOptions: any = {};
    curPrice: any;
    promotionTog: boolean = false;
    socialTog: boolean = false;
    curSelected: any = {};
    vendorSub: any;
    vendorInfo: any;
    shipTypeOptions: any = GlobalConstants.SHIP_TYPE_OPTIONS;
    shipCarriers: any = GlobalConstants.SHIPPING_CARRIER;
    shipTypeSelected: any = this.shipTypeOptions.standard;
    authSub: any;
    isLoggedIn: boolean;
    Lpoint: any;
    wishListSaved: boolean = false;
    toogleShip: boolean = false;
    regions: Array<any> = [];
    selectedRegion: any = {
        city: null,
        district: null,
        ward: null,
        isOther: false
    };
    tempCity: any = null;
    keyword: any;
    regionsSearch: Array<any> = [];
    districtsSearch: Array<any> = [];
    copied: boolean = false;
    curTab: string = 'info';
    isReadMore: boolean = false;
    isVoucherReadMore: boolean = false;
    martSeller: Array<any> = [1613,1614,1615,101913,102012,1235,750,749,149,148];
    notShowSizeChartSeller: Array<any> = GlobalConstants.NOT_SHOW_SIZE_CHART_SELLER_IDS;
    notShowSizeChartCat: Array<any> = GlobalConstants.NOT_SHOW_SIZE_CHART_CAT_IDS;
    isShowSizeChart: boolean = false;
    isMart: boolean = false;
    isNew: boolean = false;
    isBlink: boolean = false;
    @ViewChild('detailDescription') detailDescription: ElementRef;
    @ViewChild('voucherDetail') voucherDetail: ElementRef;
    mktDeliveryTime: any = {
        standard:'Giao hàng tiêu chuẩn'
    };

    productIsLoading: any;
    cartIsLoading$: Observable<any>;
    commonRegions$: Observable<any>;
    shippingRules$: Observable<any>;
    expressShippingRules$: Observable<any>;
    reviews$: Observable<any>;
    installmentMinumumPrice: any;
    isExpired: any = false;

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

    isValidateProductQty: Boolean;
    productDetail: any;
    productChildren: Array<any> = [];
    stockAlertEmail = '';
    hasRegisteredStockAlert = false;
    registerAlertSuccessMessage = 'Hoorayyyy! Bạn chắc chắn sẽ nhận được Email thông báo khi có hàng và giá tốt trở lại!';
    REGEX_EMAIL = AppConstants.REGEX.EMAIL;
    currentCity: any = null;
    currentDistrict: any = null;

    subscriber: Subscription;

    activatedRouteSub: any;
    userInfoSub: any;
    productDetailSub: any;
    productIsLoadingSub: any;

    productFreshWeight: any = {
        weight:null,
        price:null,
        pricePerKg:null,
        measuring:'g',
    };

    minQty : any = 1;
    maxQty : any = 50;
    vendorPickupMgr: VendorPickupManagement = VendorPickupManagement.getInstance();
    vendorShippingTypeMgr: VendorShippingTypeManagement = VendorShippingTypeManagement.getInstance();
    pickupDurationTime: any;
    allPromotions:any;
    copiedCoupon:any;
    validtimeExpress: boolean;
    expressDurationTime: any;
    vendorSettingSub: any;
    vendorSetting: any;
    locationSelected: any = 1;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute, private store: Store<fromRoot.AppState>,
        private dispatcher: Dispatcher,
        private dialogService: DialogService,
        protected wishlist: WishList,
        private toastr: ToastrService
    ) {
        this.installmentMinumumPrice = AppConstants.CHECKOUT.INSTALLMENT_MINIMUM_PRICE;
        this.productIsLoadingSub = this.store.select(fromRoot.productsGetLoadingState)
            .subscribe((loading) => {
                setTimeout(() => {
                    this.productIsLoading = loading;
                }, 2);
            });
        this.cartIsLoading$ = this.store.select(fromRoot.checkoutGetLoadingState);
        this.commonRegions$ = this.store.select(fromRoot.commonGetRegions);
        this.shippingRules$ = this.store.select(fromRoot.productsGetShippingRules);
        this.expressShippingRules$ = this.store.select(fromRoot.productsGetExpressShippingRules);
        this.reviews$ = this.store.select(fromRoot.productsGetReviews);

        this.userInfoSub = this.store.select(fromRoot.accountGetInfo)
            .subscribe((info) => {
                if (!_.isEmpty(info)) {
                    this.stockAlertEmail = info.email;
                    this.Lpoint = info.lpoint;
                }
            });

        this.activatedRouteSub = this.activatedRoute.params.subscribe(() => {
            this.addedProduct = {
                'cartItem': {
                    'qty': 1
                }
            };
        });

        this.authSub = this.store.select(fromRoot.authGetLoggedInState).subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
        });

        this.productDetailSub = this.store.select(fromRoot.productsGetDetails).subscribe((product) => {
            // this.productDetail = {};
            // if (!_.isEmpty(product)) {
            //
            //     this.productDetail.extension_attributes = {};
            //     this.productDetail = product;
            //     this.productDetail.extension_attributes['block_marketing_area'] = this.domSanitizer.bypassSecurityTrustHtml(this.productDetail.extension_attributes.block_marketing_area);
            //     if (this.productDetail.extension_attributes && this.productDetail.extension_attributes.promotion && this.productDetail.extension_attributes.promotion.length) {
            //         const price = this.productDetail.extension_attributes.final_price;
            //         const promotion = this.productDetail.extension_attributes.promotion[0];
            //
            //         this.productDetail.extension_attributes.final_price_after_discount =
            //             Number.parseInt((price * (1 - 0.01 * promotion.discount_amount)).toString());
            //
            //         if (price - this.productDetail.extension_attributes.final_price_after_discount > promotion.max_discount_amount) {
            //             this.productDetail.extension_attributes.final_price_after_discount = price - promotion.max_discount_amount;
            //         }
            //     }
            //
            //     this._processOptions();
            //     if (this.productDetail.extension_attributes.related_products) {
            //         this.initCarouselSlider();
            //     }
            //
            //     setTimeout(() => {
            //         this.globalService.runScript('banner-top-countdown');
            //     }, 400);
            // }
            this.productDetail = product;

            this.checkPhoneCard();

            this.mediaGallery = this.productDetail.media_gallery;

            if(this.productDetail.media_gallery
                && this.productDetail.media_gallery.big
                && this.productDetail.media_gallery.big.length > 0){
                this.changeMedia(0);
            }

            if(this.productDetail.vendor_id
                && this.productDetail.vendor_id.length > 0
            ){
                this.store.dispatch(new vendor.Load({id: this.productDetail.vendor_id[0]}));
            }
            // else {
            //     this.vendorInfo = {};
            //     this.vendorInfo.is_direct_delivery = true;
            // }


            // load config info
            if(this.productDetail.type_id === 'configurable'){
                // reload state of config attributes
                this.configurableAttributes = [];
                let childrenPrice = _.get(this.productDetail, 'child_price', []);
                let childrenStock = _.get(this.productDetail, 'child_stock', []);
                // merge price, stock and filter only in stock
                this.productChildren = _.filter(
                    _.map(
                        _.map(_.get(this.productDetail, 'configurable_children', []), obj => {
                            const childPrice = {
                                price: _.find(childrenPrice, child => {
                                    const id = _.isNumber(child.id)?child.id:parseInt(child.id);
                                    if(id === obj.id) return child;
                                })
                            };

                            return _.assign(obj, childPrice);
                        }), obj => {
                            const in_stock = _.find(childrenStock, child => {
                                const id = _.isNumber(child.id)?child.id:parseInt(child.id);
                                if(id === obj.id) return child;
                            });

                            return _.assign(obj, in_stock);
                        })
                    , 'in_stock'
                );

                // get options in stock
                let options = _.flatMap(this.productChildren, 'options');

                options = _.unionWith(options, _.isEqual);

                this.attributeIds = _.keys(_.groupBy(options, 'attribute_id'));

                _.each(_.get(this.productDetail, 'configurable_attributes', []), (attr) => {
                    const values = _.filter(options, {attribute_id:attr.attribute_id}).map(value => value.label);
                    if(values.length > 0){
                        this.configurableAttributes.push({
                            position: attr.position,
                            attr_id: attr.attribute_id,
                            isColor: attr.attribute_code.indexOf('color') !== -1,
                            values: values
                        });

                    }
                });
                _.sortBy(this.configurableAttributes, ['position']);

                _.each(this.productChildren, child => {
                    _.each(child.options, option => {
                        child[option.attribute_id] = option.label;
                        return child;
                    });
                    // delete child['options'];
                });

                const simple = this.activatedRoute.snapshot.queryParams.simple;
                const id = simple? parseInt(simple):this.activatedRoute.params['value'].id;

                this.curSelected = _.find(this.productChildren, child => child.id === id);
                if(!this.curSelected){
                    this.curSelected = this.productChildren[0];
                }
                this.curSelected.simpleId = simple;

                this.loadMedia(true);

                // const selectedOption = this.configurableAttributes.find(attr => { return attr.id === this.curSelected.})
            } else {
                this.curSelected = this.productDetail;
                this.curSelected.stock_qty = this.productDetail.stock_qty;
            }

            if(this.productDetail && this.productDetail.mkt_delivery_time){
                this.isBlink = this.checkBlink();
            }

            if(this.productDetail && this.productDetail.categories){
                let categoryMeta = _.find(this.productDetail.category_full_path, (obj) => { return _.includes(obj,  this.productDetail.categories[0])  }); 
                this.productDetail.categoryMeta = _.replace(categoryMeta, 'Lotte.vn / ', '');
            }           

            this.isShowSizeChart = this.checkShowSizeChart();

            // load new label
            let last60Day = new Date();
            last60Day.setDate(last60Day.getDate() - 60);
            this.isNew = last60Day < new Date(this.productDetail.created_at);

            // this.sddShippingFreeArea();
            this.minQty = this.productDetail.min_sale_qty == ''  || this.productDetail.min_sale_qty == null  || typeof this.productDetail.min_sale_qty == 'undefined'
                    ? this.minQty : this.productDetail.min_sale_qty ;
            this.addedProduct.cartItem.qty = this.minQty;
            this.maxQty = this.productDetail.max_sale_qty == ''  || this.productDetail.max_sale_qty == null  || typeof this.productDetail.max_sale_qty == 'undefined'
                    ? this.maxQty : this.productDetail.max_sale_qty ;

            this.calculateFreshWeight();
            this.allPromotions = this.getProductPromotion();
        });

        this.vendorSub = this.store.select(fromRoot.vendorGetEntity).subscribe(vendorInfo => {
            this.vendorInfo = vendorInfo;
            if(this.vendorInfo && this.vendorInfo.landing_type > 0){
                window.location.replace('/seller/' + this.vendorInfo.id + '/' + this.vendorInfo.url_key);
            }
            if(this.vendorInfo && this.vendorInfo.id){
                this.isMart = this.checkMart();
            }

            if(this.vendorInfo
                && this.vendorInfo.carrier_code === this.shipCarriers.SIXTY
                && this.vendorInfo.shipping_service === this.shipTypeOptions.express){
                this.shipTypeSelected = this.shipTypeOptions.express;
                this.store.dispatch(new vendor.LoadLandingSetting({ id: this.vendorInfo.id }));
                this.validtimeExpress = this.validateOverTimeExpress();
                this.loopOvertimeExpress();
            }

            if(this.vendorInfo && this.vendorInfo.stores && this.vendorInfo.stores.length > 0){
                _.each(this.vendorInfo.stores, store => {
                    store.address = (store.street?store.street + ', ':'') + (store.ward?store.ward + ', ':'')
                    + (store.district?store.district + ', ':'') + (store.region?store.region:'');
                });
                this.locationSelected = this.vendorInfo.stores[0].id;
            }
            //[LT-1056] huytt: calculate shipping fee by simple id.
            this.reloadShippingRule();

            this.pickupDurationTime = this.vendorPickupMgr.getShippingDuration();
            this.loopGetPickupDurationTime();

            this.expressDurationTime = this.vendorShippingTypeMgr.getShippingDuration();
            this.loopGetExpressDurationTime();
        });

        this.vendorSettingSub = this.store.select(fromRoot.vendorGetLandingSetting).subscribe(setting => {
            this.vendorSetting = setting;
        });
    }

    ngOnDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }

        this.vendorSub.unsubscribe();
        this.vendorSettingSub.unsubscribe();
        this.activatedRouteSub.unsubscribe();
        this.userInfoSub.unsubscribe();
        this.productDetailSub.unsubscribe();
        this.productIsLoadingSub.unsubscribe();
        this.authSub.unsubscribe();

        // reset state and remove div zoom to prevent exception
        this.store.dispatch(new products.ResetProductDetailState());
        $('.zoomContainer').remove();
    }

    ngAfterViewInit() {
        this.commonRegions$.subscribe((regions) => {
            this._bindRegionData(regions);
        });

        this.productId = this.activatedRoute.snapshot.params.id;

        this.regionsSearch = _.clone(this.regions);

        this.selectedRegion = RegionManagement.getInstance(this.store).getCurrentRegion();

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
                        switch (this.shipTypeSelected){
                            case this.shipTypeOptions.standard:
                                this.vendorShippingTypeMgr.storeStorageVendorShippingType(this.vendorInfo.id, {shipping_type: this.shipTypeOptions.standard});
                                this.vendorPickupMgr.storeStorageVendorPickup(this.vendorInfo.id, {isActive: false});
                                break;
                            case this.shipTypeOptions.express:
                                this.vendorShippingTypeMgr.storeStorageVendorShippingType(this.vendorInfo.id, {shipping_type: this.shipTypeOptions.express});
                                this.vendorPickupMgr.storeStorageVendorPickup(this.vendorInfo.id, {isActive: false});
                                break;
                            case this.shipTypeOptions.pickup:
                                this.vendorShippingTypeMgr.storeStorageVendorShippingType(this.vendorInfo.id, {shipping_type: this.shipTypeOptions.pickup});
                                this.vendorPickupMgr.storeStorageVendorPickup(this.vendorInfo.id, {isActive: true});
                                break;
                        }

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
                    case account.LOAD_WISHLIST_SUCCESS:
                        if(this.productDetail.id){
                            this.wishListSaved = this.isInUserWishlist(this.productDetail.id.toString());
                        }
                        break;

                    case products.REGISTER_STOCK_ALERT_SUCCESS:
                        this.hasRegisteredStockAlert = true;
                        break;
                    case products.LOAD_PRODUCT_DETAILS_SUCCESS:
                        if (!action.payload.status
                            // || !action.payload.can_show
                        ) {
                            this.router.navigateByUrl('404', { skipLocationChange: true });
                        } else {
                            setTimeout(() => {
                                const  detailDescriptionOffset =  this.detailDescription.nativeElement.offsetHeight;
                                if(detailDescriptionOffset > 500){
                                    this.isReadMore = true;
                                }

                                const  voucherDetailOffset = this.voucherDetail.nativeElement.offsetHeight;
                                if(voucherDetailOffset > 200){
                                    this.isVoucherReadMore = true;
                                }

                            }, 100);
                        }
                        break;
                    default:
                        break;
                }
            });
    }

    private _checkCartRules() {
        const qty = this.addedProduct.cartItem.qty;
        //fixme: hardcode 50
        const maxSold = 50;
        if (qty > this.maxQty) {
            this.toastr.error('Không thể cập nhật, Bạn chỉ có thể mua tối đa ' + this.maxQty + ' sản phẩm này.', 'Lỗi');
            return false;
        }
        if (qty > AppConstants.MAX_ITEMS_COUNT_IN_CART) {
            this.toastr.error('Không thể cập nhật, chúng tôi giới hạn tối đa ' + AppConstants.MAX_ITEMS_COUNT_IN_CART + ' sản phẩm trong giỏ hàng', 'Lỗi');
            return false;
        }
        if (this.productDetail.type_id === 'simple') {
            if (qty > this.productDetail.stock_qty) {
                this.toastr.error('Xin lỗi quý khách, số lượng sản phẩm trong kho chỉ còn ' + this.productDetail.stock_qty + '.', 'Lỗi');
                return false;
            }
        } else {
            if (!this.curSelected) {
                this.toastr.error('Vui lòng chọn tùy chọn cho sản phẩm.', 'Lỗi');
                return false;
            }
            if (qty > this.curSelected.stock_qty) {
                this.toastr.error('Xin lỗi quý khách, số lượng sản phẩm trong kho chỉ còn ' + this.curSelected.stock_qty + '.', 'Lỗi');
                return false;
            }
        }

        if (!isNaN(maxSold) && qty > maxSold) {
            this.toastr.error('Sản phẩm này giới hạn số lượng khi đặt hàng. Bạn có thể mua tối đa ' + maxSold + ' sản phẩm cho mỗi đơn hàng.', 'Lỗi');
            return false;
        }
        return true;
    }

    showModalSize() {
        if(typeof this.productDetail.size_chart !== 'undefined'
            && this.productDetail.size_chart !== null
            && typeof this.productDetail.size_chart.is_active !== 'undefined'
            && this.productDetail.size_chart.is_active ){
            let disposable = this.dialogService.addDialog(ProductSizeChartModal, {
                content:  this.productDetail.size_chart.content
            });
        }



    }

    registerStockEmail(form) {
        if (form.valid) {
            const payload = {
                product_id: this.productId,
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
            if (this.productDetail.type_id !== 'simple' && this.curSelected.sku) {
                const options = [];
                _.each(this.curSelected.options, option => {
                    options.push({
                        option_id: option.attribute_id,
                        option_value: option.value_index
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
                this.store.dispatch(new checkout.CartAddItems({ maximumShopping: _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50), product: this.addedProduct, isCheckoutClicked: this.isProductCheckedOut }));
            } else {
                this.store.dispatch(new checkout.CartCreate());
            }
        }
    }

    changeQty(qty) {
        if (this.addedProduct.cartItem.qty === this.minQty && qty === -1) {
            return;
        }
        if (this.addedProduct.cartItem.qty === this.maxQty && qty === +1) {
            return;
        }
        this.addedProduct.cartItem.qty += qty;
        this.calculateFreshWeight();
    }

    onChangeLocation(city, district) {
        if (city && city.id) {
            // this.selectedDistrict = null;
            // this.selectedRegion.district = null;
            // this.store.dispatch(new checkout.CartLoadShippingRule({
            //     cityId: city.id,
            //     districtId: null
            // }));
            this.districtsSearch = _.clone(city.districts);
            this.tempCity = city;
        }

        if (district && district.id) {
            this.selectedRegion.city = _.clone(this.tempCity);
            this.selectedRegion.district = _.clone(district);
            this.selectedRegion.ward = null;
            this.selectedRegion.isOther = true;

            RegionManagement.getInstance(this.store).updateCurrentRegion(this.selectedRegion);
            this.reloadShippingRule();

            this.tempCity = null;
            this.toogleShip = false;
        }

        this.keyword = '';
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
        this.regions = regions;
        // if(!this.selectedRegion.city){
        //     this.selectedRegion.city = regions.find((region) => {
        //         return region.id.toString() === AppConstants.DEFAULT_REGION.CITY_ID.toString();
        //     });
        // }
        //
        // if (this.selectedRegion && this.selectedRegion.city) {
        //     // this.selectedRegion.district = this.selectedRegion.city.districts.find((district) => {
        //     //     return AppConstants.DEFAULT_REGION.DISTRICT_ID && district.id.toString() === AppConstants.DEFAULT_REGION.DISTRICT_ID.toString();
        //     // });
        //     this.reloadShippingRule();
        // }
    }

    // initCarouselSlider() {
    //     this.owlCarouselOptions = {
    //         items: 1,
    //         dots: false,
    //         nav: true,
    //         navText: ['<span class=\'icon-wrap\'></span>', '<span class=\'icon-wrap\'></span>']
    //     };
    // }

    // goProductDetail(product) {
    //     this.router.navigate(['product/', product.entity_id, product.url_key]);
    //     return false;
    // }

    openDeliveryAreaModal() {
        this.dialogService.addDialog(FSDeliveryAreaModal, {
            vendorShippingArea: this.vendorInfo.sdd_shipping_area
        });
    }

    // validateProductQty(ev) {
    //     this.isValidateProductQty = false;
    //     if (this.addedProduct.cartItem.qty && this.addedProduct.cartItem.qty < _.get(this.productDetail, 'extension_attributes.stock_item.min_sale_qty', 1)) {
    //         this.isValidateProductQty = true;
    //         this.addedProduct.cartItem.qty = _.get(this.productDetail, 'extension_attributes.stock_item.min_sale_qty', 1);
    //         ev.preventDefault();
    //     }
    //     if (this.addedProduct.cartItem.qty > _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50)) {
    //         this.addedProduct.cartItem.qty = _.get(this.productDetail, 'extension_attributes.stock_item.max_sale_qty', 50);
    //         ev.preventDefault();
    //     }
    // }

    selectOption(attribute, value, isHover:boolean = false){
        this.selectedOptions[attribute.attr_id] = value;
        let resFilter = _.filter(this.productChildren, this.selectedOptions);
        // get depend option values
        const tempParams = {};
        tempParams[attribute.attr_id] = value;
        let dependOptionValue = _.filter(this.productChildren, tempParams);

        if(!resFilter.length){
            delete this.selectedOptions;
            this.selectedOptions = {};
            this.selectedOptions[attribute.attr_id] = value;
            resFilter = _.filter(this.productChildren, this.selectedOptions);
        }

        if(resFilter[0]){
            this.curSelected = resFilter[0];
            if(attribute.isColor){
                this.loadMedia();
            } else {
                this.loadMedia(true);
            }

            const params = {
                simple: this.curSelected.id
            };

            const path = this.router['url'];
            const currentUrl = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));

            this.router.navigate([currentUrl], { queryParams: params });
            //[LT-1056] huytt: calculate shipping fee by simple id.
            this.reloadShippingRule();
            // if(this.vendorInfo
            //     && this.vendorInfo.carrier_code === this.shipCarriers.SIXTY
            //     && this.vendorInfo.shipping_service === this.shipTypeOptions.express){
            //     this.reloadExpressShippingRule();
            // }
        }
        // update values of depend option
        let temp = _.find(this.configurableAttributes, item => item.attr_id !==  parseInt(attribute.attr_id));
        if(temp && attribute.isColor){
            temp['values'] = dependOptionValue.map(value => value[temp.attr_id]);
        }
    }

    loadMedia(keepParentMedia = false){
        if(this.curSelected && this.curSelected.media_gallery &&
            this.curSelected.media_gallery.big && this.curSelected.media_gallery.big.length > 0){
            const idx = _.indexOf(this.mediaGallery.big, this.curSelected.media_gallery.big[0]);
            if(idx === -1 ){
                // [LT-910] huytt: keep parent media and replace the first media
                if(keepParentMedia){
                    this.mediaGallery.thumb[0] = this.curSelected.media_gallery.thumb[0];
                    this.mediaGallery.big[0] = this.curSelected.media_gallery.big[0];
                } else {
                    delete this.mediaGallery.thumb;
                    delete this.mediaGallery.big;
                    this.mediaGallery.thumb = this.curSelected.media_gallery.thumb;
                    this.mediaGallery.big = this.curSelected.media_gallery.big;
                }
                // this.curThumbIdx = this.mediaGallery.big.length - 1;
                this.curThumbIdx = 0;
            }
            this.changeMedia(this.curThumbIdx);
        } else {
            this.mediaGallery = this.productDetail.media_gallery;
        }


    }

    copy2ClipBoard(val:string){
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.copiedCoupon = val;
        setTimeout(() => {this.copied = false}, 5000);
    }

    isExpiredProductLabel(label) {
        if (label.label_to_date && label.label_from_date) {
            const now = moment();
            const toDate = moment(label.label_to_date);
            const fromDate = moment(label.label_from_date);

            if (now.isAfter(toDate) || now.isBefore(fromDate)) {
                return true;
            }
        }

        return false;
    }

    changeMedia(idx){
        this.curImgUrl = this.mediaGallery.big[idx];
        this.curThumbIdx = idx;
        // initial zoom lib
        setTimeout(() => {
            $('.product-detail-images .product-large-inner img').elevateZoom({
                scrollZoom: false,
                zoomWindowPosition: 1,
                zoomWindowOffetx: 50,
                zoomWindowWidth: 500,
                zoomWindowHeight: 500,
                borderSize: 0,
                imageCrossfade: true,
            });
        }, 100);
    }

    showLoginModal(isRegisterTab = false) {
        this.dialogService.addDialog(LoginModal, {
            isRegisterTab: isRegisterTab
        });
    }

    showSDDShippingRuleModal() {
        this.dialogService.addDialog(FSFreeshippingAreaModal, {
            vendorFreeShippingRule: this.sddShippingFreeArea()
        });
    }

    isInUserWishlist(id){
        return this.wishlist.isInUserWishlist(id.toString());
    }

    addOrRemoveWishlist(id){
        this.wishListSaved = !this.wishListSaved;
        this.wishlist.addOrRemoveWishlist(id.toString());
    }

    reloadShippingRule(){
        if(this.curSelected && this.curSelected.id){
            RegionManagement.getInstance(this.store).loadProductShippingRule(this.curSelected.id);
        }
    }

    reloadExpressShippingRule(){
        RegionManagement.getInstance(this.store).loadProductExpressShippingRule(null);
    }

    searchRegion(){
        if (!this.tempCity) {
            if(this.keyword === undefined || this.keyword === ''){
                this.regionsSearch = _.clone(this.regions);
            } else {
                this.regionsSearch = _.filter(this.regions, item => {

                    return item.name.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
                });
            }
        } else {
            if(this.keyword === undefined || this.keyword === ''){
                this.districtsSearch = _.clone(this.tempCity.districts);
            } else {
                this.districtsSearch = _.filter(this.tempCity.districts, item => {
                    return item.name.toSlugify().indexOf(this.keyword.toSlugify()) >= 0;
                });
            }
        }
    }

    sddRegionSupport(){
        if(this.vendorInfo && this.vendorInfo.is_sdd){
            let temp = null;
            if(this.selectedRegion.city){
                temp = _.find(this.vendorInfo.sdd_shipping_area, city => {
                    return city.id === this.selectedRegion.city.id;
                });

                if(!temp){
                    return false;
                }
            }

            if(this.selectedRegion.district){
                temp = _.find(temp.districts, district => {
                    return district.id === this.selectedRegion.district.id;
                });

                if(!temp){
                    return false;
                }
            }

            return true;

        }
        return false;
    }

    updateMinPurchase(region, min_purchase){
        _.each(region.districts, district => {
            if(!district.min_purchase || district.min_purchase < min_purchase){
                district.min_purchase = min_purchase;
            }
        });
    }

    sddShippingFreeArea(){
        // const test = [
        //     {
        //         name: "Bắc Giang",
        //         districts: [
        //             {
        //                 name: "Huyện Lạng Giang",
        //                 id: "29",
        //                 wards: [
        //                     {
        //                         min_purchase: "[ANY]",
        //                         name: "Xã Đại Lâm",
        //                         id: "390"
        //                     }
        //                 ]
        //             }
        //         ],
        //         id: "1031"
        //     },
        //     {
        //         name: null,
        //         districts: [
        //             {
        //                 name: null,
        //                 id: "0",
        //                 wards: [
        //                     {
        //                         min_purchase: "100000",
        //                         name: "[All]",
        //                         id: "0"
        //                     }
        //                 ]
        //             }
        //         ],
        //         id: "0"
        //     },
        //
        // ];
        let res = [];
        if(this.vendorInfo && this.vendorInfo.is_sdd){
            const areas = _.sortBy(this.vendorInfo.sdd_shipping_free_area, area => {return area.id;});
            // const areas = _.sortBy(test, area => {return area.id;});
            _.each(areas, area => {
                if(area.id === "0"){
                    res = _.clone(this.regions);
                    _.each(res, region => {
                        this.updateMinPurchase(region, area.districts[0].wards[0].min_purchase);
                    });
                } else {
                    let region = _.find(res, region => {return region.id === area.id});

                    if(!region){
                        region = _.find(this.regions, region => {return region.id === area.id});
                    }

                    if(region){
                        if(region.districts.length > 0 && region.districts[0].id !== '0'){
                            region.districts = _.filter(region.districts, district => {
                                return area.districts.findIndex(item => {
                                    return item.id === district.id;
                                }) !== -1;
                            });
                        }

                        res.push(region);

                        _.each(area.districts, district => {
                            _.each(district.wards, ward => {
                                this.updateMinPurchase(region, ward.min_purchase);
                            });
                        });
                    }
                }
            });

        }
        return res;
    }

    @ViewChild('shareBlock') shareBlock: ElementRef;
    @ViewChild('promotionBlock') promotionBlock: ElementRef;
    @ViewChild('areaContent') areaContent: ElementRef;

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        let clickedInsideShareBlock = this.shareBlock?this.shareBlock.nativeElement.contains(targetElement):null;
        let clickedInsidePromotionBlock = this.promotionBlock?this.promotionBlock.nativeElement.contains(targetElement):null;
        let clickedInsideAreaContent = this.areaContent?this.areaContent.nativeElement.contains(targetElement):false;

        if(this.toogleShip && !targetElement.parentElement){
            clickedInsideAreaContent = true;
        }

        if(this.promotionTog && !targetElement.parentElement){
            clickedInsidePromotionBlock = true;
        }

        this.socialTog = clickedInsideShareBlock?this.socialTog:false;
        this.promotionTog = clickedInsidePromotionBlock?this.promotionTog:false;
        this.toogleShip = clickedInsideAreaContent?this.toogleShip:false;
    }

    scrollToTab(tab: string = 'info'){
        this.curTab = tab;
        let selector, offset;

        switch (tab){
            case 'review':
                selector = document.querySelector('.review-content-lt');
                if($('.product-detail-tabs').hasClass('fixtop-tab')){
                    offset = selector?selector['offsetTop'] - 172:0;
                } else {
                    offset = selector?selector['offsetTop'] - 252:0;
                }
                break;
            case 'info':
                selector = document.querySelector('.product-attributes');
                offset = selector?selector['offsetTop'] - 200:0;
                break;
        }

        // window.scrollTo(0, offset);
        window.scrollTo({
            top: offset,
            behavior: "smooth"
        });
    }

    scrollToAreaList(tab: string = 'info'){
        this.curTab = tab;
        let selector, offset;

        selector = document.querySelector('.area-list-applied');
        offset = selector?selector['offsetTop'] - 120:0;

        window.scrollTo({
            top: offset,
            behavior: "smooth"
        });
    }

    showAreaModal(){
        if(this.vendorInfo && this.vendorInfo.stores && this.vendorInfo.stores.length){
            this.dialogService.addDialog(EVoucherAreaModal, {
                storeArea: this.vendorInfo.stores,
                locationSelected: this.vendorInfo.stores[0].id
            });
        }
    }

    checkMart(){
        return this.martSeller.findIndex(item => {
            return item === this.vendorInfo.id;
        }) !== -1;
    }

    checkPhoneCard(){
        if(this.productDetail && this.productDetail.custom_attributes ) {
            const attribute = this.productDetail.custom_attributes.find(attr => {
                return attr.attribute_code === 'phone_card_type';
            });

            if(attribute && attribute.value){
                switch (attribute.value){
                    case 'Phone Card':
                        window.location.replace('/mobilerecharge/phonecard');
                        // this.router.navigate(['mobilerecharge/phonecard']);
                        break;
                    case 'Game Card':
                        window.location.replace('/mobilerecharge/gamecard');
                        // this.router.navigate(['mobilerecharge/gamecard']);
                        break;
                    case 'Top Up':
                        window.location.replace('/mobilerecharge/topup');
                        // this.router.navigate(['mobilerecharge/topup']);
                        break;
                }

            }
        }
    }

    getBlinkInfo(){
        return this.productDetail && this.productDetail.mkt_delivery_time
        && this.productDetail.mkt_delivery_time !== this.mktDeliveryTime.standard?this.productDetail.mkt_delivery_time + ' sau khi xác nhận đơn hàng thành công':null;
    }

    checkBlink(){
        return GlobalConstants.SHIPPING_BLINK.findIndex(item => {
            return item.toString() === this.productDetail.mkt_delivery_time;
        }) !== -1;
    }

    checkShowSizeChart(){
        return !(this.vendorInfo && this.vendorInfo.id && this.notShowSizeChartSeller.includes(parseInt(this.vendorInfo.id)))
            && this.notShowSizeChartCat.findIndex(item => {
                return this.productDetail && this.productDetail.category_ids && this.productDetail.category_ids.includes(item.toString())
            }) === -1
    }


    calculateFreshWeight(){
        if(!_.isNumber(this.productDetail.packaging_weight) || this.productDetail.packaging_weight <= 0)return false;
        let math = Math;
        if((this.productDetail.packaging_weight * 1000 * this.addedProduct.cartItem.qty) >= 1000){
            this.productFreshWeight.weight     = parseFloat((this.productDetail.packaging_weight * this.addedProduct.cartItem.qty).toFixed(1));
            this.productFreshWeight.price      = this.productDetail.price.VND.default * this.addedProduct.cartItem.qty;
            this.productFreshWeight.pricePerKg = math.ceil(this.productDetail.price.VND.default / this.productDetail.packaging_weight);
            this.productFreshWeight.measuring  = 'kg';
        }else{
            this.productFreshWeight.weight      = this.productDetail.packaging_weight * 1000 * this.addedProduct.cartItem.qty;
            this.productFreshWeight.price       = this.productDetail.price.VND.default * this.addedProduct.cartItem.qty;
            this.productFreshWeight.pricePerKg  = math.ceil(this.productDetail.price.VND.default / this.productDetail.packaging_weight) ;
            this.productFreshWeight.measuring   = 'g';
        }
    }

    formatPrice(x){
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");

    }

    loopGetPickupDurationTime(){
        if(this.vendorInfo && this.vendorInfo.pickup_enable){
            setTimeout(() => {
                this.pickupDurationTime = this.vendorPickupMgr.getShippingDuration();
                this.loopGetPickupDurationTime();
            }, 600000);
        }
    }

    getProductPromotion() {
        let allPromotions = [];

        if(typeof this.productDetail.promotion !== 'undefined' && this.productDetail.promotion != null){
            allPromotions.push(this.productDetail.promotion);
        }

        if(typeof this.productDetail.promotions_seller !== 'undefined'
            && this.productDetail.promotions_seller.length > 0
            && this.productDetail.promotions_seller != null
        ) {
            _.each(this.productDetail.promotions_seller, function (value) {
                allPromotions.push(value);
            });
        }

        if (allPromotions.length > 0) {
            _.each(allPromotions, function (value) {
                value.price_sort = parseInt(value.final_price.replace(/\.|₫|\s/g, ''));
            });
        }

        if(allPromotions.length > 0){
            allPromotions = _.orderBy(allPromotions, ['price_sort'], ['asc']);
        }

        return allPromotions;
    }

    validateOverTimeExpress(){
        return (new Date()).getHours() < GlobalConstants.OVERTIME_EXPRESS;
    }

    loopOvertimeExpress(){
        if(this.validtimeExpress){
            setTimeout(() => {
                this.validtimeExpress = this.validateOverTimeExpress();
                this.loopOvertimeExpress();
            }, 600000);
        } else if(this.vendorInfo
                && this.vendorInfo.carrier_code === this.shipCarriers.SIXTY
                && this.vendorInfo.shipping_service === this.shipTypeOptions.express) {
            this.dialogService.addDialog(OvertimeExpressModal).subscribe(confirm => {
                if(!confirm) {
                    window.location.href = '/';
                }
            });
        }
    }

    showRMAExpressModal(){
        this.dialogService.addDialog(RMAExpressModal, {vendorSetting: this.vendorSetting});
    }

    showExpressDeliveryAreaModal(){
        this.dialogService.addDialog(ExpressDeliveryAreaModal);
    }

    loopGetExpressDurationTime(){
        if(this.vendorInfo
            && this.vendorInfo.carrier_code === this.shipCarriers.SIXTY
            && this.vendorInfo.shipping_service === this.shipTypeOptions.express){
            setTimeout(() => {
                this.expressDurationTime = this.vendorShippingTypeMgr.getShippingDuration();
                this.loopGetPickupDurationTime();
            }, 600000);
        }
    }

}
