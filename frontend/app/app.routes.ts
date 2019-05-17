import { DefaultUrlSerializer, Routes, UrlSerializer, UrlTree } from '@angular/router';

import { AppNotFound } from './layout/404/404';
import { Patient } from './modules/patient/patient';


const definedRoutes: Routes = [
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule'
    },
    {
        path: 'dashboard',
        loadChildren: './modules/home/home.module#HomeModule'
    },
    {
        path: 'tai-khoan',
        loadChildren: './modules/accountnew/accountnew.module#AccountnewModule'
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: 'benh-nhan',
        loadChildren: './modules/patient/patient.module#PatientModule',
        component: Patient
    },
    {
        path: 'thuoc',
        loadChildren: './modules/drug/drug.module#DrugModule'
    },


    {
        path: '404',
        component: AppNotFound
    },
    // Set default route
    {
        path: '**',
        component: AppNotFound
    }
];

// Define routes
export const routes: Routes = definedRoutes;

export class CustomUrlSerializer implements UrlSerializer {
    parse(url: any): UrlTree {
        const dus = new DefaultUrlSerializer();
        return dus.parse(url ? url : '');
    }

    serialize(tree: UrlTree): any {
        const dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        return path.replace(/%2F/g, '/');
    }
}
