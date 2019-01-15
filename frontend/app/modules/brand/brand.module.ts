import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteBrand } from './brand';

const routes: Routes = [
    {
        path: ':id/:slug',
        component: LotteBrand
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteBrand
    ],
    exports: [
    ]
})
export class BrandModule { }
