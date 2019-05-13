import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { StatsAttemptsTableModel , WritingStatsModel} from '@app/dashboard/models';
import { ErrorModel } from '@app/core/models';

import { ApiErrorHandlerService } from '@app/core/services';

@Injectable()
export class StatsService
{
    private url = 'api/stats';

    constructor(private http: HttpClient)
    {
    }

    getAttempts(): Observable<StatsAttemptsTableModel[] | ErrorModel>
    {
        const url = this.url + '/attempts';
        return this.http
            .get<StatsAttemptsTableModel[]>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    getAttemptsStats(area : string, start : number, end : number): Observable< any | ErrorModel>
    {
        const url = this.url + '/attempts/' + area + '/' + start + '/' + end;
        return this.http
            .get(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    getWritingStats(start : number, end : number): Observable< WritingStatsModel | ErrorModel >
    {
        const url = this.url + '/attempts/writing/' + start + '/' + end;
        return this.http
            .get<WritingStatsModel>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
