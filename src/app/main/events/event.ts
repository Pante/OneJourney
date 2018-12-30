import * as moment from 'moment';

export const formats = [''];


export enum Enrolement {
    // TODO
}

export namespace Enrolement {
    
    export function deserialize(json: any): Enrolement {
        return null; // TODO
    }
    
}


export interface Award {
    
    name: string;
    id: number;
    to: number;
    
}

export namespace Award {
    
    export function deserialize(award: any): Award {
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
        return null; // TODO
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
                enrolement: Enrolement.deserialize(attributes['enrol-status']),
                updated: moment(attributes['updated-at']).toDate(),
                groups: attributes['mentor-group']
           },
           
           category: {
               name: attributes.category,
               description: attributes.description
           },
           
            awards: (attributes['activity-awards'] as any[]).map(award => Award.deserialize(award))
        };
    }
    
}
