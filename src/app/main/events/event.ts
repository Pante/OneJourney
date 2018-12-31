import * as moment from 'moment';


export enum Enrolement {
    // TODO
}

export namespace Enrolement {
    
    export function from(enrolment: any): Enrolement {
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
        
    export function to(event: Event): any {
        return null; // TODO
    }
     
    export function from(event: any): Event {
        const attributes = event.attributes;
        return {
            id: event.id,
            type: event.type,

            image: attributes['image-url'],

            information: {
                title: attributes.title,
                description: attributes.description,
                date: moment(attributes['event-datetime'], moment.HTML5_FMT.DATETIME_LOCAL_MS).toDate(),
                points: attributes.points,
                
                staff: attributes.staff,
              
                enrolement: Enrolement.from(attributes['enrol-status']),
                updated: moment(attributes['updated-at'], moment.HTML5_FMT.DATETIME_LOCAL_MS).toDate(),
              
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
