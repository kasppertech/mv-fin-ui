import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/operator/do';
 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let token = localStorage.getItem('mv-app-token');
        let headers;
        let multiploHeaders;

        if (token != undefined) {
           
                multiploHeaders = req.clone({
                    headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')        
                       .set('Authorization', `Bearer ${token}`)
                });
            
            return next.handle(multiploHeaders);
        } else {
            multiploHeaders = req.clone({ setHeaders: headers });
        }

        return next.handle(multiploHeaders);
    }
} 