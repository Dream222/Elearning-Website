import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouteHandlerService } from '@app/core/services';

@Component({
    selector: 'el-example-instructions',
    templateUrl: './example-instructions.component.html',
    styleUrls: ['./example-instructions.component.scss']
})
export class ExampleInstructionsComponent implements OnInit
{
    areaTitle: string;

    constructor(private route: ActivatedRoute,
                private routeHandlerService: RouteHandlerService)
    {
    }

    ngOnInit()
    {
        const params = this.route.snapshot.params;

        if (params.areaTitle)
        {
            this.areaTitle = params.areaTitle;
        }
    }

    startTest()
    {
        this.routeHandlerService.startExampleTestPage(this.areaTitle);
    }
}
