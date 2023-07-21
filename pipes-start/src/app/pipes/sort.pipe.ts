import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(value: any, field: string, ...args: any[]) {
        return value.sort((a, b) => {
            let _a = (a[field] as string).toLowerCase();
            let _b = (b[field] as string).toLowerCase();
            if (_a === _b) return 0;
            return (_a > _b) ? 1 : -1;
        });
    }
}