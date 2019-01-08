import { Component, Input } from '@angular/core';

import { Paginated } from './paginated';


@Component({
    selector: 'app-pagination-buttons',
    templateUrl: './pagination-buttons.component.html',
    styleUrls: ['./pagination-buttons.component.css']
})
export class PaginationButtonsComponent {
    
    @Input() display: Paginated<any>;
    @Input() colour: string;

}

