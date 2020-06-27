import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly apiKey = 'AIzaSyA5Rm-WxNGaNsy1ERV2U66DxFEx5gx1nkU';
    readonly signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    readonly loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    readonly userDataKey = 'userData';
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
        console.log(email, password);
        return this.http
            .post<AuthResponseData>(this.signupUrl, {
                email,
                password,
                returnSecureToken: true,
            })
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.loginUrl, {
                email,
                password,
                returnSecureToken: true,
            })
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem(this.userDataKey);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
        this.router.navigate(['/auth']);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (errorRes.error && errorRes.error.error) {
            errorMessage = `An error occurred: ${errorRes.error.error.message}`;
        }
        return throwError(errorMessage);
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            $token: string;
            $tokenExpiration: string;
        } = JSON.parse(localStorage.getItem(this.userDataKey));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData.$token,
            new Date(userData.$tokenExpiration)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData.$tokenExpiration).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem(this.userDataKey, JSON.stringify(user));
    }
}
