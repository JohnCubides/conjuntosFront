import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phonenumberpreffix'
})
export class PhoneNumberPreffix implements PipeTransform {
    transform(value: string): number {
        if (value === null || value === undefined || value === '') {
            return;
          }

        const start = value.indexOf(')');
        const id = value.substring(0, start + 1).replace(/["'+()]/g, '');
        return Number(id);
    }
}
