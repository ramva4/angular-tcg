import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* Intercept and add paramater to any request when the used != null */
        return this.authService.authenticatedUser.pipe(take(1), exhaustMap((user) => {
            return next.handle(((user === null || user.token === null)
                ? req
                : req.clone({ params: new HttpParams().set('auth', user?.token as string) })
            ));
        }));
    }
}