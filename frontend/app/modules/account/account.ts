import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../store/index';
import * as common from '../../store/common/common.actions';

declare var $;

@Component({
    selector: 'app-account',
    templateUrl: './account.html',
    styleUrls: ['./account.less']
})
export class LotteAccount implements OnInit, OnDestroy {

    selectedRouter: any = window.location.pathname;
    authIsLoggedIn$: Observable<any>;

    authSub: any;
    routerSub: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private router: Router) {
        this.authIsLoggedIn$ = this.store.select(fromRoot.authGetLoggedInState);

        this.routerSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.selectedRouter = event.urlAfterRedirects;
            }
        });


        this.authSub = this.authIsLoggedIn$.subscribe((isLoggedIn) => {
            if (!isLoggedIn) {
                this.router.navigate(['account/login'], { queryParams: { redirect: window.location.pathname } });
            }
        });
    }

    ngOnInit(): void {
        $('body').addClass('account');
    }

    ngOnDestroy() {
        $('body').removeClass('account');
        this.routerSub.unsubscribe();
        // this.authSub.unsubscribe();
    }

    selectItem(params) {
        this.router.navigate([params]);
        return false;
    }
}
