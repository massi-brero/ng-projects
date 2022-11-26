import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class FileService {
    url = '/api/thumbnail-upload'

    constructor(private http: HttpClient) {}

    sendThumbnail(formData: FormData): Observable<any> {
        return this.http.post(this.url, formData, {
            reportProgress: true,
            observe: 'events',
        })
    }
}
