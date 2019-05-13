import { MatchModel, WritingPracticeModel, ToneModel, SentenceModel} from '@app/dashboard/models';
export interface ControlModel
{
    text : string;
    practices : WritingPracticeModel[];
    tones : ToneModel[];
    baseline : string;
    match : MatchModel;
    sub : string;
    sentence : SentenceModel;
    grade : number;
    type : string;
    sentiments : any;
}
