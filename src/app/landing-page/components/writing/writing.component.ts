import { Component, OnInit } from '@angular/core';
import { RouteHandlerService} from '@app/core/services';

@Component({
  selector: 'el-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {

  constructor(private routeHandlerService: RouteHandlerService) { }

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
