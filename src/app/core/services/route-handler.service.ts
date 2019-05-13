import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const routes = {
    homePage: '/welcome',
    pageAfterLogout: '/welcome',
    pageAfterLogin: '/dashboard',
    myAccountPage: '/dashboard/my-account',
    statsPage: '/dashboard/stats/literacy',
    testsPage: '/dashboard',
    exampleTestsPage: '/example'
};

@Injectable()
export class RouteHandlerService
{
    constructor(private router: Router)
    {
    }

    homePage()
    {
        this.redirectTo(routes.homePage);
    }

    afterLoginPage()
    {
        this.redirectTo(routes.pageAfterLogin);
    }

    afterLogoutPage()
    {
        this.redirectTo(routes.pageAfterLogout);
    }

    myAccountPage()
    {
        this.redirectTo(routes.myAccountPage);
    }

    statsPage()
    {
        this.redirectTo(routes.statsPage);
    }

    startExampleTestPage(areaTitle: string)
    {
        const url = this.router.url;

        if (url.indexOf(areaTitle + '/instructions') >= 0)
        {
            this.redirectTo(routes.exampleTestsPage + '/' + areaTitle + '/tests');
        }
        else
        {
            this.redirectTo(routes.exampleTestsPage + '/' + areaTitle);
        }
    }

    exampleTestResultPage(areaTitle: string)
    {
        this.redirectTo(routes.exampleTestsPage + '/' + areaTitle + '/results');
    }

    exampleWritingTestResultPage(areaTitle: string, attempt_id : number)
    {
        this.redirectTo(routes.exampleTestsPage + '/' + areaTitle + '/results/' + attempt_id);
    }

    startTestPage(areaTitle: string)
    {
        const url = this.router.url;

        if (url.indexOf(areaTitle + '/instructions') >= 0)
        {
            this.redirectTo(routes.testsPage + '/' + areaTitle + '/tests');
        }
        else
        {
            this.redirectTo(routes.testsPage + '/' + areaTitle);
        }
    }

    testResultPage(areaTitle:string, attemptId: number)
    {
        this.redirectTo(routes.testsPage + '/' + areaTitle + '/results/' + attemptId);
    }

    redirectTo(commands: string)
    {
        this.router.navigate([commands]);
    }
}
