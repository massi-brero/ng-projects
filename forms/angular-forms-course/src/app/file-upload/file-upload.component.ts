import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FileUploadService} from './file-upload.services';
import EventEmitter = NodeJS.EventEmitter;
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator,} from '@angular/forms';

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: FileUploadComponent
    }]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() requiredFileType = '';
    filename = '';
    uploadProgress = 0;
    isDisabled = false;
    fileUploadSuccess = false;
    onChange = (filename: string) => {
    };
    onTouched = () => {
    };

    constructor(private fileUploadService: FileUploadService) {
    }

    ngOnInit() {
        this.fileUploadService.uploadInterrupted$.subscribe(() => {
            this.uploadProgress = 0;
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: any): void {
        this.filename = value;
    }

    onClick(fileUpload: HTMLInputElement) {
        this.onTouched();
        fileUpload.click();
    }


    onFileSelected(event: Event) {
        const file: File = (event.target as HTMLInputElement).files[0];

        if (file) {
            console.log(file);
            this.filename = file.name;
            const formData = new FormData();
            formData.append('thumbnail', file);
            this.fileUploadService
                .upload(formData)
                .subscribe(uploadEvent => {
                        if (uploadEvent.type === HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round((uploadEvent.loaded / uploadEvent.total) * 100);
                        } else if (uploadEvent.type === HttpEventType.Response) {
                            this.fileUploadSuccess = true;
                            this.onChange(this.filename);
                        }
                    }
                );
        }
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.fileUploadSuccess) {
            return null;
        }

        let error: any = {
            requiredFileType: this.requiredFileType
        };


    }
}












