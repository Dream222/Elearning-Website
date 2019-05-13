import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService, RouteHandlerService , ErrorHandlerService, LoadingHandlerService } from '@app/core/services';
import { WritingTestResultModel , WritingTestAttemptModel, WritingQuestionModel } from '@app/dashboard/models';
import { WritingResultService, QuestionService } from '@app/dashboard/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ErrorModel } from '@app/core/models';
import { TestConf } from '@app/core/confs';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '@app/primary/modal/components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'el-writing',
    templateUrl: './writing.component.html',
    styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit , OnDestroy{

    constructor(private routeHandlerService: RouteHandlerService,
                private errorHandlerService: ErrorHandlerService,
                private writingResultService : WritingResultService,
                private questionService : QuestionService,
                private router : Router,
                public dialog : MatDialog)
    {
    }
    private ngUnsubscribe = new Subject();
    writingResult : WritingTestResultModel;
    question : WritingQuestionModel;
    areaTitle: string = 'writing';
    editorText: string;
    editor: any;
    seconds : number = 0;
    minutes : number = 1;
    clockDisplay : string = '';
    interval : any;
    start_time : Date;
    test_conf = new TestConf();

    ngOnInit()
    {
        LoadingHandlerService.show();
        let that = this;
        let t = localStorage.getItem('type');

        this.questionService.getWritingQuestion()
            .subscribe(
                (res : WritingQuestionModel) =>
                {
                    this.editor = CKEDITOR.replace( 'editor',
                        {
                            enterMode: CKEDITOR.ENTER_BR,
                            on: {
                                    instanceReady: function( evt ) {
                                        LoadingHandlerService.hide();
                                        //-----------set Timer----------------
                                        that.start_time = new Date();
                                        that.seconds = 0;
                                        that.minutes = that.test_conf.tests.find(r => r.type == t).time;
                                    }
                                }
                        });
                    this.startTimer();
                    this.question = res;
                }
            );
    }
    onSubmit()
    {
        const dialogRef = this.dialog.open(ConfirmModalComponent, { panelClass: 'confirm'});
        dialogRef.afterClosed()
        .subscribe(result => {
            if(result)
                this.endTest();
            else
                return;
        });
    }

    endTest()
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
                    console.log(this.areaTitle)
                    this.router.navigate(['/dashboard/writing/tours/'+attempt.attempt_id]);
                    // this.routeHandlerService.testResultPage(this.areaTitle, attempt.attempt_id);
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
                this.endTest();
        },1000);
    }
    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
