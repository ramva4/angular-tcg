import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, map } from "rxjs";

export class TestInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('in interceptor');
        let modifiedReq = req.clone({headers: req.headers.append('Header-added-in-interceptor', 'yes, this one!') });
        return next.handle(modifiedReq).pipe(map((event) => {
            console.log('Intercepted event type: ' + event.type);
/*             if (event.type === HttpEventType.Response) {
                console.log('Intercepted event type: '+ event.type);
                console.log(event);
            }
 */            return event;
        }));
    }
}