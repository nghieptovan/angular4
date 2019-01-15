import {Component, OnInit, HostListener, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../../../../services/global.service';
import * as fromRoot from '../../../../../store/index';
import {BaseProcessFilterComponent} from "../../../../base/products/filter/process-filter";

@Component({
    selector: 'app-cfs-product-filter-cretiria',
    template: ''
})

export class CategoryFSFilterCretiriaComponent extends BaseProcessFilterComponent implements OnInit {
    isChecked: boolean;
    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        store: Store<fromRoot.AppState>,
        globalService: GlobalService,
        protected _elementRef : ElementRef
    ) {
       super(router, activatedRoute, store, globalService);
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        const clickedInsideRoot = targetElement.classList.contains('filter-item');
        const clickedInsideSortBy = targetElement.classList.contains('sortby-item');

        this.isChecked = !clickedInside?false:clickedInsideSortBy?!this.isChecked:clickedInsideRoot?!this.isChecked:this.isChecked;
    }

}