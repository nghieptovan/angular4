import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Injectable()
export class AuthService {
    constructor(private httpService: HttpService) {

    }

    login(data) {
        return this.httpService.postAnonymous('employee/login', data);
    }
    
    getAccountById(id){
        return this.httpService.getAnonymous('employee/'+id);
    }

    loginFacebook(data) {
        return this.httpService.postAnonymous('socials/facebook-login', data);
    }

    logout() {
        return this.httpService.get('integration/customer/logout');
    }

    forgotPassword(data) {
        return this.httpService.postAnonymous('mine/forgot-password', data);
    }
}
