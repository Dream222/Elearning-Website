import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ApiErrorHandlerService } from './api-error-handler.service';

import { AreaModel, ErrorModel, UserAreaModel } from '@app/core/models';

@Injectable()
export class AreaService
{
    private url = 'api/areas';

    constructor(private http: HttpClient)
    {
    }

    getArea(areaTitle: string)
    {
        const url = this.url + '/get/' + areaTitle;

        return this.http
            .get<AreaModel>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    getUserAreas(): Observable<UserAreaModel[] | ErrorModel>
    {
        const url = this.url + '/user';

        return this.http
            .get<UserAreaModel[]>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
