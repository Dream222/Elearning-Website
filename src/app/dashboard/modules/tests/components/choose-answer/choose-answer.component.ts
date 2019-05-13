import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import {AnswerModel,ChooseAnswerTestQuestionModel,UserAttemptModel,UserResultCreateModel} from '@app/dashboard/models';
import { ErrorModel } from '@app/core/models';
import { ErrorHandlerService, LoadingHandlerService, RouteHandlerService, UtilService } from '@app/core/services';
import { QuestionService, UserResultService } from '@app/dashboard/services';
import { ViewChild } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '@app/primary/modal/components';
import { TestConf } from '@app/core/confs';

@Component({
    selector: 'el-choose-answer',
    templateUrl: './choose-answer.component.html',
    styleUrls: ['./choose-answer.component.scss']
})
export class ChooseAnswerComponent implements OnInit, OnDestroy{
    private ngUnsubscribe = new Subject();

    questions: ChooseAnswerTestQuestionModel[] = [];
    currentQuestion: ChooseAnswerTestQuestionModel;

    answers: AnswerModel[] = [];
    choosedAnswer: AnswerModel = null;

    startDate: Date;
    seconds = 0;
    minutes = 50;
    clockDisplay : string;
    interval : any;
    test_conf = new TestConf();

    @Input() areaTitle: string;

    img_url = "http://ec2-18-219-12-62.us-east-2.compute.amazonaws.com:8081/images";

    @ViewChild(PerfectScrollbarComponent) componentScroll: PerfectScrollbarComponent;

    constructor(private route: ActivatedRoute,
                private routeHandlerService: RouteHandlerService,
                private questionService: QuestionService,
                private userResultService: UserResultService,
                private errorHandlerService: ErrorHandlerService,
                public util : UtilService,
                public dialog : MatDialog)
    {
    }

    ngOnInit()
    {
        LoadingHandlerService.show();

        let t = localStorage.getItem('type');
        let n = this.test_conf.tests.find(r => r.type == t).questions;

        this.questionService.get(this.areaTitle, n/3)
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (questions: ChooseAnswerTestQuestionModel[]) =>
                {
                    questions = this.util.sort(questions, 'id', 'ascend');
                    this.questions = questions;
                    this.currentQuestion = this.questions[0];
                    this.startDate = new Date();
                    this.minutes = this.test_conf.tests.find(r => r.type == t).time;
                    this.interval = setInterval(()=>{
                        this.seconds = this.seconds - 1 ;
                        if( this.minutes <= 0 && this.seconds < 0)
                            this.endTest();
                        if(this.seconds < 0 && this.minutes >0 )
                        {
                            this.minutes = this.minutes -1;
                            this.seconds = 59;
                        }
                        if(this.minutes < 10)
                            this.clockDisplay = '0' + this.minutes + ' min ';
                        else
                            this.clockDisplay = this.minutes + ' : ';
                        if(this.seconds < 10)
                            this.clockDisplay = this.clockDisplay + '0' + this.seconds;
                        else
                            this.clockDisplay = this.clockDisplay + this.seconds;
                    },1000);
                }
            );
    }

    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeAnswer(answer: AnswerModel)
    {
        this.choosedAnswer = answer;
    }

    changeQuestion(question: ChooseAnswerTestQuestionModel)
    {
        this.currentQuestion = question;

        if (this.currentQuestion.was_answered)
        {
            this.choosedAnswer = this.answers.find((answer: AnswerModel) => answer.question_id === this.currentQuestion.id);
        }
        else
        {
            this.choosedAnswer = null;
        }
    }

    getCurrentQuestionIndex(): number
    {
        return this.questions.indexOf(this.currentQuestion) + 1;
    }

    nextQuestion()
    {
        if (!this.choosedAnswer)
        {
            return;
        }

        this.updateAnswersList();

        if (this.answers.length < this.questions.length)
        {
            if(this.getCurrentQuestionIndex() >= this.questions.length)
                this.currentQuestion = this.questions.find((question: ChooseAnswerTestQuestionModel) => question.was_answered === false);
            else
            {
                var currentIndex = this.getCurrentQuestionIndex();
                while(this.questions[currentIndex].was_answered)
                {
                    currentIndex ++;
                    if(currentIndex >= this.questions.length - 1)
                        currentIndex = 0;
                    if(currentIndex == this.getCurrentQuestionIndex() - 1)
                        this.endTest();
                }
                this.currentQuestion = this.questions[currentIndex];
            }
        }
        else
            this.submit();

        var p_unit = document.body.querySelector('mdc-list-item').clientHeight;
        this.componentScroll.directiveRef.scrollToY(p_unit*(this.getCurrentQuestionIndex()-1), 800*(this.questions.length - this.getCurrentQuestionIndex())/this.questions.length);
    }

    endTest()
    {
        clearInterval(this.interval);
        LoadingHandlerService.show();
        const result: UserResultCreateModel = {
            area_title: this.areaTitle,
            start_date: this.startDate,
            end_date: new Date(),
            answers: this.answers
        };
        console.log(result);
        this.userResultService.create(result)
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (attempt: UserAttemptModel) =>
                {
                    this.routeHandlerService.testResultPage(this.areaTitle, attempt.id);
                },
                (error: ErrorModel) =>
                {
                    this.errorHandlerService.showError(error);
                }
            );
    }

    private updateAnswersList()
    {
        if (!this.currentQuestion.was_answered)
        {
            this.answers.push(this.choosedAnswer);
        }
        else
        {
            const index = this.answers
                .findIndex((answer: AnswerModel) => answer.question_id === this.currentQuestion.id);

            if (index >= 0)
            {
                this.answers[index] = this.choosedAnswer;
            }
        }

        this.choosedAnswer = null;
        this.currentQuestion.was_answered = true;
    }

    submit()
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
}
