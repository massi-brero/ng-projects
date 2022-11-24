import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {error} from 'protractor';

export class FileService {
  url = '/api/thumbnail-upload'

  constructor(private http: HttpClient) {
  }

  sendThumbnail(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData)
      pipe(
        catchError(error => {
          return Observable
        })
      )
      .subscribe()
  }
}
