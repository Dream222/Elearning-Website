import { Component, OnInit } from '@angular/core';
import { RouteHandlerService } from '@app/core/services';

@Component({
  selector: 'el-numeracy',
  templateUrl: './numeracy.component.html',
  styleUrls: ['./numeracy.component.scss']
})
export class NumeracyComponent implements OnInit {

  constructor(private routeHandlerService : RouteHandlerService) { }

  ngOnInit() {
  }
  onTest(areaTitle : string)
  {
      this.routeHandlerService.startExampleTestPage(areaTitle.toLowerCase());
  }
  changePriceDescription()
  {

  }
}
