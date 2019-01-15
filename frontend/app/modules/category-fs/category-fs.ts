import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import { GlobalService } from '../../services/global.service';
import * as categories from '../../store/categories/categories.actions';
import * as common from '../../store/common/common.actions';
import * as fromRoot from '../../store/index';
import * as products from '../../store/products/products.actions';
import {FacetsDefaultConstants} from "../../components/base/products/constants/FacetsDefaultConstants";
import * as _ from 'lodash';

@Component({
    selector: 'app-category-fs',
    templateUrl: 'category-fs.html'
})

export class CategoryFSComponent {
    currentCategoryId: any;
    currentParams: any;
    currentFilter: any = null;
    categories: any;
    cateName: any;
    facets: Array<any> = [];

    urlInfoSub: any;
    categorySub: any;
    facetsSub: any;

    constructor(
        private store: Store<fromRoot.AppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute, private globalService: GlobalService, private dispatcher: Dispatcher) {
        this.categorySub = this.store.select(fromRoot.categoriesGetState).subscribe(state => {
            this.categories = state.entities;
        });

        this.facetsSub = this.store.select(fromRoot.categoriesGetFacets).subscribe((facets) =>{
            _.each(facets, facet => {
                this.facets.push({type:facet.attribute_code, limit: facet.limit});
            });

            // reload product by category with facet update
            if(this.currentParams) {
                this.loadProductByCategory(this.currentParams);
                const params = {
                    key: this.currentParams,
                    type: 'category',
                };

                this.store.dispatch(new products.CheckOmniBlink(params));
            }
        });

        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo).subscribe(info => {
            if (!info.url_rewrite) {
                if (!info.category) {
                    this.store.dispatch(new products.ResetProductState());
                }
                if (info.type === 'category' && info.breadcrumbs && info.breadcrumbs.length > 2) {
                    this.store.dispatch(new categories.Load({
                        // id: info.breadcrumbs[2].id,
                        id: info.category.id,
                        selectedId: info.category.id
                    }));

                    // this.loadProductByCategory(info.category.id);
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
            this.cateName = !info.category || info.category.top_content?'':info.category.name;
        });

        this._registerRouterChangeEvents();
    }

    _registerRouterChangeEvents() {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.currentParams !== params.id) {
                const categoryPathName = encodeURIComponent(`/category/${params.id}/${params.slug}`);
                this.store.dispatch(new categories.LoadFacets({id: params.id}));
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
                params: this.globalService.parseParamsToRequestBody(this.currentFilter, this.facets),
            };
            requestBody.params.order = requestBody.params.order?requestBody.params.order:FacetsDefaultConstants.orderDefault;
            this.store.dispatch(new products.Load(requestBody));
            this.currentFilter = null;
        } else {
            this.currentCategoryId = catId;
            const actionPayload = {
                key: catId,
                params: {
                    page: 1,
                    hitsPerPage: 40,
                    // facets: ['categories', 'product_brand', 'color', 'size', 'vendor']
                    facets: this.facets.length > 0? this.facets: FacetsDefaultConstants.facets,
                    order: FacetsDefaultConstants.orderDefault
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