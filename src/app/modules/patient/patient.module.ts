import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickModule } from 'ngx-slick';

import { AppCommonModule } from '../../app.common.module';
import { AddPatient } from '../../components/patient/add/add';
import { EditPatient } from '../../components/patient/edit/edit';
import { DrugPatient } from '../../components/patient/drug/drug';
import { Patient } from '../../components/patient/list/patient';

const routes: Routes = [
    {
        path: 'them',
        component: AddPatient
    },
    {
        path: 'cap-nhat/:id',
        component: EditPatient
    },
    {
        path: 'toa-thuoc/:id',
        component: DrugPatient
    },{
        path: '',
        component: Patient
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppCommonModule,
        SlickModule.forRoot()
    ],
    declarations: [
        AddPatient,
        EditPatient,
        DrugPatient,
        Patient
    ],
    exports: [
    ]
})
export class PatientModule { }
