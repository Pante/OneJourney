import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { NotificationService } from '../portal/notifications/notification.service';


export enum Type {
    
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger'
    
}

export interface Toast {
    
    message: string;
    date: Date;
    type: Type;
    
}


@Injectable({ providedIn: 'root' })
export class ToastService {
    
    private notifications: NotificationService;
    private emitter: Subject<Toast>;
    
    
    constructor(notifications: NotificationService) {
        this.notifications = notifications;
        this.emitter = new Subject<Toast>();
    }

    
    toasts(): Observable<Toast> {
        return this.emitter;
    }
    
}


