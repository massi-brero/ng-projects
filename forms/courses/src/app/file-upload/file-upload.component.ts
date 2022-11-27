import { Component, Input } from '@angular/core'
import { FileService } from '../services/file.service'
import { catchError, finalize } from 'rxjs/operators'
import { of } from 'rxjs'
import { HttpEventType } from '@angular/common/http'
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms'

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: FileUploadComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: FileUploadComponent,
        },
    ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
    @Input() requiredFileType: string
    filename = ''
    fileUploadError = false
    onChange = (_) => {}
    onTouched = () => {}
    onValidatorChange = () => {}
    isDisabled = false
    fileUploadSuccess = false

    constructor(private fileService: FileService) {}

    // @ts-ignore
    uploadProgress: number
    onFileSelected(event: Event) {
        const file: File = (event.target as HTMLInputElement).files[0]

        if (file) {
            this.filename = file.name
            console.log(this.filename)

            const formData = new FormData()
            formData.append('thumbnail', file)

            this.fileUploadError = false
            this.fileService
                .sendThumbnail(formData)
                .pipe(
                    catchError((error) => {
                        this.fileUploadError = true
                        return of(error)
                    }),
                    finalize(() => {
                        this.uploadProgress = null
                    })
                )
                .subscribe((event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.uploadProgress = Math.round(
                            (event.loaded / event.total) * 100
                        )
                    } else if (event.type === HttpEventType.Response) {
                        this.fileUploadSuccess = true
                        this.onChange(this.filename)
                        this.onValidatorChange()
                    }
                })
        }
    }

    onClick(fileUpload: HTMLInputElement) {
        this.onTouched()
        fileUpload.click()
    }

    registerOnChange(fn: (_: string) => void): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    writeValue(value: string): void {
        this.filename = value
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled
    }

    registerOnValidatorChange(fn: () => void) {
        this.onValidatorChange = fn
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.fileUploadSuccess) {
            return null
        }

        let errors: { requiredFileType: string; uploadFailed: boolean } = {
            requiredFileType: this.requiredFileType,
            uploadFailed: false,
        }

        if (this.fileUploadError) {
            errors.uploadFailed = true
        }

        return errors
    }
}
