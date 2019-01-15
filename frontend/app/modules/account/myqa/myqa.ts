import { Component } from '@angular/core';
import * as fromRoot from '../../../store';
import { Dispatcher, Store } from '@ngrx/store';
import * as account from '../../../store/account/account.actions';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AppConstants } from '../../../app.constant';

// Redux
@Component({
    selector: 'app-account-myqa',
    templateUrl: './myqa.html',
    styleUrls: ['./myqa.less']
})
export class LotteAccountMyQa {
    appConstants: any;
    accountQA$: Observable<any>;
    userInfo: any;
    accountQALoading$: Observable<any>;

    constructor(private router: Router, private store: Store<fromRoot.AppState>) {
        this.store.select(fromRoot.accountGetInfo).subscribe((info) => {
            if (info && info.id) {
                this.userInfo = _.cloneDeep(info);
            }
        });
        this.accountQALoading$ = this.store.select(fromRoot.accountGetLoadingState);
        this.accountQA$ = this.store.select(fromRoot.accountGetQA);
        this.store.dispatch(new account.LoadQA(this.userInfo.email));
        this.appConstants = AppConstants;
    }
}
