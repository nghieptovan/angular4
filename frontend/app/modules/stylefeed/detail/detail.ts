import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';

declare var $;

@Component({
  selector: 'app-stylefeed-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.less']
})
export class SFDetailPost implements OnInit {
  currentParams: any;

  constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((params: any) => {
        if (this.currentParams !== params) {
            this.currentParams = params;
        }
    });

  }

  ngOnInit() {
  }



}
