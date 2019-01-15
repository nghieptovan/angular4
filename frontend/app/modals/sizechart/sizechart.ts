import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DomSanitizer } from '@angular/platform-browser';

export interface ISizeChartModal {
    content: any;
}

@Component({
    selector: 'lt-product-sizechart-modal',
    templateUrl: './sizechart.html',
    styleUrls: ['./sizechart.less']
})
export class ProductSizeChartModal extends DialogComponent<ISizeChartModal, boolean>  implements ISizeChartModal{

    content: any;
    constructor(dialogService: DialogService,  private sanitizer: DomSanitizer) {
        super(dialogService);

        document.body.classList.add('body--block-scroll');
    }

    ngOnInit(){
        document.querySelector('lt-product-sizechart-modal').parentElement.classList.add('modal-sidebar-popup');
        document.querySelector('.modal-sidebar-popup').classList.remove('fade');
        this.loadScript(this.tabClick());

    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    safehtml(content){
        return content;
        //return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    loadScript(content) {
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = content;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

    tabClick(){
        return `
        setTimeout(function() {
            var classname = document.getElementsByClassName("menu-item-lt");

            for (var i = 0; i < classname.length; i++) {

                classname[i].addEventListener('click', function(event){

                    event.preventDefault();

                    var li = event.target.parentNode.parentNode.getElementsByClassName("menu-item-lt");
                    for (var il = 0; il < li.length; il++) {
                        li[il].classList.remove('active');
                    }
                    event.target.classList.add('active');

                    var contents = event.target.parentNode.parentNode.parentNode.getElementsByClassName("content");
                    for (var j = 0; j < contents.length; j++) {
                        contents[j].classList.remove('active');
                    }
                    var role = event.target.getAttribute('href').replace('#','');

                    var tabContent = document.getElementsByClassName(role);
                    if(typeof tabContent[0] !== 'undefined' && tabContent[0] != null){
                        tabContent[0].classList.add('active');
                    }

                    event.stopPropagation();

                    return false;
                }, false);

            }

        }, 100);




        `;
    }


}
