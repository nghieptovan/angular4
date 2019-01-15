import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteSellerFS } from './seller';
import {SellerLotteriaProductsComponent} from "../../components/seller-lotteria-style/products/products";
import {SellerLotteriaListComponent} from "../../components/seller-lotteria-style/products/list/list";
import {SellerLotteriaListItemComponent} from "../../components/seller-lotteria-style/products/list/item/item";
import {SellerLotteriaSidebarComponent} from "../../components/seller-lotteria-style/sidebar-right/sidebar-right";
import {SellerLotteriaFilterComponent} from "../../components/seller-lotteria-style/products/filter/filter";
import {SellerLotteriaFilterCretiriaComponent} from "../../components/seller-lotteria-style/products/filter/cretiria/cretiria";
import {SellerLotteriaFilterCategoryComponent} from "../../components/seller-lotteria-style/products/filter/cretiria/category/category";

const routes: Routes = [
    {
        path: ':id',
        component: LotteSellerFS,
        children:[
            {
                path:'**',
                component: LotteSellerFS
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteSellerFS,
        SellerLotteriaProductsComponent,
        SellerLotteriaListComponent,
        SellerLotteriaListItemComponent,
        SellerLotteriaSidebarComponent,
        SellerLotteriaFilterComponent,
        SellerLotteriaFilterCretiriaComponent,
        SellerLotteriaFilterCategoryComponent,
    ],
    exports: [
    ]
})
export class SellerFSModule { }
