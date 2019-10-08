import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { AddType } from '../../components/type/add/add';
import { EditType } from '../../components/type/edit/edit';
import { Type } from '../../components/type/list/type';


const routes: Routes = [
    {
        path: 'them',
        component: AddType
    },
    {
        path: 'cap-nhat/:id',
        component: EditType
    },
{
        path: '',
        component: Type
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        AddType,
        EditType,
        Type
    ],
    exports: [
    ]
})
export class TypeModule { }
