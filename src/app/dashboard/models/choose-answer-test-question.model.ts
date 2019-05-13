import { AnswerModel } from './answer.model';

export interface ChooseAnswerTestQuestionModel
{
    id: number;
    text: string;
    description: string;
    description_type : string;
    explanation : string;
    was_answered: boolean;
    answers: AnswerModel[];
}
