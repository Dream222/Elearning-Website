import { Component , HostListener} from '@angular/core';

import { RouteHandlerService } from '@app/core/services';
import { AreaConf } from '@app/core/confs';

@Component({
    selector: 'el-price-block',
    templateUrl: './price-block.component.html',
    styleUrls: ['./price-block.component.scss']
})
export class PriceBlockComponent
{

    area_conf = new AreaConf();

    constructor(private routeHandlerService: RouteHandlerService)
    {
    }

    changePriceDescription()
    {
    }

    startTest(areaTitle: string)
    {
        this.routeHandlerService.startExampleTestPage(areaTitle.toLowerCase());
    }
}
