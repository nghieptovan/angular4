import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { LotteSearchFS } from './search';
import {SearchFSNoResults} from "../../components/search-fs/noresults/noresults";

const routes: Routes = [
    {
        path: '',
        component: LotteSearchFS
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        LotteSearchFS,
        SearchFSNoResults
    ],
    exports: [
    ]
})
export class SearchFSModule { }
