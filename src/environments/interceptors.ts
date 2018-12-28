import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from 'src/app/authentication/interceptors/authentication-interceptor';
import { EventInterceptor } from 'src/app/events/interceptors/event-interceptor';


export const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: EventInterceptor,
        multi: true
    }
];

