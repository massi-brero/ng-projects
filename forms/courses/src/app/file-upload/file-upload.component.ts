import { Component, Input } from '@angular/core'

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {
    @Input() requiredFileType: string
    filename = ''

  // @ts-ignore
  onFileSelected(event: Event) {
    console.log(event);
    const file: File = (event.target as HTMLInputElement).files[0]
  }
}
