import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as _ from 'lodash';

import { GlobalService } from '../../services/global.service';
import * as categories from '../../store/categories/categories.actions';
import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import * as products from '../../store/products/products.actions';

// Redux
@Component({
    selector: 'app-category',
    templateUrl: './category.html',
    styleUrls: ['./category.less']
})
export class LotteCategory {
    currentCategoryId: any;
    currentParams: any;
    currentFilter: any;
    categories: any;

    seoArea:any;
    urlInfoSub: any;
    categorySub: any;
    constructor(
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute, private globalService: GlobalService, private dispatcher: Dispatcher) {
        this.categorySub = this.store.select(fromRoot.categoriesGetState).subscribe(state => {
            this.categories = state.entities;
        });

        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo).subscribe(info => {
            if (!info.url_rewrite) {
                if (!info.category) {
                    this.store.dispatch(new products.ResetProductState());
                }
                if (info.type === 'category' && info.breadcrumbs && info.breadcrumbs.length > 2) {
                    const isCategoryNotExisted = (this.categories.id && this.categories.id !== info.breadcrumbs[2].id) || !this.categories.id;
                    if (isCategoryNotExisted) {
                        this.store.dispatch(new categories.Load({
                            id: info.breadcrumbs[2].id,
                            selectedId: info.category.id
                        }));
                    } else {
                        this.store.dispatch(new categories.UpdateCategories(info.category.id));
                    }
                    this.seoArea = info.category.cat_seo_area;
                    this.loadProductByCategory(info.category.id);
                }
            } else {
                this.router.navigate([info.url_rewrite]);
                setTimeout(() => {
                    const id = this.activatedRoute.params['value'].id;
                    const slug = this.activatedRoute.params['value'].slug;
                    const categoryPathName = encodeURIComponent(`/category/${id}/${slug}`);
                    this.store.dispatch(new common.LoadUrlInfo({ type: 'category', slug: slug, id: id, pathname: categoryPathName }));
                    this.currentParams = id;
                }, 1);
            }
        });

        this._registerRouterChangeEvents();
    }

    _registerRouterChangeEvents() {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params.id) {
                const categoryPathName = encodeURIComponent(`/category/${params.id}/${params.slug}`);
                this.store.dispatch(new common.LoadUrlInfo({ type: 'category', slug: params.slug, id: params.id, pathname: categoryPathName }));
                this.currentParams = params.id;
            }
        });
    }

    ngAfterViewInit() {
        this.currentFilter = this.activatedRoute.snapshot.queryParams;
    }

    loadProductByCategory(catId) {
        if (this.currentFilter) {
            const requestBody = {
                key: catId,
                priceMax: 0,
                type: 'category',
                params: this.globalService.parseParamsToRequestBody(this.currentFilter)
            };
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        } else {
            this.currentCategoryId = catId;
            const actionPayload = {
                key: catId,
                params: {
                    page: 1,
                    hitsPerPage: 40,
                    facets: ['categories', 'product_brand', 'color', 'size', 'vendor']
                },
                priceMax: 0,
                type: 'category'
            };

            if (actionPayload.key) {
                this.store.dispatch(new products.Load(actionPayload));
            }
        }
    }

    ngOnDestroy() {
        this.categorySub.unsubscribe();
        this.urlInfoSub.unsubscribe();
        this.globalService.removeTrackingCode();
    }
}
