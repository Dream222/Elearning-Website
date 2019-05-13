import { Injectable } from '@angular/core';
import { PracticeModel } from '@app/dashboard/models';
import { ErrorModel } from '@app/core/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ApiErrorHandlerService } from '@app/core/services';

@Injectable()
export class PracticeService {

  constructor( private http : HttpClient ) { }

  private url = "practice";

  getPractice() : Observable< PracticeModel[] | ErrorModel>
  {
    return this.http
        .get<PracticeModel[]>(this.url)
        .pipe(catchError(ApiErrorHandlerService.handleError));
  }
}
