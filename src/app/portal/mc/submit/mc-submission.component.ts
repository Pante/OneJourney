import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import { MCService } from '../mc.service';
import { LoadingService } from '../../../shared/loading/loading.service';


const defaultpic = '../../../../assets/images/temporary.png';

@Component({
  selector: 'app-mc-submission',
  templateUrl: './mc-submission.component.html',
  styleUrls: ['./mc-submission.component.css']
})

export class MCSubmissionComponent implements OnInit {

    toast: ToastrService;
    service: MCService;
    loading : LoadingService;
    file: File;

    picURL: any;
    error: string;
    selected: string;

    constructor(service: MCService, toast: ToastrService, loading: LoadingService, title: Title) {
        this.service = service;
        this.picURL = defaultpic;
        this.toast = toast;
        this.loading = loading;
        this.selected = 'Choose image';
        title.setTitle('OneJourney - MC');
    }

    ngOnInit() {
        
    }

    submit() {
        if (this.file != null)  {
            this.loading.render(true, 'Submitting MC');
            this.service.upload(this.file).subscribe(response => {
                if (response.status === 200) {
                    this.loading.render(false);
                    this.toast.show('You have submitted a new MC', 'MC Submission Success');

                } else {
                    this.toast.show('Fail to submit MC', 'MC Submission Failure');
                }
            });
        } else {
            this.error = 'No images are not uploaded!'
        }
    }

    getFile(event: any) {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        this.file = event.target.files[0];

        if (this.file.type.match(/image\/*/)) {
            const reader = new FileReader();
            this.selected = this.file.name;
            reader.onload = e => this.picURL =  reader.result;
            reader.readAsDataURL(this.file);
            this.error = '';
        } else {
            this.selected = 'Choose image';
            this.picURL = defaultpic;
            this.file = null;
            this.error = 'Only images can be uploaded.';

        }
    }
    checkFileisValid(): boolean {
        if (this.file != null) {
            return true;
        } else {
            return false;
        }
    }
}
