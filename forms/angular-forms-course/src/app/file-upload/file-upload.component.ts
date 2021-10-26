import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FileUploadService} from './file-upload.services';

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
    providers: []
})
export class FileUploadComponent {
    @Input() requiredFileType = '';
    fileName = '';
    uploadProgress = 0;


    constructor(private fileUploadService: FileUploadService) {
    }

    onFileSelected(event: Event) {
        const file: File = (event.target as HTMLInputElement).files[0];

        if (file) {
            console.log(file);
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('thumbnail', file);
            this.fileUploadService
                .upload(formData)
                .subscribe(uploadEvent => {
                        if (uploadEvent.type === HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round((uploadEvent.loaded / uploadEvent.total) * 100);
                        }
                    }
                );
        }

    }
}












