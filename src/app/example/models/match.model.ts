export interface replacement
{
    value : string;
    count : number;
}

export interface MatchModel
{
    baseline : string;
    message : string;
    description : string;
    offset : number;
    length : number;
    rulename_message : string;
    id_example : string;
    category_id : string;
    replacements : replacement[];
    text : string;
}
