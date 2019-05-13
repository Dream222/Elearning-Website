import { UserResultAnswerModel } from './user-result-answer.model';
import { UserResultQuestionCategoryModel } from './user-result-question-category.model';

export interface UserResultQuestionModel
{
    id: number;
    text: string;
    description: string;
    // description_type : string;
    was_answered_correctly: boolean;
    categories: UserResultQuestionCategoryModel[]
    answers: UserResultAnswerModel[];
}
