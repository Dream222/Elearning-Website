import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import {
    AnswerModel,
    ChooseAnswerTestQuestionModel,
    UserAttemptModel,
    UserResultCreateModel
} from '@app/dashboard/models';
import { ErrorModel } from '@app/core/models';

import { ErrorHandlerService, LoadingHandlerService, RouteHandlerService } from '@app/core/services';
import { AllQuestionsService, UserResultService } from '@app/dashboard/services';
import { ViewChild } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'el-all-questions',
    templateUrl: './all-questions.component.html',
    styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit, OnDestroy
{
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

    areaTitle: string;

    img_url = "http://ec2-18-219-12-62.us-east-2.compute.amazonaws.com:8081/images";

    @ViewChild(PerfectScrollbarComponent) componentScroll: PerfectScrollbarComponent;

    constructor(private route: ActivatedRoute,
                private routeHandlerService: RouteHandlerService,
                private questionService: AllQuestionsService,
                private userResultService: UserResultService,
                private errorHandlerService: ErrorHandlerService)
    {
    }

    ngOnInit()
    {
        LoadingHandlerService.show();

        const params = this.route.snapshot.params;

        if (params.areaTitle)
        {
            this.areaTitle = params.areaTitle;
        }

        this.questionService.get()
            .pipe(
                finalize(() => LoadingHandlerService.hide()),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(
                (questions: any) =>
                {
                    questions.sort(function(i1,i2){
                        if(i1.id > i2.id)
                            return 1;
                        else if(i1.id < i2.id)
                            return -1;
                        else
                            return 0;
                    });
                    this.questions = questions;
                    this.currentQuestion = this.questions[0];
                    this.startDate = new Date();
                    console.log(questions);
                }
            );

        this.interval = setInterval(()=>{
            this.seconds = this.seconds - 1 ;
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

            if( this.minutes <= 0 && this.seconds <= 0)
                this.endTest();
        },1000);
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
            this.endTest();

        var p_unit = document.body.querySelector('mdc-list-item').clientHeight;
        this.componentScroll.directiveRef.scrollToY(p_unit*(this.getCurrentQuestionIndex()-1), 800*(this.questions.length - this.getCurrentQuestionIndex())/this.questions.length);
    }

    endTest()
    {
        clearInterval(this.interval);
        this.routeHandlerService.myAccountPage();
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
}
