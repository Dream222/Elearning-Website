import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'el-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    areaTitle: string;

    constructor(private route: ActivatedRoute)
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

}
