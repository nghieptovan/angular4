import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';

declare var $;

@Component({
  selector: 'app-stylefeed',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.less']
})
export class SFHomepage implements OnInit {
  currentParams: any;

  constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((params: any) => {
        if (this.currentParams !== params) {
            this.currentParams = params;
        }
    });
    $('#maincontent').removeClass('l-container page-main');

  }

  ngOnInit() {
  }



}



