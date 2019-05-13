import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { finalize, takeUntil } from 'rxjs/operators';

import { SignUpModel } from '@app/landing-page/models';
import { ErrorModel } from '@app/core/models';

import {
    AuthService,
    ErrorHandlerService,
    LoadingHandlerService
} from '@app/core/services';

@Component({
    selector: 'el-schools-sign-up',
    templateUrl: './schools-sign-up.component.html',
    styleUrls: ['./schools-sign-up.component.scss']
})
export class SchoolsSignUpComponent implements OnDestroy
{
    private ngUnsubscribe = new Subject();

    signUpModel: SignUpModel = {
        full_name: '',
        email: '',
        password: '',
        signup_method: 'school',
        client: 'front'
    };

    constructor(private authService: AuthService,
                private errorHandlerService: ErrorHandlerService)
    {
    }

    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    signUp()
    {
        if (!this.signUpModel)
        {
            return;
        }

        LoadingHandlerService.show();

        this.authService.signup(this.signUpModel)
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (success: boolean) =>
                {
                    this.errorHandlerService
                        .showMessage('User account successfully created. Please login with provided email and password');
                },
                (error: ErrorModel) =>
                {
                    this.errorHandlerService.showError(error);
                }
            );
    }
}
