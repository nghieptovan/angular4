import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppCommonModule } from '../../app.common.module';
// import { LtProductGallery } from '../../components/product/gallery/gallery';
// import { LtProductInfo } from '../../components/product/info/info';
// import { LtProductAlsoLike } from '../../components/product/related/related';
import {FSProductDetail} from "../../components/product-fs/detail/detail";
import {LotteProductFS} from "./product";
import {FSProductReview} from "../../components/product-fs/review/review";

const routes: Routes = [
    {
        path: ':id/:slug',
        component: LotteProductFS
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule,
        NgxGalleryModule
    ],
    declarations: [
        LotteProductFS,
        // LtProductAlsoLike,
        // LtProductInfo,
        // LtProductGallery,
        FSProductDetail,
        FSProductReview
    ],
    exports: [
    ]
})
export class ProductFSModule { }
