import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'lt-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.less']
})
export class LtSidebarComponent {
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    }
}
