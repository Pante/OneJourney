import { Component } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';


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


