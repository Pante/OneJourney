import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    
    /**
     * Shorten the description of the object (Event/Reward)
     * 
     * @param description - description of the object
     * @param length - appropriate length of the description
     * @param replace - requirement to replace
     * 
     * Check whether the description length is longer the maximum length
     * if it is longer and shorten to appropriate length
     *  If need to replace, replace word with ...
     */
    transform(description: string, length: number = 80, replace: boolean = false): string {
        if (description.length > length) {
            description = description.substring(0, replace ? length - 5 : length) + '. . .';
        }
        
        return description;
    }
    
}


