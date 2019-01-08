import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-med-submission',
  templateUrl: './med-submission.component.html',
  styleUrls: ['./med-submission.component.css']
})
export class MedSubmissionComponent implements OnInit {

    constructor(title: Title) {
        title.setTitle('OneJourney - MC');
    }

    ngOnInit() {
        
    }

}
