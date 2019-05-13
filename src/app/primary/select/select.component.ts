import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'el-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor() { }

  @Input() source : any = [];
  @Input() default : any = null;
  @Output() option :  EventEmitter<any> = new EventEmitter<any>();
  sel_option : any;

  ngOnInit() {
    this.sel_option = this.default;
  }

  onSelect(option)
  {
    this.option.emit(option);
  }
}
