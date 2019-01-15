import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import * as fromRoot from '../../../../../store/index';
import { Dispatcher, Store } from '@ngrx/store';
import { AppConstants } from '../../../../../app.constant';
import { NgForm } from '@angular/forms';
import * as PigV1Actions from '../../../../../store/game/pigv1/pigv1.actions';
import { Pigv1Service } from '../../../../../store/game/pigv1/pigv1.service';
import { PigV1LpointInfoModal } from '../../../../../modals/game/pigv1/lpoint/info/info';


declare var $;

@Component({
    selector: 'lt-pigv1-lpoint-member-modal',
    templateUrl: 'member.html'
})

export class PigV1LpointMemberModal extends DialogComponent<null, boolean> implements OnDestroy, OnInit {
    product: any;
    copied : any = false;
    shareUrl : any;
    @ViewChild('registerForm') registerForm: NgForm;
    dob: String;
    phonePattern = AppConstants.REGEX.TELEPHONE;
    store:any;
    subscription: any;
    errorMessage:any = null;
    formSubmitted: any = false;
    gameName = 'pigv1';
    closeModalSubmitted = false;
    result : any = {
        prize:{
            lpoint:null
        }
    }
    constructor(dialogService: DialogService,store: Store<fromRoot.AppState>, private dispatcher: Dispatcher) {
        super(dialogService);
        this.store = store;
        document.body.classList.add('body--block-scroll');
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.closeModalSubmitted = true;
        this.remindLpointreward();
        this.close();
    }

    ngOnInit() {
        this.result = JSON.parse(localStorage.getItem('game'+this.gameName+'DataFinish'));
    }

    ngOnDestroy(){
        if(!this.closeModalSubmitted){
            this.remindLpointreward();
        }
    }

    ngAfterViewInit() {
        this.subscription = this.dispatcher.subscribe((action) => {
                switch (action.type) {
                    case PigV1Actions.PIGV1_LPOINT_INFO_SUCCESS:
                        if(!action.payload.error){
                            this.dialogService.addDialog(PigV1LpointInfoModal);
                        }else{
                            this.errorMessage = action.payload.message;
                            this.remindLpointreward();
                        }
                    break;
                    case PigV1Actions.PIGV1_LPOINT_INFO_FAILED:
                        this.errorMessage = 'Đã có lỗi xảy ra vui lòng thử lại.'
                        this.remindLpointreward();
                    break;

                    default: break;
                }
            });
    }

    remindLpointreward(){
        if(this.result.prize.lpoint !== null){
            this.store.dispatch(new PigV1Actions.RemindLpointReward(this.result.prize.lpoint) );
        }
    }
    submitForm(form){
        if (form.valid) {
            this.store.dispatch(new PigV1Actions.LoadLpointInfo(form.value) );
        }

    }

    openDatePicker() {
        const self = this;
        const birthdatePicker = $('#birthday-input').datepicker({
            prevText: 'Previous', prevStatus: '',
            prevJumpText: 'Previous', prevJumpStatus: '',
            nextText: 'Next', nextStatus: '',
            nextJumpText: 'Next', nextJumpStatus: '',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            showMonthAfterYear: true,
            //dateFormat: 'dd/mm/yy',
            dateFormat: 'yy-m-d',
            changeMonth: true,
            changeYear: true,
            showOn: 'button',
            buttonImageOnly: true,
            buttonText: '',
            showButtonPanel: true,
            yearRange: '-100:+0',
            onSelect: function (dateText, inst) {
                const formattedDate = $.datepicker.formatDate('yy-mm-dd', $(this).datepicker('getDate'));
                self.dob = formattedDate;
                self.registerForm.form.controls['dob'].setValue(dateText);
            }
        });
        birthdatePicker.datepicker('show');
    }

}
