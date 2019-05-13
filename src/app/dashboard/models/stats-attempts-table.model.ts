import { TopicsModel } from "./topics.model";
export interface StatsAttemptsTableModel
{
    id: number;
    area_title : string;
    start_date: Date;
    end_date : Date;
    total_score: number;
    topics : TopicsModel[];
}
