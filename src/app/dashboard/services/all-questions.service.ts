
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ApiErrorHandlerService } from '@app/core/services';

import { ErrorModel } from '@app/core/models';
import { ChooseAnswerTestQuestionModel } from '@app/dashboard/models';

@Injectable()
export class AllQuestionsService
{
    private url = 'question';

    constructor(private http: HttpClient)
    {
    }

    get(): Observable<ChooseAnswerTestQuestionModel[] | ErrorModel>
    {
        return this.http
            .get<ChooseAnswerTestQuestionModel[]>(this.url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
