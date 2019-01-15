import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { TpoCmsBlockComponent } from '../../components/tpo/cms-block/cms-block';
import { TpoTopBannerComponent } from '../../components/tpo/detail-page/top/top-banner/top-banner';
import { TpoTopDescComponent } from '../../components/tpo/detail-page/top/top-desc/top-desc';
import { TpoProductAlsolikeComponent } from '../../components/tpo/product/alsolike/alsolike';
import { TpoProductDetailComponent } from '../../components/tpo/product/detail/detail';
import { TpoProductInfoComponent } from '../../components/tpo/product/info/info';
import { TpoFilterComponent } from '../../components/tpo/products/filter/filter';
import { TpoListComponent } from '../../components/tpo/products/list/list';
import { TpoProductsComponent } from '../../components/tpo/products/products';
import { TpoGroupComponent } from '../../components/tpo/tpo-group/tpo-group';
import { TpoItemComponent } from '../../components/tpo/tpo-group/tpo-item/tpo-item';
import { LotteTpoDashboard } from './dashboard-page/dashboard-page';
import { LotteTpoDetail } from './detail-page/detail-page';
import {TpoDetailProductsComponent} from "../../components/tpo/products/tpo-detail-products/tpo-detail-products";
import {TpoDashboardProductsComponent} from "../../components/tpo/products/tpo-dashboard-products/tpo-dashboard-products";
import {TpoListDashboardComponent} from "../../components/tpo/products/list/list-dashboard/list-dashboard";
import {TpoListDetailComponent} from "../../components/tpo/products/list/list-detail/list-detail";

const routes: Routes = [
    {
        path: 'chi-tiet/:urlKey',
        component: LotteTpoDetail
    },
    {
        path: 'tong-hop',
        component: LotteTpoDashboard
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteTpoDetail,
        LotteTpoDashboard,
        TpoProductDetailComponent,
        TpoProductInfoComponent,
        TpoProductAlsolikeComponent,
        TpoTopBannerComponent,
        TpoTopDescComponent,
        TpoProductsComponent,
        TpoDetailProductsComponent,
        TpoDashboardProductsComponent,
        TpoFilterComponent,
        TpoListComponent,
        TpoListDashboardComponent,
        TpoListDetailComponent,
        TpoCmsBlockComponent,
        TpoGroupComponent,
        TpoItemComponent,
    ],
    exports: [
    ]
})
export class TpoModule { }
