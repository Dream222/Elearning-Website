import { UserResultQuestionModel } from './user-result-question.model';

export interface UserResultModel
{
    questions: UserResultQuestionModel[];
    completion_time: string;
    score: number;
    best_score: number;
    area_title: string;
}
