import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';

import { GlobalService } from '../../services/global.service';
import * as fromRoot from '../../store';
import * as campaign from '../../store/campaign/campaign.actions';
import { CampaignService } from '../../store/campaign/campaign.service';
import * as checkout from '../../store/checkout/checkout.actions';
import {WishList} from "../../components/base/wishlist/wishlist";

declare var $;
// Redux
@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.html',
    styleUrls: ['./campaign.less']
})

export class LotteCampaign {
    campaign: any;
    selectedProduct: any = {
        'cartItem': {}
    };
    isCartBeingCreated: boolean;
    isCheckoutClicked: boolean;
    promotionIds: any = [];

    campaignSub: any;
    dispatcherSub: any;
    activatedRouteSub: any;
    wishListSaved : any;
    curHover: any;
    cloneImg:any;
    constructor(
        private store: Store<fromRoot.AppState>,
        private activatedRoute: ActivatedRoute,
        private campaignService: CampaignService,
        private globalService: GlobalService,
        private dispatcher: Dispatcher,
        private router: Router,
        protected wishlist: WishList) {
        const campaignUrlKey = this.activatedRoute.params['value'].id;

        this.activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
            const mobileReacharge = ['topup', 'phonecard', 'gamecard'];
            const param = this.activatedRoute.params['value'].id;
            if (mobileReacharge.indexOf(param) > -1) {
                window.location.href = '/mobilerecharge/' + param;
            }

            this.store.dispatch(new campaign.Load(this.activatedRoute.params['value'].id));
        });
        $('body').addClass('cms-page-view');
        this.campaignSub = this.store.select(fromRoot.campaignGetCampaign)
            .subscribe((campaign) => {
                this.campaign = campaign;
                setTimeout(() => {
                    const campaignDiv = $('.lt-campaign-products');

                    this.appendHtmlProductList(campaignDiv);
                }, 500);
            });

        this.selectedProduct = {
            'cartItem': {}
        };

        this.dispatcherSub = dispatcher.subscribe((action) => {
            switch (action.type) {
                case checkout.CART_CREATE_SUCCESS:
                    this.isCartBeingCreated = false;
                    this.selectedProduct.cartItem.quoteId = action.payload;
                    if (this.selectedProduct.cartItem.sku) {
                        this.store.dispatch(new checkout.CartAddItems({ product: this.selectedProduct, isCheckoutClicked: this.isCheckoutClicked }));
                    }
                    break;

                case checkout.CART_CREATE_FAILED:
                    this.isCartBeingCreated = false;
                    break;

                case checkout.CART_ADD_ITEMS_SUCCESS:
                    if (this.isCheckoutClicked) {
                        this.isCheckoutClicked = false;
                        this.router.navigate(['checkout'], { queryParams: { step: 1 } });
                    } else {
                        if (action.payload.sku) {
                            this.removeLoader('tocart-' + action.payload.sku);
                        }
                    }
                    this.selectedProduct = {
                        'cartItem': {}
                    };
                    break;

                case checkout.CART_ADD_ITEMS_FAILED:
                    this.isCheckoutClicked = false;
                    this.isCartBeingCreated = false;
                    this.removeAllLoader();
                    break;

                case campaign.LOAD_FAILED:
                    if (action.payload.status === 404) {
                        this.router.navigateByUrl('404', { skipLocationChange: true });
                    }
                    break;
                default:
                    break;
            }
        });

    }

    ngOnDestroy() {
        $('body').removeClass('cms-page-view');
        this.campaignSub.unsubscribe();
        this.dispatcherSub.unsubscribe();
        this.activatedRouteSub.unsubscribe();
    }

    getProductHtml(product) {
        let discount = '';
        let noBottomClass = product.type_id !== 'configurable' ? 'no-bottom' : '';
        if(product.price.VND.price && product.price.VND.default !== product.price.VND.price){
            const currentPrice = Number.parseFloat(product.price.VND.default);
            const basePrice = Number.parseFloat(product.price.VND.price);
            const percent = (((basePrice - currentPrice) / basePrice) * 100).toFixed(0);
            discount = percent ? `<span class="discount-lbl">-` + percent + '%</span>' : null;
        }
        let installment = product.accept_installment ?  '<span class="installment-lbl">Trả góp 0%</span>' : '';
        let voucher = '';
        if(typeof product.promotion !== 'undefined'){
            voucher =  (product.promotion.display_category_page !== '0' && product.promotion.title)
                ? `<div class="field-voucher-code">` + product.promotion.title + `</div>`
                : '';
        }

        let labelsAndGifts      = this.getProductLabelHtml(product);

        let brand = '';
        if(product.product_brand != null && product.product_brand != '' && typeof product.product_brand_info.url != 'undefined'){
            brand =  `<span class="brand-name">
                <a href="` + product.product_brand_info.url + `">
                    ` + product.product_brand + `
                </a>
            </span>`;
        }


        return `<div class="item-product">
                <div class="inner ` + noBottomClass +`">
                    <div class="field-img">
                        <a class="thumb-img" href="/product/` + product.id + `/` + product.url.toUrlKey() + `">
                            <img width="234" height="304" src="https:` + product.image_url + `" width="240" height="312" />
                        </a>`
            + labelsAndGifts +

            `</div>
                    <div class="info">
                        <div class="field-brand">`
                            + brand+ discount +  installment +
                        `</div>
                        <div class="field-name">
                            <a href="/product/` + product.id + `/` + product.url.toUrlKey() + `" data-id="` + product.id + `" data-url="` + product.url.toUrlKey() + `">
                                ` + product.name + `
                            </a>
                        </div>
                        ` + this.getProductPriceHtml(product) + `
                        ` + voucher + `
                        ` + this.getProductAttributeConfigurable(product) + `
                    </div>
                </div>
            </div>
        `;
    }

    getProductAttributeConfigurable(product){

        if(product.type_id === 'configurable' ){
            let result = '';
            let configurableAttributes = [];
            let childrenPrice = _.get(product, 'child_price', []);
            let childrenStock = _.get(product, 'child_stock', [])
            let productChildren = _.filter(
                _.map(
                    _.map(_.get(product, 'configurable_children', []), obj => {
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

            let options = _.flatMap(productChildren, 'options');

            options = _.unionWith(options, _.isEqual);
            _.each(_.get(product, 'configurable_attributes', []), (attr) => {
                const values = _.filter(options, {attribute_id:attr.attribute_id}).map(value => value.label);

                let productChild = _.get(product,'configurable_children',)

                //const info = _.filter(productChildren, {options:attr});

                if(values.length > 0){
                    configurableAttributes.push({
                        position: attr.position,
                        attr_id: attr.attribute_id,
                        name: attr.label,
                        isColor: attr.attribute_code.indexOf('color') !== -1,
                        values: values
                    });

                }
            });

            _.sortBy(configurableAttributes, ['position']);


            _.each(configurableAttributes, attribute => {
                const values = _.filter(productChildren, {options:attribute.attribute_id}).map(value => value.label);
                let productSimpleInfo = {
                    id:null,
                    media:null
                };

                if(attribute.isColor){
                    result += `<div class="color-options">`
                    _.each(attribute.values, function(value,index:number) {
                        _.each(productChildren, child => {
                            if(typeof child.options[0].label !== 'undefined'){
                                if(child.options[0].label === value){
                                    let mmedia = product.image_url;
                                    if(typeof child.media_gallery.medium !== 'undefined' && child.media_gallery.medium.length > 0 ){
                                        mmedia = child.media_gallery.medium[0];
                                    }
                                    productSimpleInfo = {
                                        id:child.id,
                                        media:mmedia
                                    };
                                }
                            }

                        })

                        if(index < 4){
                            result += `<a class="simple-`+product.id+`"
                            data-class="attr"
                            data-product-id = "`+product.id+`"
                            data-product-href = "`+product.url.toUrlKey()+`"
                            data-attr-id = "`+productSimpleInfo.id+`"
                            data-attr-media = "`+productSimpleInfo.media+`"
                            data-is-color = "1"
                            >` +value+`</a>`;
                        }

                    });
                    if(attribute.values.length > 3){
                        result += `<a href="/product/`+product.id+`/`+product.url.toUrlKey()+`">...</a>`;
                    }

                    result += `</div>`;
                }else{
                    result += `<div class="more-info more-full"><div class="size-options">`
                    _.each(attribute.values, function(value,index:number) {
                        if(value != 'false'){
                            result += `<a class="attr"
                            data-class="attr"
                            data-product-id = "`+product.id+`"
                            data-product-href = "`+product.url.toUrlKey()+`"
                            data-attr-id = "`+attribute.attr_id+`"
                            data-is-color = "0"
                            >` +value+`</a>`;
                            if(index < (attribute.values.length - 1)){
                                result+='/';
                            }
                        }

                    });

                    result += `</div></div>`;
                }
            });

            return `<div class="bottom"> ` + result + `</div>`;
        }
        return '';
    }
    getProductButtonHtml(product) {
        const productInfo = ` data-sku="` + product.sku + `" `
            + `data-name="` + product.name + `" `
            + `data-url="` + product.url.toUrlKey() + `" `
            + `data-type="` + product.type_id + `" `
            + `data-id="` + product.id + `" `;
        if (product.in_stock) {
            return `<div class="btn-actions">
                        <form>
                            <button type="button" title="Thêm vào giỏ hàng"` + productInfo + `data-action="tocart" id="tocart-` + product.sku + `"
                                class="action tocart primary action-redirect">
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                        </form>
                        <form>
                            <button type="button" title="Mua" class="action buy-cart primary"` + productInfo + `data-action="buy-cart" id="buycart-` + product.sku + `">
                                <span>Mua</span>
                            </button>
                        </form>
                    </div>`;
        }

        return `<div class="btn-actions">
                    <div class="stock unavailable">
                        <span>Hết hàng</span>
                    </div>
                </div>`;
    }

    getProductLabelHtml(product) {
        let labelHtml = '';
        let giftMessagesHtml = '';
        if(typeof product.label === 'undefined') return '';

        let label = product.label;

        let last60Day = new Date();
        last60Day.setDate(last60Day.getDate() - 60);
        let isNew = last60Day < new Date(product.created_at);

        let labelIsNew  = isNew || product.label.length > 0 ?
            `<span class="lbl" >Mới</span>` : '' ;


        let labelHtmlBottom = '';
        if (label && label.length) {
            let resultTopLeft  = '';
            let resultTopRight = '';
            let resultBottom   = '';
            _.each(label, (lb: any) => {
                if (lb.cat_img_url && !this.isExpiredProductLabel(lb) && lb.label_position === 'left' ) {
                    resultTopLeft += `<img src="`+lb.cat_img_url+`" alt="">`;
                }
                if (lb.cat_img_url && !this.isExpiredProductLabel(lb) && lb.label_position === 'right' ) {
                    resultTopRight += `<img src="`+lb.cat_img_url+`" alt="">`;
                }
                if (lb.cat_img_url && !this.isExpiredProductLabel(lb) && lb.label_position === 'bottom' ) {
                    resultBottom  += `<img src="`+lb.cat_img_url+`" alt="">`;
                }
            });
            let labelHtmlTopLeft =  `<div class="field-badge-top" >
                    ` + labelIsNew + resultTopLeft + `
                    </div>`;
            let labelHtmlTopRight =  `<div class="field-badge-top-right" >
                    ` + resultTopRight + `
                    </div>`;
            labelHtmlBottom = `<div class="field-img-bottom" >
                    ` + resultBottom + `
                    </div>`;


            labelHtml = labelHtmlTopLeft + labelHtmlTopRight;
        }

        giftMessagesHtml = '<div class="field-badge-bottom">'+this.getProductGiftMessages(product)+'</div>';

        return labelHtml+giftMessagesHtml+labelHtmlBottom;
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

    getProductGiftMessages(product){
        if(typeof product.gift_messages === 'undefined') return '';
        let result = '';
        var giftTemplate = '';

        if(product.gift_messages.length > 0){

            let giftsAll = _.sortBy( product.gift_messages, ['priority'], ['desc'] );
            let gifts = giftsAll.slice(0,3);

            _.each(gifts, (gift: any) => {

                if (gift.display_category_page) {
                    result += `<p>•`+gift.title+`</p>`;
                }

            });
            if(giftsAll.length > 3){
                result += '<p>+ Nhiều quà tặng khác</p>';
            }
            giftTemplate = `
                <div class="gift-info" >
                    <button class="btn-gift"><span>Gift info</span></button>
                    <div class="gift-tips">
                        <div class="inner">
                        `+ result +`
                        </div>
                    </div>
                </div>
                ` + this.getProductWishlishButton(product) + `

            `;
        }

        return giftTemplate;

    }

    getProductWishlishButton(product){
        this.wishListSaved = this.isInUserWishlist(product.id);
        let wishlistClass  =  this.wishListSaved ? 'saved' : '';
        const token = localStorage.getItem('token');
        if(token){
            return `
                <button class="btn-save ` + wishlistClass + `" data-action="wishlist">
                    <span>Save for later</span>
                </button>
            `;
        }
        return '';

    }

    getProductPriceHtml(product) {
        let curPrice = product.price;
        let oldPrice = curPrice.VND.default !== curPrice.VND.price
            ? `<span class="old-price">` + curPrice.VND.price_formated +` </span>`
            : '' ;
        return `
            <div class="field-price">
                ` + oldPrice + `
                <span class="current-price">
                    ` + curPrice.VND.default_formated + `
                </span>
            </div>
        `;
        // if (product.price.VND.price && product.price.VND.default !== product.price.VND.price) {
        //     return `<p class="special-price">
        //             <span class="current-price">
        //                 <span class="final-price" data-price-type="basePrice" data-price-amount="` + _.get(product, 'price.VND.price', 0) + `">
        //                     ` + _.get(product, 'price.VND.default_formated', 0) + `
        //                 </span>
        //             </span>

        //             <span class="discount-label">
        //                 ` + _.get(product, 'price.VND.default_discount_label') + `
        //             </span>
        //         </p>

        //         <p class="old-price">
        //             <span class="final-price">
        //                 ` + _.get(product, 'price.VND.price_formated') + `
        //             </span>
        //         </p>`;
        // }

        // return `<p class="special-price">
        //             <span class="current-price">
        //                 <span class="final-price" data-price-type="basePrice" data-price-amount="` + _.get(product, 'price.VND.price', 0) + `">
        //                     ` + _.get(product, 'price.VND.default_formated', 0) + `
        //                 </span>
        //             </span>
        //         </p>`;
    }

    getGiftVoucherHtml(product) {
        if (product.promotion && product.promotion.title) {
            return `<div class="gift-voucher-label">
                <div class="voucher-info">` + product.promotion.title + `</div>
            </div>`;
        }
        return '';
    }

    getInstallmentHtml(product) {
        if (!product.accept_installment) {
            return '';
        }

        return `<p class="field-installment">
                    <span class="installment-inner">Trả góp
                        <strong>0%</strong> từ
                        <span class="price">` + product.price.VND.installment_price_formatted + `</span>
                    </span>
                </p>`;
    }

    runCarouselScript(promotionId) {
        setTimeout(function () {
            const hasCarousel = $('#products-list-' + promotionId).parent().parent().hasClass('owl-carousel');
            if (hasCarousel) {
                const itemsCarousel = $('#products-list-' + promotionId).parent().parent().attr('data-items');
                const slideby = $('#products-list-' + promotionId).parent().parent().attr('data-slideby');
                $('#products-list-' + promotionId).owlCarousel({
                    items: itemsCarousel ? itemsCarousel : 5,
                    loop: false,
                    nav: true,
                    margin: 20,
                    URLhashListener: true,
                    autoplayHoverPause: true,
                    startPosition: '0',
                    slideBy: slideby ? slideby : 5
                });
            }

            $('.campaign-content.has-scroll .lt-campaign-products .products-cate-list').each(function () {
                let totalWidth = 0;
                $(this).children().each(function () {
                    totalWidth = totalWidth + $(this).outerWidth();
                });
                $(this).css('width', totalWidth + 10);
            });
        }, 300);
    }

    appendHtmlProductList(promotionsDiv) {

        _.each(promotionsDiv, (ele: any) => {
            const promotionId = ele.getAttribute('data-promotion-id');
            const limit = ele.getAttribute('data-promotion-limit');
            const eleParens = $(ele).parents();
            const eleActive = _.find(eleParens, (e: any) => {
                return e.className && e.className.includes('tabs-content active');
            });

            const isClickedTabs = _.find(eleParens, (e: any) => {
                return e.className && e.className.includes('click-tabs');
            });
            if ((isClickedTabs && eleActive) || !isClickedTabs) {
                if (_.findIndex(this.promotionIds, (pro) => pro === promotionId) === -1) {
                    this.campaignService.loadProductsByPromotion(promotionId, { hitsPerPage: limit })
                        .map(data => data.json())
                        .subscribe((products) => {
                            this.promotionIds.push(promotionId);
                            let productHTML = '';
                            _.each(products.hits, (product) => {
                                productHTML += this.getProductHtml(product);
                            });

                            ele.innerHTML = `<div class="products-cate-list" id="products-list-` + promotionId + `">` + productHTML + `</div>`;

                            this.runCarouselScript(promotionId);
                        });
                }
            }
        });
    }

    onDataClick(event) {
        const aTarget = _.find($(event.target).parents(), (ele: any) => {
            return ele.tagName === 'A';
        });

        const isClickTabs = _.find($(event.target).parents(), (ele: any) => {
            return ele.className && ele.className.includes('click-tabs');
        });

        if (aTarget && aTarget.getAttribute('href')) {
            const href = aTarget.getAttribute('href');
            if (href.includes('#') && href !== '#') { // For tabs
                if ($(href).hasClass('tabs-content') && isClickTabs) {
                    $(href).siblings().removeClass('active');
                    $(aTarget).parent().siblings().removeClass('active');
                    $(aTarget).parent().addClass('active');
                    $(href).addClass('active');
                    const divProducts = $(href).find('.lt-campaign-products');
                    this.appendHtmlProductList(divProducts);
                } else {
                    const scrollHeight = $(href).offset() ? $(href).offset().top : $('#lt-campaign').offset().top;
                    window.scroll({
                        top: scrollHeight - 30,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
                return false;
            }
        }

        if (event.target && event.target.getAttribute('data-sku')) {
            const sku = event.target.getAttribute('data-sku');
            const name = event.target.getAttribute('data-name');
            const slug = event.target.getAttribute('data-url');
            const type = event.target.getAttribute('data-type');
            const id = event.target.getAttribute('data-id');
            const action = event.target.getAttribute('data-action');

            const product = {
                type_id: type,
                id: id,
                sku: sku,
                name: name,
                slug: slug
            };

            if (!event.target.getAttribute('class').includes('disabled')) {
                if(action == 'wishlist'){
                    this.addOrRemoveWishlist(product.id);
                }else{
                    if (action === 'tocart') {
                        this.addToCart(product, event);
                    } else {
                        this.checkout(product, event);
                    }
                }

            }
        }

        if (event.target && event.target.getAttribute('href') && event.target.getAttribute('data-id') && event.target.getAttribute('data-url')) {
            const id = event.target.getAttribute('data-id');
            const slug = event.target.getAttribute('data-url');
            this.goProductDetail({
                id: id,
                slug: slug
            });

            return false;
        }

        if (event.target && event.target.getAttribute('data-href')) {
            const id = event.target.getAttribute('data-id');
            const slug = event.target.getAttribute('data-url');
            this.goProductDetail({
                id: id,
                slug: slug
            });

            return false;
        }

        if (event.target && event.target.getAttribute('class') == 'attr' ) {

            const slug      = event.target.getAttribute('data-product-href');
            const productId = event.target.getAttribute('data-product-id');
            const params    = {
                simple: event.target.getAttribute('data-attr-id')
            };
            this.router.navigate(['product/', productId, slug],{ queryParams: params });

            return false;
        }


    }

    onDataHover(event){
        if (event.target && event.target.getAttribute('data-class') == 'attr' ) {
            if(event.target.getAttribute('data-is-color')){
                const url = event.target.getAttribute('data-attr-media');
                const id  = 'simple-'+event.target.getAttribute('data-attr-id');
                this.cloneImg = $('.'+id).parent('div').parent('div').parent('div').closest('.field-img').children('a.thumbail').children('img').attr('src');
                $('.'+id).parent('div').parent('div').parent('div').closest('.field-img').children('a.thumbail').children('img').attr('src',url);
            }
        }
        return false;
    }
    onDataMouseLeave(event){
        if (event.target && event.target.getAttribute('data-class') == 'attr' ) {
            if(event.target.getAttribute('data-is-color')){
                const url = event.target.getAttribute('data-attr-media');
                const id  = 'simple-'+event.target.getAttribute('data-attr-id');
                $('.'+id).parent('div').parent('div').parent('div').closest('.field-img').children('a.thumbail').children('img').attr('src',this.cloneImg);
            }
        }
        return false;
    }

    checkout(product, ev) {
        this.isCheckoutClicked = true;
        this.addToCart(product, ev);
        ev.stopPropagation();
    }

    addToCart(product, ev) {
        if (product.type_id !== 'simple') {
            this.goProductDetail(product);
            ev.stopPropagation();
            return;
        }

        if (product.sku) {
            if (!this.isCheckoutClicked) {
                const buttonId = ev.target.getAttribute('id');
                this.showLoader(buttonId);
            }

            this.selectedProduct = {
                'cartItem': {
                    'sku': product.sku,
                    'name': product.name,
                    'qty': 1
                }
            };

            const cartId = localStorage.getItem('cartId');
            if (cartId) {
                this.selectedProduct.cartItem.quoteId = cartId;
                this.store.dispatch(new checkout.CartAddItems({ product: this.selectedProduct, isCheckoutClicked: this.isCheckoutClicked }));
            } else {
                this.isCartBeingCreated = true;
                this.store.dispatch(new checkout.CartCreate());
            }
        }

        if (ev) {
            ev.stopPropagation();
        }
    }

    showLoader(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('disabled');
        }

    }

    removeLoader(id) {
        const element = document.getElementById(id);
        if (element && element.classList.contains('disabled')) {
            element.classList.remove('disabled');
        }
    }

    removeAllLoader() {
        const buttons = document.querySelectorAll('.tocart');
        _.each(buttons, (button) => {
            if (button.classList.contains('disabled')) {
                button.classList.remove('disabled');
            }
        });
    }

    goProductDetail(product) {
        this.router.navigate(['product/', product.id, product.slug]);
        return false;
    }

    isInUserWishlist(productId){
        return this.wishlist.isInUserWishlist(productId);
    }

    addOrRemoveWishlist(productId) {
        this.toggleWishListSaved();
        this.wishlist.addOrRemoveWishlist(productId);
    }

    toggleWishListSaved(){
        this.wishListSaved = !this.wishListSaved;
    }

}
