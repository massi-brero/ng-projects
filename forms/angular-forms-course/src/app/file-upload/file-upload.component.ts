import {Component, Input, OnInit} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {FileUploadService} from './file-upload.services';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator,} from '@angular/forms';

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: FileUploadComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: FileUploadComponent
        }
    ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() requiredFileType;
    filename = '';
    uploadProgress = 0;
    isDisabled = false;
    fileUploadError: boolean;
    fileTypeError: boolean;
    onChange = (filename: string) => {
    };
    onTouched = () => {
    };
    onValidatorChange = () => {
    };

    constructor(private fileUploadService: FileUploadService) {
    }

    ngOnInit() {
        this.fileUploadService.uploadInterrupted$.subscribe(() => {
            this.fileUploadError = true;
            this.uploadProgress = 0;
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValidatorChange = fn;
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
        this.fileUploadError = false;
        this.fileTypeError = false;
        const file: File = (event.target as HTMLInputElement).files[0];

        if (file.type !== this.requiredFileType) {
            this.fileTypeError = true;
        }

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
                            this.onChange(this.filename);
                            this.onValidatorChange();
                        }
                    }
                );
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const errors: any = {};

        if (this.fileTypeError) {
            errors.requiredFileType = this.requiredFileType;
        } else if (this.fileUploadError) {
            errors.uploadFailed = true;
        } else {
            return null;
        }

        return errors;
    }
}












