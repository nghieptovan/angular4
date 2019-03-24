import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { reducer } from '.';
import { httpFactory } from '../services/http.factory';
import { HttpService } from '../services/http.service';
import { AccountEffects } from './account/account.effects';
import { AccountService } from './account/account.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthService } from './auth/auth.service';
import { PatientEffects } from './patient/patient.effects';
import { PatientService } from './patient/patient.service';
import { BillEffects } from './bill/bill.effects';
import { BillService } from './bill/bill.service';
import { MedicineEffects } from './medicine/medicine.effects';
import { MedicineService } from './medicine/medicine.service';
import { DataModel } from './data';

// Import services
// Define effects
const APP_EFFECTS = [    
    EffectsModule.run(AuthEffects),
    EffectsModule.run(AccountEffects),
    EffectsModule.run(PatientEffects),
    EffectsModule.run(BillEffects),
    EffectsModule.run(MedicineEffects)
];

@NgModule({
    imports: [
        ...APP_EFFECTS,
        HttpModule,
        StoreModule.provideStore(reducer),
    ],
    providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, Store]
        },
        HttpService,
        AccountService,
        AuthService,
        PatientService,
        BillService,
        MedicineService,
        DataModel
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class AppStoreModule { }
