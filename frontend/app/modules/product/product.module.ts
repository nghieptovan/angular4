import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppCommonModule } from '../../app.common.module';
import { LtProductDetail } from '../../components/product/detail/detail';
import { LtProductGallery } from '../../components/product/gallery/gallery';
import { LtProductInfo } from '../../components/product/info/info';
import { LtProductAlsoLike } from '../../components/product/related/related';
import { LotteProduct } from './product';

const routes: Routes = [
    {
        path: ':id/:slug',
        component: LotteProduct
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
        LotteProduct,
        LtProductAlsoLike,
        LtProductDetail,
        LtProductInfo,
        LtProductGallery,
    ],
    exports: [
    ]
})
export class ProductModule { }
