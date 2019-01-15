import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as stylefeed from '../../../store/stylefeed/stylefeed.actions';

declare var $;

@Component({
    selector: 'lt-stylefeed-tracking',
    templateUrl: './tracking.html'
})


export class SFTrackingComponent {
    constructor(private store: Store<fromRoot.AppState>, private activatedRoute: ActivatedRoute) {
        $('head').append(" <!-- stylefeed tracking --> <!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NMRDN2');</script><!-- End Google Tag Manager -->");
        var url = window.location.href;
        var contentFB = `
            <meta property="fb:app_id" content="173101563250697" />
            <meta property="og:url" content="${url}" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Style Feed - Feed your life with style" />
            <meta property="og:image" content="https://d1710i1dsqwesz.cloudfront.net/media/wysiwyg/Banner/thumbfb.jpg" />
            <meta property="og:description" content="Cuộc sống quá ngắn ngủi để ăn mặc nhàm chán. Hãy biến phong cách thành tiếng nói của bạn!" />
            <meta property="og:image:alt" content="Style Feed - Feed your life with style" />
        `;
        //$('head').prepend(contentFB);

    }

    ngOnDestroy() {}

}
