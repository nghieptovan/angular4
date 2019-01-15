import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { timer } from 'rxjs/observable/timer';

declare var $;

@Component({
    selector: 'lt-home-fashion-countdown',
    templateUrl: './countdown.html',
    styleUrls: ['./countdown.less']
})
export class LtHomeFashionCountDown {
    @Input('end')
    endDate: any;

    @Output() notifyExpiredEvent = new EventEmitter();

    date: any;
    constructor() {
        this.date = timer(0, 1000).map(() => {
            return this.getDate();
        });
    }

    getDate() {

        if (moment().isAfter(moment(this.endDate))) {
            this.notifyExpiredEvent.emit(true);
            return `Kết thúc`;
        }
        const endHour = moment(this.endDate).hours();

        const endMin = moment(this.endDate).minutes();

        const endSecond = moment(this.endDate).seconds();

        let days = moment(this.endDate).diff(moment(), 'days') + 1;

        let hours = (endHour ? endHour : 23) - moment().hours();

        let mins = (endMin ? endMin : 59) - moment().minutes() - 1;

        let seconds = (endSecond ? endSecond : 59) - moment().seconds() - 1;

        if (seconds < 0) {
            seconds += 60;
            mins--;
        }

        if (mins < 0) {
            mins += 60;
            hours--;
        }

        if (hours < 0) {
            hours += 24;
            days--;
        }

        if (days < 0) {
            return `Kết thúc`;
        }

        if (!days && !hours && !mins && !seconds) {
            return `Kết thúc`;
        }

        return `Kết thúc sau <strong>` + days + `</strong> ngày
                <strong>` + hours + ':' + mins + ':' + seconds + `</strong>`;
    }
}
