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
export class BigBangV2Service {
    constructor(private httpService: HttpService) {

    }

    loginBigbangv2(data) {
        return this.httpService.postEls('game-player/join', data );
    }

    validateLoginBigbangv2(id,otp) {
        return this.httpService.getEls('game-player/validate?id='+ id + '&otp=' + otp );
    }

    getPlayerProfile(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game-player/mine/profile');
    }

    getGifts(){
        return this.httpService.getEls('game/booming/gifts');
    }

    getResults(limit = 10){
        return this.httpService.getEls('game/booming/results?limit='+10);
    }

    getHistory(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game-player/mine/history');
    }

    loadSettings(){
        return this.httpService.getEls('game/booming');
    }

    shareFB(token){
        return this.httpService.postElsCustomHeader(this.setHeaderGame(token),'game-player/mine/share',{});
    }

    playBigBangV2(token){
        return this.httpService.getElsCustomHeader(this.setHeaderGame(token),'game/booming/play');
    }

    startBigBangV2(token,session){
        return this.httpService.postElsCustomHeader(this.setHeaderGame(token),'game/booming/start',{session:session});
    }

    finishBigBangV2(token,data){
        const requestTime = data.finishedAt;
        const validateKey = sha256(token+requestTime);
        const header      = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
            'Request-time': requestTime,
            'Validate-key': validateKey
        });
        data = {data:this.encode(data)};
        return this.httpService.postElsCustomHeader(header,'game/booming/finish',data,true);
    }

    setHeaderGame(token){
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        });
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
