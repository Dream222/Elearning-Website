import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { SchoolModel, AddSchoolModel , AddSchoolResponseModel, GetStudentInputModel} from '@app/dashboard/modules/admin-panel/models';
import { ErrorModel } from '@app/core/models';

import { ApiErrorHandlerService } from '@app/core/services';


@Injectable()
export class AdminService {

    private url = 'school';

    constructor(private http: HttpClient)
    {
    }

    getSchools(): Observable<SchoolModel[] | ErrorModel>
    {
        return this.http
            .get<SchoolModel[]>(this.url)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    createSchool(school : AddSchoolModel) : Observable<AddSchoolResponseModel | ErrorModel>
    {
        return this.http
            .post<AddSchoolResponseModel>(this.url, school)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }

    getStudents(user : string, input : GetStudentInputModel)
    {
        var url = 'user/import-students';
        return this.http
            .post(url, input)
            .pipe(
                catchError(ApiErrorHandlerService.handleError)
            );
    }
}
