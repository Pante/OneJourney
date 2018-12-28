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
        
    export function serialize(event: Event): any {
        return null;
    }
     
    export function deserialize(json: any): Event {
        const attributes = json.data.attributes;
        return {
            id: json.data.id,
            type: json.data.type,

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
