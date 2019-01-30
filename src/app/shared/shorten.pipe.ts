import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    
    transform(description: string, length: number = 80, replace: boolean = false): string {
        if (description.length > length) {
            description = description.substring(0, replace ? length - 5 : length) + '. . .';
        }
        
        return description;
    }
    
}


