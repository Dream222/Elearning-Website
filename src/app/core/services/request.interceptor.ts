import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from './local-storage.service';

import { environment } from '@env/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Get the auth header from the service.
        const token = LocalStorageService.getToken();
        const url = req.url.indexOf(environment.domain) > -1 ?
            req.url :
            environment.domain + req.url + '';

        if (!token)
        {
            const apiReq = req.clone({ url: url });

            return next.handle(apiReq);
        }
        else
        {
            // Get the auth header from the service.
            const authHeader = 'Bearer ' + token;
            // Clone the request to add the new header.
            const authReq = req.clone({
                setHeaders: { 'Authorization': authHeader },
                url: url
            });
            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
        }
    }
}
