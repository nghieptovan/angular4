import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher,Store } from '@ngrx/store';


import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';
import * as _ from 'lodash';


declare var $;

@Component({
    selector: 'lt-stylefeed-posts-items',
    templateUrl: './scrollable.html',
    styles: [
        `
            .brick { width: 318px; }
        `
    ]
})
export class SFHomePostItemsComponent {
    postsSub: any;
    private _posts: any;
    requestBody: any;
    timeoutId: any;

    @Input()
    get posts(): any {
        return this._posts;
    }

    set posts(value: any) {
        this._posts = value;
    }

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute,
        private dispatcher: Dispatcher) {
            //console.log(this._posts);

    }

    ngOnDestroy() {
        //this.dispatcher.unsubscribe();
    }

}
