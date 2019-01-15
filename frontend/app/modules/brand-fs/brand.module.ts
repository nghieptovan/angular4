import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteBrandFS } from './brand';

const routes: Routes = [
    {
        path: ':id/:slug',
        component: LotteBrandFS
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteBrandFS
    ],
    exports: [
    ]
})
export class BrandFSModule { }
