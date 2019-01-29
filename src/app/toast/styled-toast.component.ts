import { Component } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';


/**
 * The default toast class is overriden to '' in app.module to avoid a naming
 * conflict between the toasts in Bootstrap 4.2.X & ngx-toastr 9.1.1 which causes
 * the opacity to be set to 0.
 * 
 * See https://github.com/scttcper/ngx-toastr/issues/602
 * 
 * We don't want to apply the default '.toast' class to <app-styled-toast/> itself
 * as we cannot override the CSS style inside this component.
 */
@Component({
    selector: 'app-styled-toast',
    templateUrl: './styled-toast.component.html',
    styleUrls: ['./styled-toast.component.css'],
    animations: [
        trigger('flyInOut', [
            state('inactive', style({
                display: 'none',
                opacity: 0
            })),
            transition('inactive => active', animate('300ms ease-out', keyframes([
                style({
                    opacity: 0,
                    bottom: '-15px',
                    'max-height': 0,
                    'max-width': 0,
                    'margin-top': 0,
                }),
                style({
                    opacity: 0.8,
                    bottom: '-3px',
                }),
                style({
                    opacity: 1,
                    bottom: '0',
                    'max-height': '200px',
                    'margin-top': '12px',
                    'max-width': '400px',
                }),
            ]))),
            state('active', style({
                bottom: '0',
                'max-height': '200px',
                'margin-top': '12px',
                'max-width': '400px',
            })),
            transition('active => removed', animate('300ms ease-out', keyframes([
                style({
                    opacity: 0.6,
                    bottom: 0,
                }),
                style({
                    opacity: 0.1,
                    bottom: '-3px',
                }),
                style({
                    opacity: 0,
                    bottom: '-15px',
                }),
            ]))),
        ]),
    ],
})
export class StyledToastComponent extends Toast { 
    
    constructor(service: ToastrService, toastPackage: ToastPackage) {
        super(service, toastPackage);
    }

}


