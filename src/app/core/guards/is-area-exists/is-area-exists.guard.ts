import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AreaService, RouteHandlerService } from '@app/core/services';

import { AreaModel } from '@app/core/models';

@Injectable()
export class IsAreaExistsGuard implements CanActivate
{
    constructor(private areaService: AreaService,
                private routeHandlerService: RouteHandlerService)
    {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean
    {
        if (!next.params.areaTitle)
        {
            return false;
        }

        return this.areaService.getArea(next.params.areaTitle)
            .pipe(
                map((area: AreaModel) =>
                {
                    if (area)
                    {
                        return true;
                    }

                    return false;
                }),
                catchError((error) =>
                {
                    this.routeHandlerService.myAccountPage();

                    return of(false);
                })
            );
    }
}
