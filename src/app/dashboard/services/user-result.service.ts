import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ApiErrorHandlerService } from '@app/core/services';

import { UserAttemptModel, UserResultCreateModel, UserResultModel } from '@app/dashboard/models';
import { ErrorModel } from '@app/core/models';

@Injectable()
export class UserResultService
{
    private url = 'api/user-results';

    constructor(private http: HttpClient)
    {
    }

    getResults(attemptId: number): Observable<UserResultModel | ErrorModel>
    {
        const url = this.url + '/' + attemptId;

        return this.http
            .get<UserResultModel>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    create(result: UserResultCreateModel): Observable<UserAttemptModel | ErrorModel>
    {
        return this.http
            .post<UserAttemptModel>(this.url, result)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
