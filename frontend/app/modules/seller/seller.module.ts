import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteSeller } from './seller';

const routes: Routes = [
    {
        path: ':id/:slug',
        component: LotteSeller
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteSeller
    ],
    exports: [
    ]
})
export class SellerModule { }
