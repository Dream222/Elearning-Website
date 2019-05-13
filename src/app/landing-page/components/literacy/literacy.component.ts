import { Component, OnInit } from '@angular/core';
import { RouteHandlerService} from '@app/core/services'
@Component({
  selector: 'el-literacy',
  templateUrl: './literacy.component.html',
  styleUrls: ['./literacy.component.scss']
})
export class LiteracyComponent implements OnInit {

  constructor(private routeHandlerService: RouteHandlerService) { }

  ngOnInit() {
  }
  onTest(areaTitle: string)
  {
      this.routeHandlerService.startExampleTestPage(areaTitle.toLowerCase());
  }
  changePriceDescription()
  {

  }
}
