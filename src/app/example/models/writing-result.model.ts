import { SubAttemptModel } from './subattempt.model';
export interface WritingResultModel
{
    id : number;
    text: string;
    html : string;
    matches : any;
    practices : any;
    tones : any;
    time : number;
    count_words: number;
    subattempts : SubAttemptModel[];
}
