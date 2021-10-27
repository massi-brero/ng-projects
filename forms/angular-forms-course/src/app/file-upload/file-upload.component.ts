import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FileUploadService} from './file-upload.services';
import EventEmitter = NodeJS.EventEmitter;

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
    providers: []
})
export class FileUploadComponent implements OnInit{
    @Input() requiredFileType = '';
    fileName = '';
    uploadProgress = 0;

    constructor(private fileUploadService: FileUploadService) {
    }

    ngOnInit() {
        this.fileUploadService.uploadInterupted$.subscribe(() => {
            this.uploadProgress = 0;
        });
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












