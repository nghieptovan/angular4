import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';

@Component({
    selector: 'lt-stylefeed-lastest-posts',
    templateUrl: './lastest-posts.html'
})
export class SFHomeLastestPostsComponent {
    postsSub: any;
    posts: any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.postsSub = this.store.select(fromRoot.styleFeedGetAllPosts).subscribe(state => {
            this.posts = state.lastest_post;
            //console.log(this.posts);
        });

       // this.store.dispatch(new stylefeed.LoadBlock(null));
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }

}
