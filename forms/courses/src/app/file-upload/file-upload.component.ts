import { Component, Input } from '@angular/core'
import { FileService } from '../services/file.service'

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {
    @Input() requiredFileType: string
    filename = ''
    fileUploadError = false

    constructor(private fileService: FileService) {}

    // @ts-ignore
    onFileSelected(event: Event) {
        const file: File = (event.target as HTMLInputElement).files[0]

        if (file) {
            this.filename = file.name
            console.log(this.filename)

            const formData = new FormData()
            formData.append('thumbnail', file)

            this.fileUploadError = false
            this.fileService.sendThumbnail(formData)
        }
    }
}
