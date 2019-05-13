import { Component, OnInit } from '@angular/core';
import { StatsService } from '@app/dashboard/services';
import { ErrorHandlerService, LoadingHandlerService, LocalStorageService, RouteHandlerService } from '@app/core/services';
import { Subject } from 'rxjs/Subject';
import { ErrorModel, UserModel } from '@app/core/models';
import { StatsAttemptsTableModel } from '@app/dashboard/models';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'el-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {


    private ngUnsubscribe = new Subject();

    attempts: StatsAttemptsTableModel[] = [];

    stats_account : UserModel;
    topics_title = ["Sub.","Express","Account", "Change Password", "Suspend"];


    constructor(private statsService: StatsService,
                private errorHandlerService: ErrorHandlerService,
                private routeHandlerService: RouteHandlerService) { }



    chart_Options = {
        responsive: true,
        legend : { display  : true,  position : 'right' },
        scales: {
            xAxes: { gridLines: { display:false } },
            yAxes: { gridLines: { display:false } }
        }
    };

    table_chart_data = {
        labels : [],
        datasets: [
            { data: [], label: '',  fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : 'rgb(23,1,98)'    },
            { data: [], label: '',  fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : 'rgb(42,91,121)'  },
            { data: [], label: '',  fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : 'rgb(76,182,229)' },
            { data: [], label: '',  fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : 'rgb(128,198,96)' }
        ]
    };

    myChart : any ;

    ngOnInit() {
        LoadingHandlerService.show();

        this.statsService.getAttempts()
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (attempts: StatsAttemptsTableModel[]) =>
                {
                    this.attempts = attempts;
                    console.log(this.attempts)
                    //------------------Chart Format--------------------------
                    if(this.attempts.length > 0)
                        this.setChartData();
                    var ctx = document.getElementById("stats_chart");
                    /*  this.myChart = new Chart(ctx, {
                          type: "line",
                          data: this.table_chart_data,
                          options: this.chart_Options
                      });*/
                },
                (error: ErrorModel) =>
                {
                    this.errorHandlerService.showError(error);
                }
            );
        //------------------Get Account---------------------
        this.stats_account = LocalStorageService.getUser();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    setChartData() {
        for(var i = 0 ; i < this.attempts.length; i++ )
        {

            this.table_chart_data.labels.push(i + 1);

            this.table_chart_data.datasets[0].label = "Total";
            this.table_chart_data.datasets[0].data.push(Math.round(this.attempts[i].total_score/5*100));

            for( var j = 0 ; j < this.topics_title.length ; j++)
            {
                if(i == 0)
                    this.table_chart_data.datasets[j+1].label = this.topics_title[j];
                this.table_chart_data.datasets[j+1].data.push(Math.round(this.attempts[i].topics[j].correctly/5*100));
            }
        }
    }

}
