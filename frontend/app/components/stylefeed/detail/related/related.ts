import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';

@Component({
    selector: 'lt-stylefeed-post-related',
    templateUrl: './related.html'
})
export class SFPostRelated {

    owlCarouselOptions: any = {
        items: 4,
        margin: 20,
        loop: false,
        dots: true,
        autoplay: false,
        nav: true
    };

    postSub: any;
    posts: any;
    urlkey:any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.urlkey !== params.urlkey) {
                this.urlkey = params.urlkey;
            }
        });

        this.postSub = this.store.select(fromRoot.styleFeedGetPostRelated).subscribe(state => {
            this.posts = state;
            //console.log(state);
        });

        this.store.dispatch(new stylefeed.LoadPostRelated({urlkey:this.urlkey}));
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

}
