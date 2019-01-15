import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LottePromotions } from './promotions';

const routes: Routes = [
    {
        path: ':id',
        component: LottePromotions
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LottePromotions
    ],
    exports: [
    ]
})
export class PromotionsModule { }
