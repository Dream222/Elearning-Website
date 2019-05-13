import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Error } from 'tslint/lib/error';

import { MaterialDesignModule } from '@app/shared';
import { HeaderComponent, FooterComponent } from './components';
import { AuthGuard } from './guards';
import {
    ApiErrorHandlerService,
    AuthService,
    LocalStorageService,
    RequestInterceptor,
    AreaService,
    RouteHandlerService,
    ErrorHandlerService,
    LoadingHandlerService,
    UtilService
} from './services';

import { IsAreaExistsGuard } from '@app/core/guards';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialDesignModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoginPopupComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        LoginPopupComponent
    ],
    entryComponents :[
        LoginPopupComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        AuthGuard,
        IsAreaExistsGuard,
        ApiErrorHandlerService,
        RouteHandlerService,
        AuthService,
        LocalStorageService,
        AreaService,
        ErrorHandlerService,
        LoadingHandlerService,
        UtilService
    ]
})
export class CoreModule
{
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule)
    {
        if (parentModule)
        {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}
