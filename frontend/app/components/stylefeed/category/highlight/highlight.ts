import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as stylefeed from '../../../../store/stylefeed/stylefeed.actions';

@Component({
    selector: 'lt-stylefeed-category-highlight',
    templateUrl: './highlight.html'
})
export class SFCategoryHighlightComponent {
    highlightSub: any;
    highlight: any;
    category:any;
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params: any) => {
            if (this.category !== params.urlkey) {
                this.category = params.urlkey;
            }
            //console.log(this.category);
        });
        this.highlightSub = this.store.select(fromRoot.styleFeedGetPostsHighlightCategory).subscribe(state => {
            this.highlight = state;
        });

        this.store.dispatch(new stylefeed.LoadCategoryHighlight({urlkey:this.category}));
    }

    ngOnDestroy() {
        this.highlightSub.unsubscribe();
    }

}
