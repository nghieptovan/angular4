import { Component,OnDestroy, ViewChild  } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { NgForm } from '@angular/forms';
import { AppConstants } from '../../../../app.constant';
import { Dispatcher, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store';
import * as PigV1Actions from '../../../../store/game/pigv1/pigv1.actions';
import { Pigv1Service } from '../../../../store/game/pigv1/pigv1.service';

declare var $;
@Component({
    selector: 'lt-game-pigv1-login-modal',
    templateUrl: './login.html'
})
export class PigV1LoginModal extends DialogComponent<null, boolean> {

    @ViewChild('pigv1LoginForm') pigv1LoginForm: NgForm;
    @ViewChild('pigv1OtpForm') pigv1OtpForm: NgForm;

    baseURL : any = '/game/big-bang?mobile=no';
    playURL : any = '/game/big-bang/play?mobile=no';

    notShowAgain: Boolean = true;
    appConstants:any;
    subscription: any;
    login:any;
    store:any;
    step : any;
    errorMessage: any = false;
    errorMessageOtp : any = false;
    userId : any;

    constructor(dialogService: DialogService,  store: Store<fromRoot.AppState>, private dispatcher: Dispatcher) {
        super(dialogService);
        document.body.classList.add('body--block-scroll');
        this.appConstants = AppConstants;
        this.store = store;
        this.step = 'login';
    }

    closeModal() {
        document.body.classList.remove('body--block-scroll');
        this.close();
    }

    confirm() {
        this.result = true;
        document.body.classList.remove('body--block-scroll');
        this.close();
    }
    submitForm(form){
        if (form.valid) {
            this.store.dispatch(new PigV1Actions.LoadLogin(form.value) );
        }
    }

    submitOtpForm(form){
        if (form.valid) {
            this.store.dispatch(new PigV1Actions.LoadOtp({id:this.userId,otp:form.value.otp}) );
        }
    }
    submitByA(id){
        $('#'+id).click();
    }

    ngAfterViewInit() {
        this.subscription = this.dispatcher
            .subscribe((action) => {
                switch (action.type) {
                    case PigV1Actions.LOAD_PIGV1_LOGIN_SUCCESS:
                        if(action.payload.status == 'success'){
                            if(!action.payload.emailVerified){
                                this.step = 'otp';
                                this.userId = action.payload.id;
                            }else{
                                localStorage.setItem('gameToken', action.payload.token);
                                if(action.payload.remainSession > 0){
                                    location.replace(this.playURL);
                                }else{
                                    location.reload();
                                }

                            }
                        }
                    break;

                    case PigV1Actions.LOAD_PIGV1_LOGIN_FAILED:
                        this.errorMessage = action.payload.error.message;
                    break;

                    case PigV1Actions.LOAD_PIGV1_OTP_SUCCESS:
                    if(action.payload.error === false && typeof action.payload.token == 'undefined'){
                        $('#otp').click();
                    }
                    if(typeof action.payload.token !== 'undefined'){
                        localStorage.setItem('gameToken', action.payload.token);
                        if(action.payload.remainSession > 0){
                            location.replace(this.playURL);
                        }else{
                            location.reload();
                        }
                    }

                    break;

                    case PigV1Actions.LOAD_PIGV1_OTP_FAILED:
                        this.errorMessageOtp = action.payload.error.message;
                    break;

                    default: break;
                }
            });
    }


}

