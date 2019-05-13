import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { LoginPopupComponent } from "@app/core/components/login-popup/login-popup.component"

import {
    AuthService,
    ErrorHandlerService,
    LoadingHandlerService,
    LocalStorageService,
    RouteHandlerService
} from '@app/core/services';

import { ErrorModel, LoginModel, UserModel } from '@app/core/models';

@Component({
    selector: 'el-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy
{
    private ngUnsubscribe = new Subject();

    loginModel: LoginModel = { email: '', password: '', client: 'front' };
    isLoggedIn: boolean;

    constructor(private authService: AuthService,
                private routeHandlerService: RouteHandlerService,
                private errorHandlerService: ErrorHandlerService,
                private route: ActivatedRoute,
                public dialog: MatDialog)
    {
    }

    ngOnInit()
    {
        const token = LocalStorageService.getToken();
        const user = LocalStorageService.getUser();

        if (!token || !user)
        {
            this.isLoggedIn = false;
        }
        else
        {
            LoadingHandlerService.show();
            this.authService.verify()
                .pipe(
                    finalize(() => LoadingHandlerService.hide()),
                    takeUntil(this.ngUnsubscribe)
                )
                .subscribe(
                    (isLoggedIn: boolean) =>
                    {
                        this.isLoggedIn = isLoggedIn;
                    }
                );
        }
    }

    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    goHome()
    {
        this.routeHandlerService.homePage();
    }

    getUser()
    {
        var user = LocalStorageService.getUser();
        return user.full_name;
    }

    popupLoginform()
    {
        const dialogRef = this.dialog.open(LoginPopupComponent);
        dialogRef.afterClosed()
        .subscribe(result => {
            if(!result)
                return;
            this.loginModel = result;
            this.login();
        });
    }

    login()
    {
        if (this.loginModel.email && this.loginModel.password)
        {
            LoadingHandlerService.show();

            this.authService.login(this.loginModel)
                .pipe(
                    finalize(() => LoadingHandlerService.hide()),
                    takeUntil(this.ngUnsubscribe)
                )
                .subscribe(
                    (data: { token: string, user: UserModel }) =>
                    {
                        LocalStorageService.login(data);
                        this.isLoggedIn = true;
                        const params = this.route.snapshot.queryParams;

                        if (params.returnUrl)
                        {
                            this.routeHandlerService.redirectTo(params.returnUrl);
                        }
                        else
                        {
                            this.routeHandlerService.afterLoginPage();
                        }
                    },
                    (error: ErrorModel) =>
                    {
                        this.errorHandlerService.showError(error);
                    }
                );
        }
    }

    logout()
    {
        LoadingHandlerService.show();

        this.authService.logout()
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe),
            )
            .subscribe(
                (isLoggedOut: boolean) =>
                {
                    if (isLoggedOut)
                    {
                        LocalStorageService.logout();
                        this.routeHandlerService.afterLogoutPage();
                        this.isLoggedIn = false;
                    }
                },
                (error: ErrorModel) =>
                {
                    this.errorHandlerService.showError(error);
                }
            );
    }

    openStats()
    {
        this.routeHandlerService.statsPage();
    }

    openMyAccount()
    {
        this.routeHandlerService.myAccountPage();
    }
}
