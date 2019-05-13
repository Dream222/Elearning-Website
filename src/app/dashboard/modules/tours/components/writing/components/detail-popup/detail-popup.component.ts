import { Directive, Component, Output, Input, OnInit, ViewEncapsulation, EventEmitter} from '@angular/core';
import { WordDictionaryModel, MatchModel, WritingPracticeModel, ToneModel, ControlModel} from '@app/dashboard/models';
import { WritingResultService } from '@app/dashboard/services';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ErrorModel } from '@app/core/models';
import { ErrorHandlerService, UtilService} from '@app/core/services';
import { WritingConf } from '@app/core/confs';
import { Chart } from 'chart.js';

@Directive({
  selector: '[var]',
  exportAs: 'var'
})
export class VarDirective {
  @Input() var:any;
}

@Component({
  selector: 'el-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailPopupComponent implements OnInit{

  constructor(
      private writingResultService : WritingResultService,
      private errorHandlerService : ErrorHandlerService,
      public util : UtilService
        ) {}

  @Input('control') ctl : ControlModel;
  @Output() option : EventEmitter<any> = new EventEmitter<any>();
  @Output() play_embed : EventEmitter<string> = new EventEmitter<string>();
  wordDictionary : WordDictionaryModel = null;
  searchTerm = new Subject<string>();
  word : string ='';
  writingConf = new WritingConf();
  chart : any = null;
  tones : any = null;

  ngOnInit() {
      if(this.writingConf.show_section(this.ctl.baseline, 'word', this.ctl.sub))
      {
          this.writingResultService.searchWord(this.searchTerm)
          .subscribe(
              (result : WordDictionaryModel) =>
              {
                  this.wordDictionary = result;
              },
              (error : ErrorModel) =>
              {
                  this.errorHandlerService.showError(error);
              }
          );
      }
      if(this.writingConf.show_section(this.ctl.baseline, 'writing_analysis'))
            this.w_a_setting();
  }

  section_exist( section : string )
  {
      return this.writingConf.show_section(this.ctl.baseline, section, this.ctl.sub);
  }

  isGoodSearch()
  {
      if(this.word && this.wordDictionary && this.wordDictionary.word && this.wordDictionary.category && this.wordDictionary.definition)
        return true;
      return false;
  }

  search(word : string = null)
  {
      if(word)
        this.word = word;
      if(!this.word)
      {
        this.wordDictionary = null;
        return false;
      }
      this.searchTerm.next(this.word);
  }

  word_class(count : number = 1, style : boolean = false)
  {
      if(!count)
        return '';
      const text = count < 500 ? 'uncommon' : ( count > 1500 ? 'very common' : 'common');
      let k = this.writingConf.get_config(this.ctl.baseline, 'word').find((res) => res.value = text);
      return style ? k.class : k.text;
  }

  is_single_word(word : string)
  {
      return word.split(' ').length > 1 ? false : true;
  }

  capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  getImageUrl(url)
  {
      return 'assets/images/writing/' + url + '.png';
  }

  w_a_setting()
  {
      let t = this.util.el_json_dict(this.ctl.tones, this.writingConf.get_config(this.ctl.baseline, 'writing_analysis', 'tones'));
      this.tones = this.util.sort(t, 'score', 'descend');

      let chart_data = [], chart_labels = [];
      for(let i of this.writingConf.get_config(this.ctl.baseline, 'writing_analysis', 'sentiments'))
      {
         let v = this.util.el_json_dict(this.ctl.sentiments, i);
         chart_data.push(this.util.percent(v, 1))
         chart_labels.push(i.text);
      }
      this.chart = {
        datasets : [{data : chart_data, borderWidth : [8,8,8,8], hoverBorderWidth : [2,2,2,2]}],
        labels : chart_labels,
        type : 'pie',
        options : {
            responsive : true,
            legend : { display  : false },
        },
        colors : [{
            backgroundColor:[
                '#EE2A7B',
                '#00AC4E',
                '#5EC8F3',
                '#FFCF01'
            ],
            borderColor: '#333',
            hoverBorderColor: '#333',
        }]
      };
  }
  check_practice()
  {
    if(!this.ctl.practices.length || !this.section_exist('practice'))
        return false;
    return this.ctl.practices.some( r => r.category == this.ctl.match.category_id);
  }
}
