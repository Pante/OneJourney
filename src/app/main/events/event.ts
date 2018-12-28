import * as moment from 'moment';

export const formats = [''];


export enum Enrolement {
    
}

export namespace Enrolement {
    
    export function from(json: any): Enrolement {
        return null;
    }
    
}


export interface Award {
    
    name: string;
    id: number;
    to: number;
    
}

export namespace Award {
    
    export function from(award: any): Award {
        return {
            name: award['award-name'],
            id: award.id,
            to: award['to-award']
        };
    }
    
}


export interface Event {
    
    id: number;
    type: string;

    image: string;
    
    information: {
        title: string;
        description: string;
        date: Date;
        points: number;
        
        staff: string;
        enrolement: Enrolement;
        updated: Date;
        groups: number[];
    };
    
    category: {
        name: string;
        description: string;
    };
    
    awards: Award[];
    
}

export namespace Event {
        
    export function serialize(data: Event): any {
        return null;
    }
     
    export function deserialize(data: any): Event {
        const attributes = data.attributes;
        return {
            id: data.id,
            type: data.type,

            image: attributes['image-url'],

            information: {
                title: attributes.title,
                description: attributes.description,
                date: moment(attributes['event-datetime'], formats).toDate(),
                points: attributes.points,
                
                staff: attributes.staff,
                enrolement: Enrolement.from(attributes['enrol-status']),
                updated: moment(attributes['updated-at']).toDate(),
                groups: attributes['mentor-group']
           },
           
           category: {
               name: attributes.category,
               description: attributes.description
           },
           
            awards: (attributes['activity-awards'] as any[]).map(award => Award.from(award))
        };
    }
    
}
