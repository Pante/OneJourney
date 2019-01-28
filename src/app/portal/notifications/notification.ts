import * as moment from 'moment';


export enum Status {
    
    NEW = 'new',
    DISPLAYED = 'displayed',
    READ = 'read'
    
}

export namespace Status {
    
    export function from(status: any): Status {
        switch (status) {
            case 'new':
                return Status.NEW;
                
            case 'displayed':
                return Status.DISPLAYED;
                
            case 'read':
                return Status.READ;
            
            default:
                return Status.NEW;
        }
    }
    
}


export interface Notification {
    
    id: number;
    message: string;
    date: Date;
    status: Status;
    
}

export namespace Notification {
    
    export function from(notification: any): Notification {
        return {
            id: notification.id,
            message: notification.message,
            date: moment(notification.date, moment.HTML5_FMT.DATETIME_LOCAL_MS).toDate(),
            status: Status.from(notification.status)
        };
    }
    
}

