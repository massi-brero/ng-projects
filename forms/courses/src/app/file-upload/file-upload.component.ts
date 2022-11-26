import { Component, Input } from '@angular/core'
import { FileService } from '../services/file.service'
import { catchError, finalize } from 'rxjs/operators'
import { of } from 'rxjs'
import { HttpEventType } from '@angular/common/http'
import { ControlValueAccessor } from '@angular/forms'

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent implements ControlValueAccessor {
    @Input() requiredFileType: string
    filename = ''
    fileUploadError = false
    onChange: Function

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
                    }
                    else if (event.type === HttpEventType.Response) {
                      this.onChange(this.filename)
                    }
                })
        }
    }

    registerOnChange(fn: (_: string) => void): void {
      this.onChange = fn
    }

    registerOnTouched(fn: any): void {}

    writeValue(value: string): void {
        this.filename = value
    }
}
