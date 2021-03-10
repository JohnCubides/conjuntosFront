import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phonenumbersuffix'
})
export class PhoneNumberSuffix implements PipeTransform {
    transform(value: string): string {
        if (value === null || value === undefined || value === '') {
          return;
        }

        const start = value.indexOf(')');
        const id = value.substring(start + 1);
        return id;
    }
}
