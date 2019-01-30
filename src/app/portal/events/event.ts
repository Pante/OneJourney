import * as moment from 'moment';


export enum Status {
    UNENROLLED = 'unenrolled',
    INTERESTED = 'interested',
    ENROLLED = 'enrolled',
    REJECTED = 'rejected'
}

export namespace Status {
    
    export function from(enrolment: any): Status {
        switch ((enrolment as string).toLowerCase()) {
            case 'interested':
                return Status.INTERESTED;
                
            case 'enrolled':
                return Status.ENROLLED;
                
            case 'rejected':
                return Status.REJECTED;
            
            default:
                return Status.UNENROLLED;
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
    enrollment?: Status;
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
            enrollment: Status.from(attributes['enrol-status']),
            updated: moment(attributes['updated-at'], moment.HTML5_FMT.DATETIME_LOCAL_MS).toDate(),
            groups: attributes['mentor-groups'],
           
           category: {
               name: attributes.category,
               description: attributes['category-desc']
           },
           
            awards: (attributes['activity-awards'] as any[]).map(award => Award.deserialize(award))
        };
    }
    
    export function update(id: number, event: Event): any {
        return {
            'student-no': id,
            'activity-id': event.id
        };
    }
    
}
