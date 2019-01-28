import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from 'src/app/authentication/interceptors/authentication-interceptor';


export const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
    }
];
