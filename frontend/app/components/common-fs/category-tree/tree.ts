import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispatcher, Store } from '@ngrx/store';
import * as fromRoot from '../../../store/index';

@Component({
    selector: 'app-common-fs-category-tree',
    templateUrl: './tree.html',
    styleUrls: ['./tree.less']
})
export class CommonFSCategoryTreeComponent {
    currentCategory: any;
    currentSubcategory: any;
    categories: any;
    productsState: any;
    urlInfo: any;

    categorySub: any;
    urlInfoSub: any;
    productStateSub: any;
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromRoot.AppState>, private dispatcher: Dispatcher) {
        // this.categorySub = this.store.select(fromRoot.categoriesGetState).subscribe(state => {
        //     this.categories = state.entities;
        //     console.log(777777777, this.categories);
        // });

        this.categorySub = this.store.select(fromRoot.categoriesGetEntities)
            .subscribe((cats) => {
                this.categories = cats;
            });

        this.urlInfoSub = this.store.select(fromRoot.commonGetUrlInfo)
            .subscribe((info) => {
                this.urlInfo = info;
            });

        this.productStateSub = this.store.select(fromRoot.productsGetState)
            .subscribe((state) => {
                this.productsState = state;
            });
    }

    selectCategory(category, ev, isCat) {
        this.router.navigate(['category', category.id, category.url_key]);
        // ev.stopPropagation();
        return false;
    }

    ngOnDestroy() {
        this.categorySub.unsubscribe();
        this.urlInfoSub.unsubscribe();
        this.productStateSub.unsubscribe();
    }
}
