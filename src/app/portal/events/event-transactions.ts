import * as moment from 'moment';


export interface Transaction {
    
    staff: number;
    type?: number; // Unsupported
    title: string;
    description: string;
    date: Date;
    points: string;
    hours: number;
    minimum: number;
    awards: [number, number][];
    groups: number[];
    
}

export namespace Transaction {
    
    export function create(transaction: Transaction): any {
        return {
            activity: Transaction.format(transaction)
        };
    }
            
    export function edit(id: number, transaction: Transaction): any {
        return {
            id: id,
            activity: Transaction.format(transaction)
        };
    }
    
    
    export function format(transaction: Transaction): any {
        return {
            'staff-id': transaction.staff,
            'trans-type-id': 1,
            title: transaction.title,
            description: transaction.description,
            'event-datetime': moment(transaction.date).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
            points: transaction.points,
            'duration-hours': transaction.hours,
            'num-required': transaction.minimum,
            'award-type': formatAwardType(transaction.awards),
            'mentor-groups': transaction.groups
        };
    }
    
    interface AwardType {
        [key: number]: number; 
    }
    
    function formatAwardType(awards: [number, number][]): any {
        const awardType: AwardType = {};
        for (const award of awards) {
            awardType[award[0]] = award[1];
        }
        
        return awardType;
    }
    
}

