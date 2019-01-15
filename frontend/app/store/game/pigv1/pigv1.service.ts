import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../../../app.constant';
import { HttpService } from '../../../services/http.service';

import { Headers, Http, Response } from '@angular/http';
import { sha256, sha224 } from 'js-sha256';

@Injectable()
export class Pigv1Service {

    gameId = 'piggy';
    secretKey = 'khUDUIhBMK';

    constructor(private httpService: HttpService) {

    }

    joinPigv1(data) {
        return this.httpService.postEls('game-player/join', data );
    }

    loginPigv1(data) {
        data.token = this.hashToken(data);
        return this.httpService.postEls('game-player/login', data );
    }

    validateLoginPigv1(id,otp) {
        return this.httpService.getEls('game-player/validate?id='+ id + '&otp=' + otp );
    }

    getPlayerProfile(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game-player/mine/profile');
    }

    getMineRanking(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game-player/mine/rank/'+this.gameId);
    }

    getGifts(){
        return this.httpService.getEls('game/'+this.gameId+'/gifts');
    }

    getResults(data){
        //this.gameId = 'booming';
        const limit = typeof data.limit == 'undefined' ? 10 : data.limit ;
        const orderby = typeof data.orderby == 'undefined' ? 'id' : data.orderby ;
        const order = typeof data.order == 'undefined' ? 'desc' : data.order ;
        return this.httpService.getEls('game/'+this.gameId+'/results?limit='+limit+'&order='+orderby+' '+order);
    }

    getRanking(data){
        const limit = typeof data.limit == 'undefined' ? 10 : data.limit ;
        return this.httpService.getEls('game/'+this.gameId+'/results?limit='+limit+'&order=score desc,id desc');
    }

    getHistory(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game-player/mine/history/'+this.gameId);
    }

    loadSettings(){
        return this.httpService.getEls('game/'+this.gameId);
    }

    shareFB(token){
        return this.httpService.postElsCustomHeader(this.setHeaderGame(token),'game-player/mine/share',{});
    }

    playPigv1(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game/'+this.gameId+'/play');
    }

    startPigv1(token,session){
        return this.httpService.postElsCustomHeader(this.setHeaderGame(token),'game/'+this.gameId+'/start',{session:session});
    }

    updateLpointInfo(form){
        let data = {
            lpointUpdateInfo : {
                customer_first_name: form.firstname,
                customer_last_name: form.lastname,
                customer_phone: form.telephone,
                customer_dob: form.dob,
                customer_gender: form.gender
            }
        }
        return this.httpService.put('customers/me/update-lpoint-info',data);
    }

    remindLpointRewards(reward){
        let data = {lpointReminderInfo:{lpoint_reward:reward}}
        return this.httpService.put('customers/me/remind-lpoint',data);
    }

    finishPigv1(token,data){
        const requestTime = data.finishedAt;
        const validateKey = sha256(token+requestTime);
        const header      = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
            'Request-time': requestTime,
            'Validate-key': validateKey
        });
        console.log(data)
        data = {data:this.encode(data)};

        return this.httpService.postElsCustomHeader(header,'game/'+this.gameId+'/finish',data,true);
    }

    setHeaderGame(token){
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        });
    }

    hashToken(data){
        return sha256(Math.round(data.customerId/3)+data.email+this.secretKey);
    }

    encode(data) {
        var mapping = {
            'a': '~',
            'b': '!',
            'c': '@',
            'd': '#',
            'e': '$',
            'f': '%',
            'g': '^',
            'h': '&',
            'i': '*',
            'k': '(',
            'l': ')'
        }
        //var str = data;
        var str = btoa(encodeURIComponent(JSON.stringify(data)).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                let m : any = '0x';
                return String.fromCharCode(m + p1);
        }))
        return this.strReplaceMap(str, mapping)
    }


    strReplaceMap(str, map) {
        for (var search in map) {
            let regex = new RegExp(search, 'g')
            str = str.replace(regex, map[search]);
        }
        return str;
    }
}
