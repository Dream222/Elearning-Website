import { Component, OnInit } from '@angular/core';
import { StatsService } from '@app/dashboard/services';
import { UtilService, RouteHandlerService } from '@app/core/services';
import { AreaConf } from '@app/core/confs';
import { WritingStatsModel } from '@app/dashboard/models';

@Component({
  selector: 'el-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {

  constructor(private statsService : StatsService, private route : RouteHandlerService, public util : UtilService) { }

  attempts : WritingStatsModel[] = null;
  loading : boolean = false;
  area_conf = new AreaConf();
  ngOnInit() {
      this.loading = true;
      this.statsService.getWritingStats(0,100)
        .subscribe((res) =>{
            this.attempts = res['attempts'];
            this.loading = false;
        });
  }

  time_to_complete( time : number )
  {
      return this.util.convert_msec_to_string(time);
  }

  viewResults(id: number)
  {
      this.route.testResultPage('writing', id);
  }

}
