import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreaConf } from '@app/core/confs';

@Component({
  selector: 'el-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  areaTitle: string;
  attemptId : string;
  area_conf = new AreaConf();

  ngOnInit() {
      const params = this.route.snapshot.params;

      if (params.areaTitle && params.attemptId)
      {
          this.areaTitle = params.areaTitle;
          this.attemptId = params.attemptId;
      }
  }
}
