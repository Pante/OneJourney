import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mc-submission',
  templateUrl: './mc-submission.component.html',
  styleUrls: ['./mc-submission.component.css']
})
export class MCSubmissionComponent implements OnInit {

    constructor(title: Title) {
        title.setTitle('OneJourney - MC');
    }

    ngOnInit() {
        
    }

}
