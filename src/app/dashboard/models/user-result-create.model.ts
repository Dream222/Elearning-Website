import { AnswerModel } from './answer.model';

export interface UserResultCreateModel
{
    area_title: string;
    start_date: Date;
    end_date: Date;
    answers: AnswerModel[];
}
