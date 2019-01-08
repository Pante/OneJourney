import { Pipe, PipeTransform } from '@angular/core';

import { Redemption } from './reward';

export const classes = new Map<Redemption, string>([
    [Redemption.ELIGIBLE, 'bg-success'],
    [Redemption.PENDING, 'bg-warning'],
    [Redemption.REDEEMED, 'bg-info'],
]);


@Pipe({name: 'redemption'})
export class RedemptionStatusPipe implements PipeTransform {
    
    transform(status: Redemption): string {
        return classes.get(status);
    }
    
}
