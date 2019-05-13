import { Component, OnInit } from '@angular/core';
import {
    NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,
    RouterEvent
} from '@angular/router';

import { LoadingHandlerService } from '@app/core/services';

@Component({
    selector: 'el-olna-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
    constructor(private router: Router)
    {
    }

    ngOnInit()
    {
        this.router.events.subscribe((event: RouterEvent) =>
        {
            if (event instanceof NavigationStart)
            {
                LoadingHandlerService.show();
            }

            if (event instanceof NavigationEnd)
            {
                LoadingHandlerService.hide();
            }

            // Set loading state to false in both of the below events to hide the spinner in case a request fails
            if (event instanceof NavigationCancel)
            {
                LoadingHandlerService.hide();
            }

            if (event instanceof NavigationError)
            {
                LoadingHandlerService.hide();
            }
        });
    }
}
