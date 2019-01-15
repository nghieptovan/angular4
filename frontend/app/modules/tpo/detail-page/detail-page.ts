import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppConstants, TpoConstants } from '../../../app.constant';
import * as fromRoot from '../../../store';
import * as tpo from '../../../store/tpo/tpo.actions';
import {GlobalService} from "../../../services/global.service";
import * as products from '../../../store/products/products.actions';
import {FacetsDefaultConstants} from "../../../components/base/products/constants/FacetsDefaultConstants";



declare let FB: any;
declare var $;

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail-page.html',
    styleUrls: ['./detail-page.less']
})
export class LotteTpoDetail {
    static isViewLoaded: any;
    urlKey: string;
    currentFilter: any;
    tpoGroups: any;
    tpoDeail: any;
    componentType: number = TpoConstants.TPO_COMPONENT_TYPE_PRODUCTS.DETAIL;

    tpoDetailSub: any;
    constructor(private store: Store<fromRoot.AppState>,
                private activatedRoute: ActivatedRoute,
                private globalService: GlobalService
    ) {

        $('body').addClass('cms-hashtag');

        this.activatedRoute.params.subscribe((params: any) => {
            if (this.urlKey !== params.urlKey) {
                // this.tpoId = params.tpoId;
                this.urlKey = params.urlKey;
                // this.tpoGroupIds = params.tpoGroupIds.split(',');
            }

            this.loadTpoDetail(this.urlKey);
        });

        this.tpoDetailSub = this.store.select(fromRoot.tpoGroupGetTpoDetail).subscribe(state => {
            this.tpoDeail = state;
            this.loadSEO();
            this.loadProducts(state.id);
        });

        // this.loadTpoDetail(this.tpoId);
        this.updateTpoDetailSocial(this.urlKey, 'view');

        FB.init({
            appId: sessionStorage.getItem('facebookAppId'),
            version: 'v2.9',
            xfbml: true,
        });

        // In your onload handler
        FB.Event.subscribe('edge.create', this.page_like_callback);
        // FB.Event.subscribe('edge.remove', this.page_unlike_callback);
        // this.loadSEO();

    }

    ngOnDestroy() {
        this.tpoDetailSub.unsubscribe();
        this.removeSEO();
        $('body').removeClass('cms-hashtag');
    }

    page_like_callback(url, html_element) {
        const urlKey = url.split(/[\s/]+/).pop(-1);
        // const urlKey = 'thoi-trang-bien';
        // const xhttp = new XMLHttpRequest();
        // xhttp.open('POST', AppConstants.API_ENDPOINT + 'tpo/detail/' + urlKey + '/social', true);
        // // xhttp.setRequestHeader('Content-type', 'application/json');
        // xhttp.setRequestHeader('Authorization', 'Bearer ' + AppConstants.OAUTH.TOKEN);
        // xhttp.send({method: 'like'});
        //
        // console.log('page like callback', xhttp.responseText);
        $.ajax({
            url: AppConstants.API_ENDPOINT + 'tpo/detail/' + urlKey + '/social',
            type: 'post',
            data: JSON.stringify({ method: 'like' }),
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + AppConstants.OAUTH.TOKEN,
            },
            dataType: 'json',
            success: function (data) {
                console.log('page_like_callback', data);
            }
        });
    }

    loadSEO() {
        if (!LotteTpoDetail.isViewLoaded) {
            LotteTpoDetail.isViewLoaded = true;
            this.removeSEO();

            const tpoDetail = this.tpoDeail;
            const url = window.location.href;
            const desc = tpoDetail.short_description ? tpoDetail.short_description : 'Cam kết chất lượng tốt nhất, thành viên từ tập đoàn LOTTE Việt Nam - Thanh toán khi nhận hàng  ✓ Đổi trả hàng miễn phí  ✓ Shop online now » LOTTE.VN';
            const data = `
            <div id="lt-head-additional"></div>
                <title>Mua hàng trực tuyến uy tín hàng đầu với giá tốt tại LOTTE.vn</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="description" content="${desc}">
                <meta name="keywords" content="mua hàng trực tuyến tại LOTTE.vn, mua hàng online, mua hàng giá rẻ, bán hàng trực tuyến">
                <meta property="og:url"           content="${url}" />
                <meta property="og:type"          content="website" />
                <meta property="og:title"         content="#${tpoDetail.name}" />
                <meta property="og:image"         content="${tpoDetail.image}" />
                <meta property="og:description"   content="${desc}" />
                <meta property="fb:app_id"        content="173101563250697" />
                <meta property="og:image:alt"     content="#${tpoDetail.name}" />

                <!-- Google Tag Manager -->
                <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NMRDN2');</script>
                <!-- End Google Tag Manager -->
            <div id="lt-head-additional--end"></div>
        `;
            // <meta property="og:image"         content="${tpoDetail.image}" />
            $('head').prepend(data);

            const beforeBody = `
            <div id="lt-after-body-start"> </div>
                <!-- Google Tag Manager - noscript -->
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NMRDN2" height="0" width="0" style="display:none;visibility:hidden" ></iframe></noscript>
                <!-- End Google Tag Manager - noscript -->
            <div id="lt-after-body-start--end"></div>
                `;
            $('body').prepend(beforeBody);
        }
    }

    removeSEO() {
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
    }

    // loadTpoDetail(tpoId) {
    //     const actionPayload = {
    //         key: tpoId,
    //     };
    //     this.store.dispatch(new tpoGroup.LoadTpoDetails(actionPayload));
    // }

    loadTpoDetail(urlKey) {
        const actionPayload = {
            urlKey: urlKey,
        };
        this.store.dispatch(new tpo.LoadTpoDetails(actionPayload));
    }

    updateTpoDetailSocial(urlKey, method) {
        const actionPayload = {
            urlKey: urlKey,
            method: method
        };
        this.store.dispatch(new tpo.UpdateTpoDetailsSocial(actionPayload));
    }

    loadProducts(tpoId) {
        if (this.currentFilter) {
            const requestBody = {
                key: tpoId,
                priceMax: 0,
                type: 'tpo_detail',
                params: this.globalService.parseParamsToRequestBody(this.currentFilter)
            };
            requestBody.params.order = requestBody.params.order?requestBody.params.order:FacetsDefaultConstants.orderDefault;
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        } else {
            const actionPayload = {
                key: tpoId,
                params: {
                    page: 1,
                    hitsPerPage: 40,
                    facets: FacetsDefaultConstants.facets,
                    order: FacetsDefaultConstants.orderDefault
                },
                type: 'tpo_detail'
            };

            if (actionPayload.key) {
                this.store.dispatch(new products.Load(actionPayload));
            }
        }
    }
}
