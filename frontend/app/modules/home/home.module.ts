import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
import { LtHomeFashionBrands } from '../../components/home/fashion/brands/brands';
import { LtHomeFashionDealZone } from '../../components/home/fashion/deal-zone/deal-zone';
import { LtHomeFashionHighlightCates } from '../../components/home/fashion/highlight-cates/highlight-cates';
import { LtHomeFashionHighlightProducts } from '../../components/home/fashion/highlight-products/highlight-products';
import { LtHomeFashionMainSlider } from '../../components/home/fashion/main-slider/main-slider';
import { LtHomeFashionTrending } from '../../components/home/fashion/trending/trending';
import { LotteFashion } from './home';

const routes: Routes = [
    { path: '', component: LotteFashion }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule,
        SlickModule.forRoot()
    ],
    declarations: [
        LotteFashion,
        LtHomeFashionTrending,
        LtHomeFashionDealZone,
        LtHomeFashionMainSlider,
        LtHomeFashionHighlightProducts,
        LtHomeFashionHighlightCates,
        LtHomeFashionBrands
    ],
    exports: [
    ]
})
export class HomeModule { }
