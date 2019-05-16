import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
const routes: Routes = [

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        
    ],
    exports: [

    ]
})
export class BaseModule { }
