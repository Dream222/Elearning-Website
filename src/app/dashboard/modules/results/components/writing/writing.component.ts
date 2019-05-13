import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ControlModel, WritingTestResultAttemptModel, WritingResultModel , MatchModel, SubAttemptModel, WritingPracticeModel, ToneModel, SentenceModel
    } from '@app/dashboard/models';
import { WritingConf } from '@app/core/confs';
import { LocalStorageService, LoadingHandlerService, RouteHandlerService , ErrorHandlerService, UtilService} from '@app/core/services';
import { WritingResultService } from '@app/dashboard/services';
import { takeUntil, finalize} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ErrorModel } from '@app/core/models';
import { DetailPopupComponent } from './components/detail-popup/detail-popup.component';
import { DomSanitizer} from "@angular/platform-browser";
import { forkJoin } from "rxjs/observable/forkJoin";
import { ScrollToService } from 'ng2-scroll-to-el';

@Component({
  selector: 'el-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingResultComponent implements OnInit, OnDestroy{

  constructor(
      private writingResultService : WritingResultService,
      private errorHandlerService: ErrorHandlerService ,
      private route : ActivatedRoute,
      public util : UtilService,
      private domSanitizer : DomSanitizer,
      private scrollService : ScrollToService
    ) { }

  ngUnsubscribe = new Subject();
  writingConf = new WritingConf();

  @Input() attemptId : number;
  @ViewChild('embed') iframe : ElementRef;

  showPopup : boolean;
  time_to_complete : string = null;
  embed_url = null;

  highlights : any = null;
  words : MatchModel[] = [];

  ctl = null;

  ngOnInit() {
      LoadingHandlerService.show();
        this.ctl = {
            text : '',
            count_words : 0,
            match : null,
            tones : [],
            sentiments : null,
            highlights : null,
            practices : [],
            baseline : '',
            sub : null,
            type : null,
            sentence : null,
        }

        const attempt = {
            attempt_id : this.attemptId,
            user_id : LocalStorageService.getUser().id
        }

      this.writingResultService.getResult(attempt)
        .subscribe(
            (result : WritingResultModel) =>
            {
                console.log(result);
                this.ctl.text = result.text;
                //---------------Comprehend & Highlights -----------------------------
                const comprehend = this.writingResultService.getComprehend(this.ctl.text);
                const highlights = this.writingResultService.getHighlights(this.ctl.text);
                forkJoin([comprehend, highlights])
                    .pipe(
                        finalize(()=>LoadingHandlerService.hide()),
                        takeUntil(this.ngUnsubscribe)
                    )
                    .subscribe((res) => {
                    //---------------------set control variable : ctl -------------------------
                        this.ctl.time = result.time;
                        this.ctl.count_words = result.count_words;
                        this.ctl.tones =  JSON.parse(result.tones);
                        this.ctl.practices = result.practices;
                        this.ctl.sentiments = res[0];
                        this.ctl.highlights = res[1];
                        this.ctl.type = 'SentenceNode';
                        this.ctl.sentence = {};
                        this.ctl.sentence['text'] = '';
                        console.log(res);
                        //------------------------------convert matches to display------------------------------
                        const matches = JSON.parse(result.matches);
                        this.format_words_to_display(matches);
                        this.words = this.util.sort(this.words, 'offset', 'ascend');
                        console.log(this.words);
                        //--------------Mode Switch--------------------------------------------------------------------------
                        this.baseline_set(this.writingConf.baseline_titles[0]);
                    });
            },
            (error : ErrorModel) =>
            {
                this.errorHandlerService.showError(error);
            }
        );
  }

  ngOnDestroy()
  {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  word_highlight(baseline : string)
  {
    var result_text = document.getElementById("result_text");
    var highlight_text = this.ctl.text;
    var html_length : number = 0;
    for(var i = 0 ; i < this.words.length ; i++)
    {
        let v = this.writingConf.get_config(this.ctl.baseline, "homophone_toggle", "value");

        if(this.words[i].baseline != baseline)
            continue;
        if(this.words[i].category_id == 'HOMOPHONE' && v)
            continue;

        const issue = this.words[i];
        if(issue.text == "br" || issue.text.search("<") != -1 || issue.text.search(">") != -1)
            continue;

        let one = this.words.filter(res => ((res.offset == issue.offset || this.util.include(res, issue)) && res.baseline == issue.baseline));

        if(one.length > 1 && one[0] != issue)
            continue;
        one = one.filter(res => (!(res.category_id == 'HOMOPHONE' && v)));

        const index = issue.offset + html_length;
        const hl_css : string = 'background : ' + issue.color;
        var plusHTML;
        plusHTML = "<div class='dropdown'><span id=" + i + " class='highlight_word' style = '" + hl_css + "'>" + issue.text + "</span>";
        plusHTML += "<div class='dropdown-content'>";
        for(let item of one)
            plusHTML += "<span id=" + this.words.indexOf(item) + ">" + item.category_id + "</span>";
        plusHTML += "</div></div>";

        highlight_text = highlight_text.substring(0,index) + plusHTML + highlight_text.substring(index + issue.length);
        html_length += plusHTML.length - issue.length;
    }
    result_text.innerHTML = highlight_text;
  }

  sentence_highlight(v, type)
  {
      var result_text = document.getElementById("result_text");
      var highlight_text = this.ctl.text;
      var html_length : number = 0;
      var id = 0;
      var sentences = v.find((res) => res.type == type)['sentences'];
      for(let sentence of sentences)
      {
          const index = sentence.offset + html_length;
          const length = sentence.length;
          const text  = this.ctl.text.slice(sentence.offset, sentence.offset + length);
          const style : string = ' style="background : ' + sentence.color + '"';
          var plusHTML;
          plusHTML = "<span id=" + id + " class='highlight_sentence' " + style + ">" + text + "</span>";
          highlight_text = highlight_text.substring(0,index) + plusHTML + highlight_text.substring(index + length);
          html_length += plusHTML.length - length;
          id += 1;
      }
      result_text.innerHTML = highlight_text;
  }

  baseline_set(baseline : string, sub : string = null, type : string = null)
  {
      if(this.ctl.baseline == baseline && this.ctl.sub == sub)
        return;
      if(this.ctl.baseline)
        this.writingConf.set_config(1, this.ctl.baseline, 'sel_status');
      this.writingConf.set_config(0, baseline, 'sel_status');
      this.ctl.baseline = baseline;
      if(sub)
      {
          this.writingConf.set_config(1, this.ctl.baseline, 'subs', this.ctl.sub, 'style');
          this.ctl.sub = sub;
          this.writingConf.set_config(0, this.ctl.baseline, 'subs', this.ctl.sub, 'style');
      }
      else
          this.ctl.sub = this.writingConf.activated_sub(this.ctl.baseline);

      this.showPopup = this.writingConf.get_config(baseline, 'always_detail_show'), this.embed_url = null;

      if(this.writingConf.show_section(this.ctl.baseline, 'word' , this.ctl.sub))
        this.word_highlight(baseline);
      else
      {
        let k = this.writingConf.get_config(this.ctl.baseline, 'subs', this.ctl.sub, 'value');
        this.sentence_highlight(this.util.json_solver(this.ctl.highlights, k), this.ctl.type);
      }
  }

  format_words_to_display(matches)
  {
      console.log(matches);
      for(let match of matches)
      {
          const item : MatchModel = {
              color : match.color ? match.color : '#55b',
              offset : match.offset,
              length : match.length,
              message : match.rule.category.baseline == 'Writing Clarity'? match.rule.id : match.message,
              rulename_message : match.rulename_message,
              baseline : match.rule.category.baseline,
              id_example : match.rule.category.id_example,
              category_id : match.rule.category.id,
              description : match.rule.category.baseline == 'Writing Clarity' ? match.rule.category.id : match.rule.description,
              text : this.ctl.text.slice(match.offset, match.offset + match.length),
              replacements : match.replacements,
              sentence : match.sentence
          }
          item.replacements = this.util.sort(item.replacements, 'count', 'descend');
          this.words.push(item);
      }
  }

  show_detail(event, element)
  {
      if(this.writingConf.show_section(this.ctl.baseline, 'word' , this.ctl.sub))
      {
            this.ctl.match = this.words[event.target.id];
            if(!this.ctl.match)
            {
                this.showPopup = false;
                return;
            }
            this.scrollService.scrollTo(element, 1000);
      }
      else
      {
            let k = this.writingConf.get_config(this.ctl.baseline, 'subs', this.ctl.sub, 'value');
            let v = this.util.json_solver(this.ctl.highlights, k);
            let s = v.find((res) => res.type == this.ctl.type)['sentences'];
            if(s[event.target.id])
            {
                this.ctl.sentence = s[event.target.id];
                this.ctl.sentence.text = event.target.innerHTML;
                this.scrollService.scrollTo(element, 1000);
            }
      }
      this.showPopup = true;
  }

  embed(url, element) {
    const new_url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    if(new_url !== this.embed_url)
    {
        this.embed_url = new_url;
        this.scrollService.scrollTo(element, 1000);
    }
  }

  category_select(option)
  {
      this.ctl.type = option;
      let k = this.writingConf.get_config(this.ctl.baseline, 'subs', this.ctl.sub, 'value');
      this.sentence_highlight(this.util.json_solver(this.ctl.highlights, k), this.ctl.type);
  }

  on_homonphone()
  {
      let v = !this.writingConf.get_config(this.ctl.baseline, "homophone_toggle", "value");
      this.writingConf.set_config(v, this.ctl.baseline, "homophone_toggle", "value");
      this.word_highlight(this.ctl.baseline);
  }
}
