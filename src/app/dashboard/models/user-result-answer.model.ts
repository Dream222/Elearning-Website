export interface UserResultAnswerModel
{
    id: number;
    text: string;
    description: string;
    question_id: number;
    is_correct: boolean;
    is_user_answer: boolean;
}
