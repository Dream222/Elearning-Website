import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AuthService, LocalStorageService } from '@app/core/services';

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private router: Router,
                private authService: AuthService)
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean
    {
        const token = LocalStorageService.getToken();
        const user = LocalStorageService.getUser();

        if (!token || !user)
        {
            LocalStorageService.logout();
            this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });

            return false;
        }

        return this.authService.verify()
            .pipe(
                map((success: boolean) =>
                {
                    if (success !== null && success)
                    {
                        // logged in so return true
                        return true;
                    }

                    // error when verify so redirect to login page with the return url
                    LocalStorageService.logout();
                    this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });

                    return false;
                }),
                catchError((error) =>
                {
                    // error when verify so redirect to login page with the return url
                    LocalStorageService.logout();
                    this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });

                    return of(false);
                })
            );
    }
}
