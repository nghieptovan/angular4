import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import {CategoryFSComponent} from "./category-fs";
import {CategoryFSFilterComponent} from "../../components/category-fs/products/filter/filter";
import {CategoryFSListComponent} from "../../components/category-fs/products/list/list";
import {CategoryFSProductsComponent} from "../../components/category-fs/products/products";
import {CategoryFSTpoComponent} from "../../components/category-fs/tpo/tpo";
import {CategoryFSFilterSortByComponent} from "../../components/category-fs/products/filter/cretiria/sort-by/sort-by";
import {CategoryFSFilterVendorComponent} from "../../components/category-fs/products/filter/cretiria/vendor/vendor";
import {CategoryFSFilterBrandComponent} from "../../components/category-fs/products/filter/cretiria/brand/brand";
import {CategoryFSFilterColorComponent} from "../../components/category-fs/products/filter/cretiria/color/color";
import {CategoryFSFilterSizeComponent} from "../../components/category-fs/products/filter/cretiria/size/size";
import {CategoryFSFilterPriceComponent} from "../../components/category-fs/products/filter/cretiria/price/price";
import {CategoryFSFilterCretiriaComponent} from "../../components/category-fs/products/filter/cretiria/cretiria";

const routes: Routes = [
    {
        path: ':id/:slug',
        component: CategoryFSComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        CategoryFSComponent,
        CategoryFSFilterComponent,
        CategoryFSFilterSortByComponent,
        CategoryFSFilterVendorComponent,
        CategoryFSFilterBrandComponent,
        CategoryFSFilterColorComponent,
        CategoryFSFilterSizeComponent,
        CategoryFSFilterPriceComponent,
        CategoryFSFilterCretiriaComponent,
        CategoryFSListComponent,
        CategoryFSProductsComponent,
        CategoryFSTpoComponent
    ],
    exports: [
    ]
})
export class CategoryFSModule { }
