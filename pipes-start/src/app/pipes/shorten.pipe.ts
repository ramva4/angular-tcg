import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: any, len: number): any {
        if (value.length > len) {
            return value.substr(0, len)+'…';
        } else return value;
    }

}