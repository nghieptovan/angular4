import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';

// Redux
@Component({
    selector: 'app-account-comment',
    templateUrl: './comment.html',
    styleUrls: ['./comment.less']
})
export class LotteAccountComment implements OnInit {
    userInfo$: Observable<any>;
    comments: any;
    constructor(private store: Store<fromRoot.AppState>) {
        this.userInfo$ = store.select(fromRoot.accountGetInfo);
    }

    ngOnInit(): void {
        this.store.select(fromRoot.accountGetInfo)
            .subscribe((info) => {
                if (info && info.id) {
                    this.comments = info.comments;
                }
            });
    }
}
