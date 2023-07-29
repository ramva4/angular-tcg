import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, delay, tap, throwError } from "rxjs";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    static readonly signupUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    static readonly signinUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

    authenticatedUser = new BehaviorSubject<User | null>(null);
    apiKey: string = 'AIzaSyAnenFHFQR98GiLXyTODuKNvLNTBDCLJbk';
    tokenExpiryTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    logout() {
        this.authenticatedUser.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);

        /*  Clear auto expiration timer so that the timer does not 
            stay running (in case this is a manual logout) */
        if (this.tokenExpiryTimer) {
            clearTimeout(this.tokenExpiryTimer);
        }
        this.tokenExpiryTimer = null;
    }

    setupAutologout(logoutTimeMs: number) {
        this.tokenExpiryTimer = setTimeout(() => {
            this.logout();
        }, logoutTimeMs);
    }

    autologin() {
        const userData = localStorage.getItem('userData');
        if (!userData) return;
        const userObj: {
            email: string,
            localId: string,
            _expiry: string,
            _token: string
        } = JSON.parse(userData);
        if (!userObj) return;
        const storedUser = new User(userObj.email, userObj.localId, userObj._token, new Date(userObj._expiry));
        if (storedUser.token) {
            this.authenticatedUser.next(storedUser);
            /*  Set-up autologout with the expiry time as the
                token validity ie difference between the token
                expiry time and current time */
            this.setupAutologout(
                new Date(userObj._expiry).getTime() - new Date().getTime()
            );
        }
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseObj>(AuthService.signinUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }, { params: new HttpParams().append('key', this.apiKey) })
            .pipe(
                delay(2000),
                catchError(this.handleError),
                tap((responseObj: AuthResponseObj) => {
                    this.handleAuthentication(
                        responseObj.email,
                        responseObj.localId,
                        responseObj.idToken,
                        +responseObj.expiresIn);
                })
            );
    }

    signup(email: string, password: string) {
        //console.log('Going to post..');
        return this.http.post<AuthResponseObj>(AuthService.signupUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }, { params: new HttpParams().append('key', this.apiKey) })
            .pipe(
                delay(2000),
                catchError(this.handleError),
                tap((responseObj: AuthResponseObj) => {
                    this.handleAuthentication(
                        responseObj.email,
                        responseObj.localId,
                        responseObj.idToken,
                        +responseObj.expiresIn);
                })
            );
    }

    private handleAuthentication(
        email: string,
        localId: string,
        token: string,
        expiresIn: number
    ) {
        const tokenExp = new Date(new Date().valueOf() + (expiresIn * 3600));
        const userObj = new User(
            email,
            localId,
            token,
            tokenExp);
        this.authenticatedUser.next(userObj);
        /* Set up auto-logout timer to tick with set millisecond timeout */
        this.setupAutologout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(userObj));
        this.router.navigate(['/recipes']);
    }

    private handleError(errorObj: HttpErrorResponse): Observable<any> {
        let errorMessage = 'Unknown error occurred';
        if (errorObj.error && errorObj.error.error) {
            switch (errorObj.error.error.message) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Unregistered email';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid credentials';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'Account is disabled';
                    break;
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already registered';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Password sign-in is disabled';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Operation temporarily blocked-- try again later';
                    break;
                default:
                    console.log(errorObj);
                    errorMessage = errorObj.error.error.message;
            }
        }
        return throwError(() => new Error(errorMessage));

    }
}

interface AuthResponseObj {
    idToken: string,
    email: string;
    refreshToken: string,
    expiresIn: number,
    localId: string,
    registered?: boolean
    displayName?: string,
    kind?: string,
}