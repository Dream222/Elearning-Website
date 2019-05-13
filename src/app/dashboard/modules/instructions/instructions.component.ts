import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreaConf, TestConf } from '@app/core/confs';
import { RouteHandlerService, LocalStorageService } from '@app/core/services';

@Component({
    selector: 'el-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit
{
    areaTitle: string;
    area_conf = new AreaConf();
    test_conf = new TestConf();

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

    startTest(type)
    {
        localStorage.setItem('type', type);
        this.routeHandlerService.startTestPage(this.areaTitle);
    }
}
