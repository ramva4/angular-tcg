import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(values: any, field: any, filterPattern: any): any {
        const lowerCase = filterPattern.trim().toLowerCase();
        if (values.length === 0 || (lowerCase === '')) return values;
        return values.filter((value) => value[field].toLowerCase().startsWith(lowerCase));
    }

}