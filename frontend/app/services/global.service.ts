import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';

import * as checkout from '../store/checkout/checkout.actions';
import * as common from '../store/common/common.actions';
import * as fromRoot from '../store/index';
import { AppConstants } from './../app.constant';
import {FacetsDefaultConstants} from "../components/base/products/constants/FacetsDefaultConstants";
import {RegionManagement} from "../components/base/RegionManagement";
import {CART_TYPE} from "../components/base/cart/CartManagement";
import {GlobalConstants} from "../components/base/constants/GlobalConstants";
import {FacetTypeConstants} from "../components/base/products/constants/FacetTypeConstants";

declare var $;
@Injectable()
export class GlobalService {

    cartCookiesTimestamp: any;
    isScriptLoaded: any;
    constructor(private cookieService: CookieService, private store: Store<fromRoot.AppState>) {
        this.isScriptLoaded = false;
    }

    syncCartCookies() {
        const cartCookies = this.cookieService.get('section_data_ids');
        this.cookieService.delete('section_data_ids', '/');
        const dateTimeNowTimestamp = new Date().getTime();
        if (cartCookies) {
            const cartCookiesParse = eval('(' + cartCookies + ')');
            cartCookiesParse.cart = dateTimeNowTimestamp;

            this.cookieService.set('section_data_ids', JSON.stringify(cartCookiesParse), 0, '/');
        } else {
            this.cookieService.set('section_data_ids', '{"cart":' + (dateTimeNowTimestamp) + '}', 0, '/');
        }

    }

    syncCustomerCookies() {
        const dateTimeNowTimestamp = new Date().getTime();
        const customerCookies = this.cookieService.get('section_data_ids');
        if (customerCookies) {
            const customerCookiesParse = eval('(' + customerCookies + ')');
            customerCookiesParse.customer = dateTimeNowTimestamp;
            customerCookiesParse.wishlist = dateTimeNowTimestamp;
            customerCookiesParse.multiplewishlist = dateTimeNowTimestamp;

            this.cookieService.set('section_data_ids', JSON.stringify(customerCookiesParse), 0, '/');
        } else {
            const userDatas = {
                customer: dateTimeNowTimestamp,
                wishlist: dateTimeNowTimestamp,
                multiplewishlist: dateTimeNowTimestamp
            };
            this.cookieService.set('section_data_ids', JSON.stringify(userDatas), 0, '/');
        }
    }

    getCartCurrentTimeStamp() {
        const cookies = this.cookieService.get('section_data_ids');
        if (cookies) {
            this.cartCookiesTimestamp = (eval('(' + cookies + ')')).cart;
        } else {
            this.cartCookiesTimestamp = null;
        }
    }

    reloadCartWhenTimestampChanged() {
        let currentCookies = null;
        const cookies = this.cookieService.get('section_data_ids');
        if (cookies) {
            currentCookies = (eval('(' + cookies + ')')).cart;
        }

        if (!currentCookies && !this.cartCookiesTimestamp) {
            return 0;
        }

        if (currentCookies === this.cartCookiesTimestamp) {
            return 0;
        }

        this.store.dispatch(new checkout.CartRefresh());
        return 1;
    }

    ensureConfigLoadedForGame(){
        const appConfigs = this.store.select(fromRoot.commonGetConfigs)
        .do((data) => {
            if (!data.length || data.length < 2) {
                this.store.dispatch(new common.LoadAppConfigs());
            } else {
                AppConstants.STORE_CONFIG.BASE_URL = data[1].base_url;
                AppConstants.STORE_CONFIG.LINK_URL = data[1].base_link_url;
                AppConstants.STORE_CONFIG.MEDIA_URL = data[1].base_media_url;
                AppConstants.STORE_CONFIG.PRODUCT_BASE_URL = data[1].base_media_url + 'catalog/product/';
                AppConstants.STORE_CONFIG.STATIC_URL = data[1].base_static_url;
                AppConstants.STORE_CONFIG.CURRENCY_SYMBOL = data[1].currency_symbol;
                AppConstants.ELASTIC_API_ENDPOINT = data[1].elastic_server;
                AppConstants.OAUTH.ELASTIC_TOKEN = data[1].elastic_access_token;
                AppConstants.DISABLED_TRACKING_CODE = data[1].disabled_tracking_code;
                AppConstants.DEFAULT_META_TAGS = data[1].default_meta_tags;
                AppConstants.DEFAULT_META_TAGS = data[1].default_meta_tags;
                AppConstants.CHECKOUT.VIETTIN_GATEWAY_URL = data[1].vietin_gateway_url;
                localStorage.setItem('vietin_gateway_url', data[1].vietin_gateway_url);
                sessionStorage.setItem('facebookAppId', data[1].fb_app_id);
            }
        })
        .filter((data) => data.length >= 2)
        .take(1);
    return Observable.combineLatest(appConfigs)
        .toPromise();
    }

    ensureConfigLoaded() {
        
    }

    loadShippingRuleForCurrentLocation(cart_type = {type:CART_TYPE.NORMAL_CART, id: null}) {
        RegionManagement.getInstance(this.store).loadCartShippingRule(cart_type);
    }

    loadTrackingCodeScript(data) {
        if (data.head_additional) {
            this.removeTrackingCode();
            const div = document.createElement('div');
            div.id = 'lt-head-additional';
            $('head').append(div);
            $('head').append(data.head_additional);

            const endDiv = document.createElement('div');
            endDiv.id = 'lt-head-additional--end';
            $('head').append(endDiv);
        }

        if (data.after_body_start) {
            const div = document.createElement('div');
            div.id = 'lt-after-body-start--end';
            $('body').prepend(div);
            $('body').prepend(data.after_body_start);

            const endDiv = document.createElement('div');
            endDiv.id = 'lt-after-body-start';
            $('body').prepend(endDiv);
        }

        if (data.before_body_end) {
            const div = document.createElement('div');
            div.id = 'lt-before-body-end';
            $('body').append(div);
            $('body').append(data.before_body_end);

            const endDiv = document.createElement('div');
            endDiv.id = 'lt-before-body-end--end';
            $('body').append(endDiv);
        }
    }

    removeTrackingCode() {
        if ($('#lt-head-additional')) {
            if ($('#lt-head-additional').nextUntil('#lt-head-additional--end')) {
                $('#lt-head-additional').nextUntil('#lt-head-additional--end').remove();
            }
            $('#lt-head-additional').remove();
            $('#lt-head-additional--end').remove();
        }

        if ($('#lt-after-body-start')) {
            if ($('#lt-after-body-start').nextUntil('#lt-after-body-start--end')) {
                $('#lt-after-body-start').nextUntil('#lt-after-body-start--end').remove();
            }
            $('#lt-after-body-start').remove();
            $('#lt-after-body-start--end').remove();
        }

        if ($('#lt-before-body-end')) {
            if ($('#lt-before-body-end').nextUntil('#lt-before-body-end--end')) {
                $('#lt-before-body-end').nextUntil('#lt-before-body-end--end').remove();
            }
            $('#lt-before-body-end').remove();
            $('#lt-before-body-end--end').remove();
        }

        if ($('#lt-tracking-products-list')) {
            $('#lt-tracking-products-list').remove();
            $('#lt-tracking-products-list').remove();
        }

        delete window['google_tag_manager'];
        delete window['ga'];
        delete window['gaData'];
        delete window['gaGlobal'];
        delete window['gaplugins'];
    }

    loadDefaultMetaTags(data) {
        if (data) {
            this.removeDefaultMetaTags();
            const div = document.createElement('div');
            div.id = 'lt-head-default-metatags--end';
            $('head').prepend(div);
            $('head').prepend(data);

            const endDiv = document.createElement('div');
            endDiv.id = 'lt-head-default-metatags';
            $('head').prepend(endDiv);
        }
    }

    removeDefaultMetaTags() {
        if ($('#lt-head-default-metatags')) {
            if ($('#lt-head-default-metatags').nextUntil('#lt-head-default-metatags--end')) {
                $('#lt-head-default-metatags').nextUntil('#lt-head-default-metatags--end').remove();
            }
            $('#lt-head-default-metatags').remove();
            $('#lt-head-default-metatags--end').remove();
        }
    }

    loadTitleAndMetaHeader(data) {
        if (data) {
            this.removeTitleAndMetaHeader();
            this.removeDefaultMetaTags();
            const div = document.createElement('div');
            div.id = 'lt-head-title--end';
            $('head').prepend(div);
            $('head').prepend(data);

            const endDiv = document.createElement('div');
            endDiv.id = 'lt-head-title';
            $('head').prepend(endDiv);
        }
    }

    removeTitleAndMetaHeader() {
        if ($('#lt-head-title')) {
            if ($('#lt-head-title').nextUntil('#lt-head-title--end')) {
                $('#lt-head-title').nextUntil('#lt-head-title--end').remove();
            }
            $('#lt-head-title').remove();
            $('#lt-head-title--end').remove();
        }
    }

    parseRequestBodyToUrlParams(requestBody) {
        const params = requestBody.params;
        const result = {};
        if (params.page > 1) {
            result['page'] = params.page;
        }

        if (params.query) {
            result['q'] = params.query;
        }

        if (params.hitsPerPage && params.hitsPerPage !== 40) {
            result['count'] = params.hitsPerPage;
        }

        if (params.order) {
            result['order'] = params.order;
        }

        if (params.isOmni) {
            result['isOmni'] = params.isOmni;
        }

        if (params.isBlink) {
            result['isBlink'] = params.isBlink;
        }

        _.each(_.get(params, 'facetFilters', []), (filter) => {
            const key = Object.getOwnPropertyNames(filter)[0];
            const value = filter[Object.getOwnPropertyNames(filter)[0]];
            if(!(
                   (params.isOmni && key === FacetTypeConstants.FACET_TYPE_VENDOR_ID) ||
                   (params.isBlink && key === FacetTypeConstants.FACET_MKT_DELIVERY_TIME)
                )
            ){
                result[key] = value;
            }
        });

        const min = _.get(params, 'numericFilters[0].price_default.gte', 0);
        const max = _.get(params, 'numericFilters[0].price_default.lte', 0);

        if (min) {
            result['gte'] = min;
        }

        if (max) {
            result['lte'] = max;
        }

        return result || null;
    }

    parseParamsToRequestBody(params, facets:Array<any> = []) {
        const result = {
            facetFilters: [],
            numericFilters: [{
                price_default: {}
            }],
            page: params.page || 1,
            query: params.query || null,
            hitsPerPage: params.count || 40,
            // facets: ['categories', 'product_brand', 'color', 'size', 'vendor', 'product_brand_id', 'vendor_id'],
            // facets: ['categories', 'product_brand', 'color', 'vendor'],
            facets: facets.length > 0? facets:FacetsDefaultConstants.facets,
            order: params.order,
            isOmni: params.isOmni,
            isBlink: params.isBlink,
        };

        if (!result.query) {
            delete result.query;
        }

        if (!result.order) {
            delete result.order;
        }

        if (params.q && params.q.length) {
            result['query'] = params.q;
        }
        // const filterValues = ['categories', 'product_brand', 'color', 'size', 'vendor'];
        const filterValues = result.facets;

        _.each(filterValues, (val) => {
            let type = val.type;

            if (params[type]) {
                const temp = {};
                if (_.isString(params[type])) {
                    temp[type] = [params[type]];
                } else {
                    temp[type] = params[type];
                }
                result.facetFilters.push(temp);
            }
        });

        if (params.lte) {
            result.numericFilters[0].price_default['lte'] = Number.parseInt(params.lte);
        }

        if (params.gte) {
            result.numericFilters[0].price_default['gte'] = Number.parseInt(params.gte);
        }

        if(params.isOmni){
            let temp = {};
            temp[FacetTypeConstants.FACET_TYPE_VENDOR_ID] = GlobalConstants.MART_SELLER_IDS;
            result.facetFilters.push(temp);
        }

        if(params.isBlink){
            let temp = {};
            temp[FacetTypeConstants.FACET_MKT_DELIVERY_TIME] = GlobalConstants.SHIPPING_BLINK;
            result.facetFilters.push(temp);
        }

        if (!result.facetFilters.length) {
            delete result.facetFilters;
        }

        if (_.isEmpty(result.numericFilters[0].price_default)) {
            delete result.numericFilters;
        }
        return result;
    }

    loadAppStyle(version) {
        $('head').prepend(AppConstants.APP_STYLES(version)['LOTTE_VN']);
        $('head').prepend(AppConstants.APP_STYLES(version)['LOTTE_DEPARTMENT']);
        $('head').prepend(AppConstants.APP_STYLES(version)['LOTTE_MART']);
        $('head').prepend(AppConstants.APP_STYLES(version)['LOTTE_DATVIET']);
    }

    addTempstyles() {
        const tempStyles =
            `<div id="lt-lotte-styles">
            <link rel="stylesheet" type="text/css"
                href="https://www.lotte.vn/static/version1529389773/frontend/SM/Lottevec/vi_VN/css/styles-l.css" media="all"/>
            <link class="lt-lazy-css department-store" rel="stylesheet" type="text/css"
                data-href="https://www.lotte.vn/static/version1529389773/frontend/SM/LottevecDepartment/vi_VN/css/styles-l.css" media="all"/>
            <link class="lt-lazy-css lotte-mart" rel="stylesheet" type="text/css"
            data-href="https://www.lotte.vn/static/version1529389773/frontend/SM/LottevecMart/vi_VN/css/styles-l.css" media="all"/>
            <link class="lt-lazy-css home-shopping" rel="stylesheet" type="text/css"
                data-href="https://www.lotte.vn/static/version1529389773/frontend/SM/LottevecShopping/vi_VN/css/styles-l.css" media="all"/>
            <link rel="stylesheet" type="text/css"
                href="https://www.lotte.vn/static/version1529389773/frontend/SM/Lottevec/vi_VN/css/vec/style_vec.css" media="all"/>
            <link rel="stylesheet" type="text/css"
                href="https://www.lotte.vn/static/version1529389773/frontend/SM/Lottevec/vi_VN/css/print.css" media="print"/>
            <link rel="stylesheet" type="text/css"
                href="https://www.lotte.vn/static/frontend/SM/Lottevec/vi_VN/fashion_style/css/style_ec.css" media="all"/>`;
        $('head').append(tempStyles);
    }

    parseHref(href) {
        const a = document.createElement('a');

        a.href = href;

        return a;
    }

    parseURL(href) {
        let id,
            type,
            ampersandPosition,
            vimeoRegex;

        /**
         * Get youtube ID
         * @param {String} srcid
         * @returns {{}}
         */
        function _getYoutubeId(srcid) {
            if (srcid) {
                ampersandPosition = srcid.indexOf('&');

                if (ampersandPosition === -1) {
                    return srcid;
                }

                srcid = srcid.substring(0, ampersandPosition);
            }

            return srcid;
        }

        if (typeof href !== 'string') {
            return href;
        }

        href = this.parseHref(href);

        if (href.host.match(/youtube\.com/) && href.search) {
            id = href.search.split('v=')[1];

            if (id) {
                id = _getYoutubeId(id);
                type = 'youtube';
            }
        } else if (href.host.match(/youtube\.com|youtu\.be/)) {
            id = href.pathname.replace(/^\/(embed\/|v\/)?/, '').replace(/\/.*/, '');
            type = 'youtube';
        } else if (href.host.match(/vimeo\.com/)) {
            type = 'vimeo';
            vimeoRegex = new RegExp(['https?:\\/\\/(?:www\\.|player\\.)?vimeo.com\\/(?:channels\\/(?:\\w+\\/)',
                '?|groups\\/([^\\/]*)\\/videos\\/|album\\/(\\d+)\\/video\\/|video\\/|)(\\d+)(?:$|\\/|\\?)'
            ].join(''));
            id = href.href.match(vimeoRegex)[3];
        }

        return id ? {
            id: id, type: type, s: href.search.replace(/^\?/, '')
        } : false;
    }

    runScript(id) {
        const ele = document.getElementById(id);
        if (ele) {
            const codes = ele.getElementsByTagName('script');
            if (codes) {
                for (let i = 0; i < codes.length; i++) {
                    eval(codes[i].text);
                }
            }
        }

    }
    setCurrentPatient(patient){
        if(patient && patient.id){
            localStorage.setItem('currentPatient', JSON.stringify(patient));
        }
    }
    getCurrentPatient(){
        let patient = JSON.parse(localStorage.getItem('currentPatient'));
        if(patient && patient.id){
            return patient;
        }else{
            return {
                id: 0
            };
        }
    }
    
}
