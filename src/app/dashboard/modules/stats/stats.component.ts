import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/core/services';
import { UserAverageModel } from '@app/dashboard/models';
import { UserModel} from '@app/core/models';
import { AreaConf } from '@app/core/confs';

@Component({
    selector: 'el-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})


export class StatsComponent implements OnInit
{
    constructor(private activatedRoute : ActivatedRoute )
    {
        this.activatedRoute.params.subscribe( (res) => this.areaSet(res));
    }

    stats_account : UserModel;

    area : string;

    area_conf = new AreaConf();

    ngOnInit()
    {
        this.stats_account = LocalStorageService.getUser();
    }
    areaSet(res)
    {
        if(res.id)
        {
            this.area = res.id;
        }
    }
}
