import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as stylefeed from '../../../store/stylefeed/stylefeed.actions';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'lt-stylefeed-menu',
    templateUrl: './menu.html',
    styleUrls: ['./menu.less']
})
export class SFMenuComponent {
    menuSub: any;
    menuItems: any;

    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer
    ) {
        this.menuSub = this.store.select(fromRoot.styleFeedGetMenu).subscribe(state => {
            this.menuItems = state;
            //console.log(this.menuItems);
        });

        this.store.dispatch(new stylefeed.LoadMenu(null));
    }

    ngOnDestroy() {
        this.menuSub.unsubscribe();
    }

    loadMenuInner(key){
        var inner = {
            'Look'  : 'Xu hướng thời trang, mỹ phẩm mới nhất. <br>Cập nhật Ngay!',
            'Homey' : 'Chăm sóc nhà cửa chưa bao giờ dễ dàng hơn thế. <br>Click Ngay!',
            'Play'  : 'Tất tần tật bí kíp ăn chơi hot nhất.<br> Khám Phá Ngay!',
            'Radar' : 'Showbiz ngay bên tai bạn. <br>Hóng Ngay!',
        }
        if(typeof inner[key] !== 'undefined'){
            return this.safehtml(inner[key]);
        }
        return '';
    }

    safehtml(html){
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

}
