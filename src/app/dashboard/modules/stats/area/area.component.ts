import { Component, OnInit , Input , OnChanges, SimpleChanges} from '@angular/core';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs/Subject';
import { forkJoin } from "rxjs/observable/forkJoin";
import { finalize, takeUntil } from 'rxjs/operators';
import { StatsService , PracticeService } from '@app/dashboard/services';
import { UtilService, RouteHandlerService, ErrorHandlerService, LoadingHandlerService, LocalStorageService } from '@app/core/services';
import { StatsAttemptsTableModel , UserAverageModel , PracticeModel} from '@app/dashboard/models';
import { TopicConf, AreaConf, StatsChartConf } from '@app/core/confs';
import { ErrorModel } from '@app/core/models';
import { DomSanitizer} from "@angular/platform-browser";
import { ScrollToService } from 'ng2-scroll-to-el';

const total = 45;

@Component({
  selector: 'el-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit , OnChanges {

    constructor( private routeHandlerService: RouteHandlerService,
        private statsService : StatsService,
        private errorHandlerService : ErrorHandlerService,
        private practiceService : PracticeService,
        public util : UtilService,
        private domSanitizer : DomSanitizer,
        private scroll : ScrollToService
    )
    { }

    private ngUnsubscribe = new Subject();

    @Input() area : string;

    topic_conf = new TopicConf();
    area_conf = new AreaConf();
    statschart_conf = new StatsChartConf();

    attempts: StatsAttemptsTableModel[];
    averages : UserAverageModel[];
    practices : PracticeModel[] = null;
    n_question : number = 45;
    embed_url = null;

    myChart : any;
    chart_options : any;
    chart_data : any;
    chart_view : any;

    loading : boolean = false;

  ngOnInit() {}

  ngOnChanges(){

      this.loading = true;

      this.averages = null, this.attempts = null;

      const attempt_request = this.statsService.getAttemptsStats(this.area, 0, 20);
      const practice_request = this.practiceService.getPractice();

      forkJoin([attempt_request, practice_request])
          .pipe(
              finalize(() => this.loading = false),
              takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
              (res) =>
              {
                  console.log(res);
                  this.attempts = res[0].attempts;
                  this.averages = res[0].user_averages;
                  this.practices = res[1].filter(r => {
                      return this.topic_conf.ids(this.area).includes(r.topic_id);
                  });
                  setTimeout(() => this.set_chart(), 500);
              },
              (error: ErrorModel) =>
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

  set_chart()
  {
    if(this.attempts.length == 0)
        return;

    this.chart_options = this.statschart_conf.default_chart_options();
    this.chart_data = this.statschart_conf.default_chart_data();
    this.chart_view = this.statschart_conf.default_chart_view();
    for(let title of this.topic_conf.titles(this.area))
          this.chart_view.labels.push(title);

    for(var i = 0 ; i < this.attempts.length; i++ )
    {
        var item = this.attempts[i];
        this.chart_data.labels.push(i + 1);

        this.chart_data.datasets[0].data.push(this.util.percent(item.total_score, total));
        let k = 0;
        for(let label of this.chart_view.labels)
        {
            this.chart_data.datasets[k].label = label;
            if(k != 0)
            this.chart_data.datasets[k].data.push(this.util.percent(item.topics[k-1].correctly, total/3));
            k++;
        }
    }
    Chart.defaults.global.elements.point.borderColor = '#fff';
    Chart.defaults.global.elements.point.radius = 1;

    this.myChart = new Chart("stats_chart", {
            type: "line",
            data: this.chart_data,
            options: this.chart_options
        });
  }

  viewResults(id: number)
  {
      this.routeHandlerService.testResultPage(this.area, id);
  }

  //-----------------------------on Click Chart Filter Button(update Chart)---------------------
  chart_filter(t : string, n : number)
  {
      this.chart_view[t].statu[n] = !this.chart_view[t].statu[n];
      let v = this.chart_view[t].statu[n];
      if(t == 'highlight')
        this.chart_data.datasets[n].borderWidth =  v ? 7 : 1;
      if(t == 'hide')
        this.chart_data.datasets[n].hidden = v;
      this.myChart.update();
  }

  //----------------------------get percent Score-------------------
  get_score(lv)
  {
      if(this.attempts.length == 0)
          return 0;
      if(lv == 'last')
          return this.attempts[this.attempts.length-1].total_score;
      let v = 0;
      for(let a of this.attempts)
      {
          switch(lv)
          {
              case 'max' : {
                  v = v < a.total_score ? a.total_score : v;
                  break;
              }

              case 'average' : {
                  v += a.total_score;
                  break;
              }

              default : {
                  break;
              }
          }
      }
      v = lv == 'max' ? v : Math.round(v/this.attempts.length);
      return this.util.percent(v, total);
  }

  //--------------------------Average per Topic--------------------
  topic_average(id : number)
  {
      if(this.averages.length)
          return this.averages.find((item : any) => item.id === id).average;
  }

  topic_average_score(id : number)
  {
      var p = this.topic_average(id);
      return Math.round(p * 15);
  }

  topic_average_percent(id : number)
  {
      var p = this.topic_average(id);
      return Math.round(p * 100);
  }

  //------------------------Practice for embed-----------------------
  go_practice(url, element) {
    const new_url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    if(new_url !== this.embed_url)
    {
        this.embed_url = new_url;
        this.scroll.scrollTo(element, 1000);
    }
  }
}
