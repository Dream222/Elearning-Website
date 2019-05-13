import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { forkJoin } from "rxjs/observable/forkJoin";

import { UserResultService, StatsService, PracticeService } from '@app/dashboard/services';
import { UtilService, ErrorHandlerService, LoadingHandlerService } from '@app/core/services';

import { ErrorModel } from '@app/core/models';
import { UserResultAnswerModel, UserResultModel, UserResultQuestionModel , UserAverageModel, PracticeModel} from '@app/dashboard/models';
import { TopicConf, AreaConf } from '@app/core/confs';

@Component({
    selector: 'el-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy
{
    private ngUnsubscribe = new Subject();

    @Input() attemptId: number;
    @Input() area : string;

    countId : number;

    result: UserResultModel;

    currentQuestion: UserResultQuestionModel;

    practices : PracticeModel[];

    topic_conf = new  TopicConf();
    area_conf = new AreaConf();

    averages : any = [];


    constructor(private route: ActivatedRoute,
                private userResultService: UserResultService,
                private statsService : StatsService,
                private errorHandlerService: ErrorHandlerService,
                private practiceService : PracticeService,
                public util : UtilService )
    {
    }

    ngOnInit()
    {
        LoadingHandlerService.show();
        this.result = {
            questions : [],
            completion_time : "",
            score : 0,
            best_score : 0,
            area_title : ''
        };

        if (this.attemptId)
        {
            const result = this.userResultService.getResults(this.attemptId);
            const average = this.statsService.getAttemptsStats(this.area, 0, 1);
            const practice = this.practiceService.getPractice();

            forkJoin([result, average, practice])
                .pipe(
                    finalize(() => LoadingHandlerService.hide()),
                    takeUntil(this.ngUnsubscribe)
                )
                .subscribe(
                    (res)=>
                    {
                        console.log(res);
                        this.result = res[0];
                        this.averages = res[1].user_averages;
                        this.practices = res[2];
                        this.currentQuestion = this.result.questions[0];
                        for(let item of this.result.questions)
                        {
                            if(item.was_answered_correctly)
                                this.topic_conf.set_score(item.categories[0].id, this.topic_conf.get_score(item.categories[0].id) + 1);
                        }
                    },
                    (error: ErrorModel) =>
                    {
                        this.errorHandlerService.showError(error);
                    }
                );
        }
    }

    ngOnDestroy()
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    getCurrentQuestionIndex(): number
    {
        return this.result.questions.indexOf(this.currentQuestion) + 1;
    }

    changeQuestion(question: UserResultQuestionModel)
    {
        this.currentQuestion = question;
    }

    nextQuestion()
    {
        if (this.currentQuestion.id !== this.result.questions[this.result.questions.length - 1].id)
        {
            this.currentQuestion = this.result.questions[this.getCurrentQuestionIndex()];
        }
    }

    getCorrectAnswerForCurrentQuestion(): UserResultAnswerModel
    {
        return this.currentQuestion.answers.find((answer: UserResultAnswerModel) => answer.is_correct);
    }

    getCorrectAnswerIndexForCurrentQuestion()
    {
        for(var i = 0 ; i < this.currentQuestion.answers.length ; i ++)
        {
            if(this.currentQuestion.answers[i].is_correct)
                return i + 1;
        }
        return 0;
    }

    //----------------------------calculate percente--------------
    topic_average(id : number)
    {
        if(this.averages.length)
            return this.averages.find((item) => item.id === id).average;
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
}
