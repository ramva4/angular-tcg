import { Pipe, PipeTransform } from '@angular/core';
import { toArray } from 'rxjs-compat/operator/toArray';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return ''.concat(...value.split('').reverse());
  }

}
