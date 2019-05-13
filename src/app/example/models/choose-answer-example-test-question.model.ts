import { ExampleTestAnswerModel } from './example-test-answer.model';

export interface ChooseAnswerExampleTestQuestionModel
{
    id: number;
    text: string;
    description: string;
    was_answered: boolean;
    answers: ExampleTestAnswerModel[];
}
