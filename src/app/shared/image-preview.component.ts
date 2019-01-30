export const URL = '../../../../assets/images/profile_pic.png';


export abstract class ImagePreviewComponent {
    
    url: any;
    file: File;
    selected: string;
    error: string;
    

    preview(event: any): void {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        this.file = event.target.files[0];
        if (this.file.type.match(/image\/*/)) {
            this.selected = this.file.name;
            this.error = '';
            const reader = new FileReader();
            reader.onload = e => this.url = reader.result;
            reader.readAsDataURL(this.file);

        } else {
            this.selected = 'Choose Image';
            this.error = 'Only images can be uploaded.';
            this.url = URL;
            this.file = null;
        }
    }
    
}

