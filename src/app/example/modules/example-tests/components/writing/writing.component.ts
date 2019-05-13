import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService, RouteHandlerService , ErrorHandlerService, LoadingHandlerService } from '@app/core/services';
import { ActivatedRoute } from '@angular/router';
import { WritingTestResultModel , WritingTestAttemptModel } from '@app/example/models';
import { WritingResultService } from '@app/example/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ErrorModel } from '@app/core/models';

@Component({
    selector: 'el-writing',
    templateUrl: './writing.component.html',
    styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit , OnDestroy{

    constructor(private route: ActivatedRoute,
                private routeHandlerService: RouteHandlerService,
                private errorHandlerService: ErrorHandlerService,
                private writingResultService : WritingResultService)
    {
    }
    writingResult : WritingTestResultModel;
    areaTitle: string;
    editorText: string;
    editor: any;
    seconds : number = 0;
    minutes : number = 1;
    clockDisplay : string = '';
    interval : any;
    start_time : Date;
    private ngUnsubscribe = new Subject();

    ngOnInit()
    {
        LoadingHandlerService.show();
        var that = this;
        this.editor = CKEDITOR.replace( 'editor',
            {
                enterMode: CKEDITOR.ENTER_BR,
                on: {
                        instanceReady: function( evt ) {
                            LoadingHandlerService.hide();
                            //-----------set Timer----------------
                            that.start_time = new Date();
                            that.seconds = 0;
                            that.minutes = 50;
                        }
                    }
            });
        this.startTimer();
        const params = this.route.snapshot.params;
        if (params.areaTitle)
        {
            this.areaTitle = params.areaTitle;
        }
    }
    onFinish()
    {
        clearInterval(this.interval);
        LoadingHandlerService.show();

        const end_time = new Date();

        const html = this.editor.getData();

        this.writingResult = {
            user_id : LocalStorageService.getUser().id,
            time : end_time.getTime() - this.start_time.getTime(),
            text : CKEDITOR.instances.editor.getData().replace(/\&nbsp;/gi, " "),
            count_words : (CKEDITOR.instances.editor.getData().match(/\S+/g) || []).length
        };
        this.writingResultService.create(this.writingResult)
            .pipe(
                finalize(()=>LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (attempt: WritingTestAttemptModel) =>
                {
                    this.routeHandlerService.testResultPage(this.areaTitle, attempt.attempt_id);
                },
                (error : ErrorModel)=>
                {
                    this.errorHandlerService.showError(error);
                }
            );
    }
    startTimer()
    {
        this.interval = setInterval(()=>{
            this.seconds = this.seconds - 1 ;
            if(this.seconds < 0 && this.minutes >0 )
            {
                this.minutes = this.minutes -1;
                this.seconds = 59;
            }
            this.clockDisplay = (this.minutes < 10) ? ('0' + this.minutes) : this.minutes.toString();
            this.clockDisplay += ' min ';
            this.clockDisplay += (this.seconds < 10) ? ('0' + this.seconds) : this.seconds;
            this.clockDisplay += ' sec ';
            if( this.minutes <= 0 && this.seconds <= 0)
                this.onFinish();
        },1000);
    }
    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
