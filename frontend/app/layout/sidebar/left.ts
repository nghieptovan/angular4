import { Component } from '@angular/core';

@Component({
    selector: 'left-sidebar',
    templateUrl: './left.html'
})

export class LeftSidebar {
    userInfo: any;
    hideMenu: boolean = true;
    constructor() {
        this.userInfo = JSON.parse(localStorage.getItem('employeeInfo'));
    }
    showmenu(){
        this.hideMenu = !this.hideMenu;     
    }
}
