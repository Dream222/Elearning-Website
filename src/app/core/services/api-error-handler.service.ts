import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';

import { ErrorModel } from '@app/core/models';

@Injectable()
export class ApiErrorHandlerService
{
    static handleError(errorResponse: HttpErrorResponse): Observable<ErrorModel>
    {
        const errorDescription: ErrorModel = errorResponse.error;

        console.error(errorDescription);

        return Observable.throw(errorDescription);
    }
}
