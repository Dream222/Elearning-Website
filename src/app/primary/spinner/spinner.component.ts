import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'el-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnChanges {

  constructor() { }

  @Input() show : boolean = false;
  @Input() color : string = '#000';
  config : any;

  ngOnChanges() {
      this.config = {
        primaryColour : this.color
      };
  }

}
