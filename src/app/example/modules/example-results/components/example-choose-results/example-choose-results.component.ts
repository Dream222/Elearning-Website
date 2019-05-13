import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService, RouteHandlerService } from '@app/core/services';

import { ExampleTestAnswerModel, ChooseAnswerExampleTestQuestionModel } from '@app/example/models';

@Component({
  selector: 'el-example-choose-results',
  templateUrl: './example-choose-results.component.html',
  styleUrls: ['./example-choose-results.component.scss']
})
export class ExampleChooseResultsComponent implements OnInit,OnDestroy
{
    areaTitle: string;

    answers: { question: ChooseAnswerExampleTestQuestionModel, answer: ExampleTestAnswerModel }[] = [];
    correctAnswers: ExampleTestAnswerModel[] = [];
    userCorrectAnswersCount = 0;
    currentQuestion: ChooseAnswerExampleTestQuestionModel;
    currentQuestionIndex: number;
    timeToComplete: any = {};

    constructor(private route: ActivatedRoute,
                private routeHandlerService: RouteHandlerService)
    {
    }

    ngOnInit()
    {
        const params = this.route.snapshot.params;

        if (params.areaTitle)
        {
            this.answers = LocalStorageService.getExampleAnswers();

            if (!this.answers)
            {
                this.routeHandlerService.startExampleTestPage(params.areaTitle);
            }
            else
            {
                this.areaTitle = params.areaTitle;
                this.currentQuestion = this.answers[0].question;
                this.currentQuestionIndex = 1;
                this.getTimeToComplete();
                this.getCorrectAnswers();
            }
        }
        else
        {
            this.routeHandlerService.homePage();
        }
    }

    private getTimeToComplete()
    {
        let secondsBetweenDates = LocalStorageService.get('secondsBetweenDates');
        secondsBetweenDates = Number(secondsBetweenDates);

        const h = Math.floor(secondsBetweenDates / 3600);
        const m = Math.floor(secondsBetweenDates % 3600 / 60);
        const s = Math.floor(secondsBetweenDates % 3600 % 60);

        if (h > 0 && h < 10)
        {
            this.timeToComplete.h = '0' + h + ':';
        }
        else
        {
            if (h >= 10)
            {
                this.timeToComplete.h = h + ':';
            }
            else
            {
                this.timeToComplete.h = '';
            }
        }

        if (m > 0 && m < 10)
        {
            this.timeToComplete.m = '0' + m + ':';
        }
        else
        {
            if (m >= 10)
            {
                this.timeToComplete.m = m + ':';
            }
            else
            {
                this.timeToComplete.m = '00:';
            }
        }

        if (s > 0 && s < 10)
        {
            this.timeToComplete.s = '0' + s;
        }
        else
        {
            if (s >= 10)
            {
                this.timeToComplete.s = s;
            }
            else
            {
                this.timeToComplete.s = '00';
            }
        }
    }

    private getCorrectAnswers()
    {
        for (let i = 0; i < this.answers.length; i++)
        {
            this.correctAnswers.push(this.answers[i].question.answers[this.randomInteger(0, this.answers[i].question.answers.length - 1)]);

            if (this.correctAnswers[i].id === this.answers[i].answer.id)
            {
                this.userCorrectAnswersCount++;
            }
        }
    }

    private randomInteger(min: number, max: number): number
    {
        let rand = min - 0.5 + Math.random() * (
            max - min + 1
        );
        rand = Math.round(rand);

        return rand;
    }

    nextQuestion()
    {
        if (this.currentQuestionIndex + 1 <= this.answers.length)
        {
            this.currentQuestion = this.answers[this.currentQuestionIndex].question;
            this.currentQuestionIndex++;
        }
    }

    ngOnDestroy()
    {
        LocalStorageService.remove('secondsBetweenDates');
        LocalStorageService.removeExampleAnswers();
    }
}
