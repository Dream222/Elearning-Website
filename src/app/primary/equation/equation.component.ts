import { Component, OnInit , Input , OnChanges} from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'el-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements OnInit ,OnChanges{

  constructor() { }

  @Input() equation : string;

  options: KatexOptions = {
      displayMode: true,
    };

    fraction = [];

    text = '2^3 + 3^5';

  ngOnInit() {
  }

  ngOnChanges()
  {
      var str = this.equation;
      var result = [];
      var i = 0 , j = 0 , m = 0;
      if(str.indexOf('^') != -1)
      {
        this.fraction.push({equation: true, text : str});
        return;
      }
      if(!str)
        return;
      for( i = 0 ; i <= str.length - 1 ; i ++)
      {
          if(( m == 0 && str[i] == '\\' && str[i+1] == '(') || ( i == str.length - 1))
          {
              if( i == str.length - 1)
                result.push({equation: false, text : str.substring(j,i + 1)});
              else
                result.push({equation: false, text : str.substring(j,i)});
              j = i + 2;
              i = j;
              m = 1;
          }
          else if( m == 1 && str[i] == '\\' && str[i+1] == ')')
          {
              result.push({equation : true, text : str.substring(j,i)});
              j = i + 2;
              i = j;
              m =0;
          }
          else if( str.substring(i, i+4) == '\\div')
          {
              result.push({equation : false, text : str.substring(j,i)});
              result.push({equation : true, text : '\\div'});
              j = i + 4;
              i = j - 1;
          }
      }
      this.fraction = result;
  }

}
