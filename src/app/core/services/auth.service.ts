import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ErrorModel, UserModel } from 'app/core/models';

import { ApiErrorHandlerService } from './api-error-handler.service';

import { LoginModel } from '@app/core/models/login.model';
import { SignUpModel } from '@app/landing-page/models';

@Injectable()
export class AuthService
{
    private url = 'api/auth';

    constructor(private http: HttpClient)
    {
    }

    verify()
    {
        const url = 'auth/verify';
        return this.http
            .get<boolean>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    login(model: LoginModel): Observable<{ token: string, user: UserModel } | ErrorModel>
    {
        const url = 'auth/local';

        return this.http
            .post<{ token: string, user: UserModel }>(url, model)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    logout(): Observable<boolean | ErrorModel>
    {
        const url = this.url + '/logout';

        return this.http
            .get<boolean>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    signup(model: SignUpModel): Observable<boolean | ErrorModel>
    {
        const url = 'auth/local/register';

        return this.http
            .post<boolean>(url, model)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
