import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../../app.common.module';
import { AddDiagnosis } from '../../components/diagnosis/add/add';
import { EditDiagnosis } from '../../components/diagnosis/edit/edit';
import { Diagnosis } from '../../components/diagnosis/list/diagnosis';


const routes: Routes = [
    {
        path: 'them',
        component: AddDiagnosis
    },
    {
        path: 'cap-nhat/:id',
        component: EditDiagnosis
    },
{
        path: '',
        component: Diagnosis
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        AddDiagnosis,
        EditDiagnosis,
        Diagnosis
    ],
    exports: [
    ]
})
export class DiagnosisModule { }
