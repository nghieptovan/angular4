import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { AddUnit } from '../../components/unit/add/add';
import { EditUnit } from '../../components/unit/edit/edit';
import { Unit } from '../../components/unit/list/unit';


const routes: Routes = [
    {
        path: 'them',
        component: AddUnit
    },
    {
        path: 'cap-nhat/:id',
        component: EditUnit
    },
{
        path: '',
        component: Unit
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        AddUnit,
        EditUnit,
        Unit
    ],
    exports: [
    ]
})
export class UnitModule { }
