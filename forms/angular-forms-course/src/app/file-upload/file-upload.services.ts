import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {catchError} from 'rxjs/operators';
import {of, pipe} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    postThumbnailUrl = '/api/thumbnail-upload';
    uploadError = false;

    constructor(
        private http: HttpClient
    ) {
    }

    upload(fileThumbnail: FormData) {
        return this.http.post(this.postThumbnailUrl, fileThumbnail, {
            reportProgress: true,
            observe: 'events'
        })
            .pipe(
            catchError(e => {
                this.uploadError = true;
                return of(e);
            })
        );
    }
}
