import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ApiErrorHandlerService } from '@app/core/services';

import { ErrorModel } from '@app/core/models';
import { ChooseAnswerTestQuestionModel, WritingQuestionModel } from '@app/dashboard/models';

@Injectable()
export class QuestionService
{
    private url = 'api/questions/';

    constructor(private http: HttpClient)
    {
    }

    get(area_title : string, count : number = 15): Observable<ChooseAnswerTestQuestionModel[] | ErrorModel>
    {
        var url = this.url + area_title + '/' + count;
        console.log(url);
        return this.http
            .get<ChooseAnswerTestQuestionModel[]>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    getWritingQuestion(count : number = 1): Observable<WritingQuestionModel | ErrorModel>
    {
        var url = this.url + 'writing/' + count;
        return this.http
            .get<WritingQuestionModel>(url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
