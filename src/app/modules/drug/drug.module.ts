import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { AddDrug } from '../../components/drug/add/add';
import { EditDrug } from '../../components/drug/edit/edit';
import { Drug } from '../../components/drug/list/drug';


const routes: Routes = [
    {
        path: 'them',
        component: AddDrug
    },
    {
        path: 'cap-nhat/:id',
        component: EditDrug
    },
{
        path: '',
        component: Drug
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        AddDrug,
        EditDrug,
        Drug
    ],
    exports: [
    ]
})
export class DrugModule { }
