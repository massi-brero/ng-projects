import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {catchError, finalize} from 'rxjs/operators';
import {of, pipe, Subject} from 'rxjs';
import {ControlValueAccessor} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService{
    postThumbnailUrl = '/api/thumbnail-upload';
    uploadError = false;
    uploadInterruptedSubject = new Subject();
    uploadInterrupted$ = this.uploadInterruptedSubject.asObservable();

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
                }),
                finalize(() => {
                    this.uploadInterruptedSubject.next();
                })
            );
    }
}
