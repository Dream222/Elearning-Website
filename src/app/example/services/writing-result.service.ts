import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ApiErrorHandlerService } from '@app/core/services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {
    WritingTestResultModel,
    WritingTestAttemptModel,
    WritingResultModel,
    WritingTestResultAttemptModel,
    WordDictionaryModel
} from '@app/example/models';
import { ErrorModel } from '@app/core/models';

@Injectable()
export class WritingResultService {

  private url = 'api/writing';


  constructor( private http : HttpClient ) { }

  create(result : WritingTestResultModel ) :Observable<WritingTestAttemptModel | ErrorModel>
  {
      var url = this.url + '/check-text';
      return this.http
        .post<WritingTestAttemptModel>(url, result)
        .pipe(
            catchError(ApiErrorHandlerService.handleError)
        );
  }
  getResult(attempt : WritingTestResultAttemptModel) : Observable<WritingResultModel | ErrorModel>
  {
      var url = this.url +'/writing-result';
      return this.http
        .post<WritingResultModel>(url, attempt)
        .pipe(
            catchError(ApiErrorHandlerService.handleError)
        );
  }
  getComprehend(text : string)
  {
      var url = this.url + '/comprehend';
      return this.http.post(url, text);
  }

  searchWord(terms: Observable<string>) : Observable< WordDictionaryModel | ErrorModel> {
    return terms.debounceTime(10)
      .distinctUntilChanged()
      .switchMap(
          word =>
          {
              var url = this.url + '/' + word;
              return this.http
                .get<WordDictionaryModel>(url)
                .pipe(
                    catchError(ApiErrorHandlerService.handleError)
                );
          });
  }
}
