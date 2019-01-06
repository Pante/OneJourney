import * as moment from 'moment';


export enum Enrolement {
    UNENROLLED = 'Unenrolled',
    INTERESTED = 'Interested',
    ENROLLED = 'Enrolled',
    REJECTED = 'Rejected'
}

export namespace Enrolement {
    
    export function from(enrolment: any): Enrolement {
        switch (enrolment) {
            case 'Unenrolled':
                return Enrolement.UNENROLLED;
                
            case 'Interested':
                return Enrolement.INTERESTED;
                
            case 'Enrolled':
                return Enrolement.ENROLLED;
                
            case 'Rejected':
                return Enrolement.REJECTED;
            
            default:
                return undefined;
        }
    }
    
}


export interface Award {
    
    id: number;
    name: string;
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
    image: string;
    title: string;
    description: string;
    date: Date;
    points: number;   

    staff: string;
    enrolement?: Enrolement;
    updated: Date;
    groups: number[];
    
    category: {
        name: string;
        description: string;
    };
    
    awards: Award[];
    
}

export namespace Event {
  
    export function from(event: any): Event {
        const attributes = event.attributes;
        return {
            id: event.id,
            image: attributes['image-url'],
            title: attributes.title,
            description: attributes.description,
            date: moment(attributes['event-datetime'], moment.HTML5_FMT.DATETIME_LOCAL_MS).toDate(),
            points: attributes.points,

            staff: attributes.staff,
            enrolement: Enrolement.from(attributes['enrol-status']),
            updated: moment(attributes['updated-at'], moment.HTML5_FMT.DATETIME_LOCAL_MS).toDate(),
            groups: attributes['mentor-groups'],
           
           category: {
               name: attributes.category,
               description: attributes.description
           },
           
            awards: (attributes['activity-awards'] as any[]).map(award => Award.deserialize(award))
        };
    }
    
    export function to(event: Event): any {
        return null; // TODO
    }
    
}
