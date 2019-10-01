import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toJson' })
export class ToJsonPipe implements PipeTransform {

    transform(str: any, args: any) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
}
