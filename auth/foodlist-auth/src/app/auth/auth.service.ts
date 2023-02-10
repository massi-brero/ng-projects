import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, of, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userSubj = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<authResponseData> {
    return this.http
      .post<authResponseData>(`${environment.signUpURL}${environment.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap()
      );
  }

  login(email: string, password: string): Observable<authResponseData> {
    return this.http
      .post<authResponseData>(`${environment.signInURL}${environment.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    if (!err.error?.error?.message) {
      throwError("Unkown Error");
    }
    return throwError(err.error.error.message.replace(/_/g, ' '));
  }
}
