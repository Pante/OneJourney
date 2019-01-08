import { Pipe, PipeTransform } from '@angular/core';

export const categories = new Map<string, string>([
    ['Volunteer', 'Volunteer'],
    ['CommServe', 'Community Service']
]);


@Pipe({name: 'category'})
export class EventCategoryPipe implements PipeTransform {
    
    transform(category: string): string {
        return categories.get(category);
    }
    
}

