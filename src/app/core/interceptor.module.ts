import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../core/token/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import {
    HttpClient, HttpHeaders,
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    refreshTokenUrl: string;
    loginUrl: string;

    constructor(
        private router: Router,
        private userService: UserService,
        public loaderService: LoaderService,
        public http: HttpClient,
        private tokenService: TokenService,
        private errorService: ErrorService
    ) {
        this.refreshTokenUrl = `${environment.apiUrl}/jwt/refresh-token`;
        this.loginUrl = `${environment.apiUrl}/login`;
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.showLoader();

        if (this.userService.changePasswordNow() && req.url.search("/auth/change-password") < 0) {

            this.router.navigate(['/alter-profile-user']);

        } else if (req.url != this.loginUrl) {

            if (req.url != this.refreshTokenUrl && this.tokenService.getTokenExpirationDate()) {

                let nowDate = moment();
                let expirationDate = this.tokenService.getTokenExpirationDate();

                if (nowDate.isAfter(expirationDate)) {

                    this.tokenService.removeToken();
                    this.router.navigate(['/login']);
                    return next.handle(new HttpRequest('GET', '/login'));

                } else if (nowDate.diff(expirationDate, 'minutes') > -10) {

                    this.http
                        .post(`${this.refreshTokenUrl}`, { token: this.tokenService.getToken() })
                        .toPromise().then(response => {
                            let res: any = response;
                            this.tokenService.setToken(res.token, res.tokenExpirationDate);
                        })
                        .catch(response => {
                            this.errorService.showError(response);
                        });
                }
            }

            if (this.tokenService.getToken()) {
                let authReq;
                if (req.url.includes(environment.apiUrl))
                    authReq = req.clone({
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.tokenService.getToken()
                        })
                    });
                else
                    authReq = req.clone({
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json'
                        })
                    });


                return next.handle(authReq).pipe(
                    tap(
                        (event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                this.hideLoader();
                            }
                        },
                        (res: any) => {
                            if (res.status == 401 || res.status == 403) {
                                this.tokenService.removeToken();
                                this.router.navigate(['/login']);
                                return next.handle(new HttpRequest('GET', '/login'));
                            } else {
                                this.hideLoader();
                            }
                        }
                    )
                );
            }
        }

        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.hideLoader();
                    }
                },
                (res: any) => {
                    this.hideLoader();
                }
            )
        );
    }

    private showLoader(): void {
        setTimeout(() => {
            this.loaderService.show();
        }, 0);
    }


    private hideLoader(): void {
        setTimeout(() => {
            this.loaderService.hide();
        }, 0);
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})
export class Interceptor { }