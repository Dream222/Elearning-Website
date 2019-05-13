import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { finalize, takeUntil } from 'rxjs/operators';

import { ErrorModel, UserAreaModel, UserModel} from '@app/core/models';

import { AreaConf } from '@app/core/confs';

import {
    AreaService,
    ErrorHandlerService,
    LoadingHandlerService,
    LocalStorageService,
    RouteHandlerService
} from '@app/core/services';

@Component({
    selector: 'el-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy
{
    private ngUnsubscribe = new Subject();

    user: UserModel;
    areas: UserAreaModel[] = null;
    area_conf = new AreaConf();

    constructor(private areaService: AreaService,
                private errorHandlerService: ErrorHandlerService,
                private routeHandlerService: RouteHandlerService)
    {
    }

    ngOnInit()
    {
        LoadingHandlerService.show();

        this.areaService.getUserAreas()
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (areas: UserAreaModel[]) =>
                {
                    this.areas = areas;
                },
                (error: ErrorModel) =>
                {
                    this.errorHandlerService.showError(error);
                }
            );

        this.user = LocalStorageService.getUser();
    }

    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    needToGetAccess()
    {
        if (!this.areas || this.areas.length === 0)
        {
            return true;
        }

        const areas = this.areas.filter((area: UserAreaModel) => area.isUserHaveAccess);

        return areas.length !== this.areas.length;
    }

    startTest(selectedArea: UserAreaModel)
    {
        if (selectedArea.isUserHaveAccess)
        {
            this.routeHandlerService.startTestPage(selectedArea.title.toLowerCase());
        }
        else
        {
            this.routeHandlerService.startExampleTestPage(selectedArea.title.toLowerCase());
        }
    }

    onStats()
    {
        this.routeHandlerService.statsPage();
    }
}
