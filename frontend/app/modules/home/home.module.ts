import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
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
        LotteFashion
    ],
    exports: [
    ]
})
export class HomeModule { }
