import { Component, OnInit , HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExampleTestAnswerModel, ChooseAnswerExampleTestQuestionModel } from '@app/example/models';

import { LocalStorageService, RouteHandlerService } from '@app/core/services';
import { AnswerModel } from '@app/dashboard/models';

@Component({
    selector: 'el-choose-answer',
    templateUrl: './choose-answer.component.html',
    styleUrls: ['./choose-answer.component.scss']
})
export class ChooseAnswerComponent implements OnInit
{
    questions: ChooseAnswerExampleTestQuestionModel[] = [];
    currentQuestion: ChooseAnswerExampleTestQuestionModel;

    answers: { question: ChooseAnswerExampleTestQuestionModel, answer: ExampleTestAnswerModel }[] = [];
    choosedAnswer: ExampleTestAnswerModel;

    startDate: Date;

    areaTitle: string;

    showType : boolean;

    constructor(private route: ActivatedRoute,
                private routeHandlerService: RouteHandlerService)
    {
    }

    ngOnInit()
    {
        LocalStorageService.remove('secondsBetweenDates');
        LocalStorageService.removeExampleAnswers();

        const params = this.route.snapshot.params;

        if (params.areaTitle)
        {
            this.areaTitle = params.areaTitle;
        }

        for (let i = 0; i < 5; i++)
        {
            const answers: ExampleTestAnswerModel[] = [];

            for (let j = 0; j < this.randomInteger(2, 4); j++)
            {
                const answerModel: ExampleTestAnswerModel = { id: j, text: 'Answer ' + j };
                answers.push(answerModel);
            }

            const text = 'Question ' + (
                i + 1
            );
            const description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy ' +
                'nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ' +
                'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis ';
            const questionModel: ChooseAnswerExampleTestQuestionModel = {
                id: i,
                text: text,
                description: description,
                was_answered: false,
                answers: answers
            };
            this.questions.push(questionModel);
        }

        this.currentQuestion = this.questions[0];
        this.startDate = new Date();

        this.showType = false;
        if(window.screen.width < 840)
            this.showType = true;
    }

    private randomInteger(min: number, max: number): number
    {
        let rand = min - 0.5 + Math.random() * (
            max - min + 1
        );
        rand = Math.round(rand);

        return rand;
    }

    changeAnswer(answer: ExampleTestAnswerModel)
    {
        this.choosedAnswer = answer;
    }

    changeQuestion(question: ChooseAnswerExampleTestQuestionModel)
    {
        this.currentQuestion = question;

        if (this.currentQuestion.was_answered)
        {
            this.choosedAnswer = this.answers.find((answer) => answer.question.id === this.currentQuestion.id).answer;
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
            this.currentQuestion = this.questions.find((question: ChooseAnswerExampleTestQuestionModel) => question.was_answered === false);
        }
        else
        {
            this.getTimeTookedToComplete();
            LocalStorageService.setExampleAnswers(this.answers);
            this.routeHandlerService.exampleTestResultPage(this.areaTitle);
        }
    }

    private updateAnswersList()
    {
        if (!this.currentQuestion.was_answered)
        {
            this.answers.push({
                question: this.currentQuestion,
                answer: this.choosedAnswer
            });
        }
        else
        {
            const index = this.answers.findIndex((answer) => answer.question.id === this.currentQuestion.id);

            if (index >= 0)
            {
                this.answers[index].answer = this.choosedAnswer;
            }
        }

        this.choosedAnswer = null;
        this.currentQuestion.was_answered = true;
    }

    private getTimeTookedToComplete()
    {
        const now = new Date();
        const diff = now.getTime() - this.startDate.getTime();
        const secondsBetweenDates = Math.abs(diff / 1000);
        LocalStorageService.set('secondsBetweenDates', secondsBetweenDates);
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event){
       if(event.target.innerWidth <= 840)
       {
           this.showType = true;
       }
       else
            this.showType = false;
    }

}
