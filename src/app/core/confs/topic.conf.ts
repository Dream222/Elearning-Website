export class TopicConf
{
    topics : any;
    topics_id : any;
    constructor()
    {
        this.topics = [
            {
                id : 6,
                title : "Complexity and Purpose of Text",
                img : "assets/images/literacy/team.png",
                score : 0
            },
            {
                id : 5,
                title : "Vocabulary, Syntax & Language Patterns",
                img : "assets/images/literacy/contract.png",
                score : 0
            },
            {
                id : 4,
                title : "Text Analysis & Critical Reading",
                img : "assets/images/literacy/search.png",
                score : 0
            },
            {
                id : 1,
                title : "Probability & Statistics",
                img : "assets/images/numeracy/stats.png",
                score : 0
            },
            {
                id : 2,
                title : "Algebra & Number",
                img : "assets/images/numeracy/scale.png",
                score : 0
            },
            {
                id : 3,
                title : "Measurement & Geometry",
                img : "assets/images/numeracy/calculator.png",
                score : 0
            }
        ]


        this.topics_id =
        {
            "literacy" : [4,5,6],
            "numeracy" : [1,2,3]
        };

    }

    topic(id : number)
    {
        return this.topics.find((topic : any) =>topic.id === id);
    }

    ids(area_title : string)
    {
        return this.topics_id[area_title];
    }

    contains(area_title : string, topic_id : number)
    {
        if(!this.ids(area_title))
            return false;
        if( this.ids(area_title).indexOf(topic_id) != -1)
            return true;
        else
            return false;
    }

    title(id : number)
    {
        return this.topic(id).title;
    }

    titles(area_title : string)
    {
        var titles = [];
        for(var i of this.topics_id[area_title])
        {
            titles.push(this.title(i));
        }
        return titles;
    }
    img(id : number)
    {
        return this.topic(id).img;
    }
    set_score(id : number, score : number)
    {
        this.topic(id).score = score;
    }
    get_score(id : number)
    {
        return this.topic(id).score;
    }
}
