export class AreaConf
{
    areas_conf : any;
    areas : any;
    constructor()
    {
        this.areas = ['literacy', 'numeracy', 'writing'];
        this.areas_conf = {
            'literacy' : {
                title : 'Reading',
                image : 'literacy.png',
                default_back_color : 'back-cl-blue',
                default_color : 'cl-blue',
                color : '#5EC8F3',
                topics : [4,5,6],
                buy_now : false
            },
            'numeracy' : {
                title : 'Numeracy',
                image : 'numeracy.png',
                default_back_color : 'back-cl-pink',
                default_color : 'cl-pink',
                color : '#EE2A7B',
                topics : [1,2,3],
                buy_now : false
            },
            'writing' : {
                title : 'Writing',
                image : 'writings.png',
                default_back_color : 'back-cl-yellow',
                color : '#FFCF01',
                default_color : 'cl-pink',
                buy_now : true
            }
        };
    }

    title(areaTitle : string)
    {
        return this.areas_conf[areaTitle].title;
    }

    image(areaTitle : string)
    {
        return 'assets/images/' + this.areas_conf[areaTitle].image;
    }

    background(areaTitle : string)
    {
        return this.areas_conf[areaTitle].default_back_color;
    }

    color(areaTitle : string)
    {
        return this.areas_conf[areaTitle].default_color;
    }

    get_config(area : string, property : string)
    {
        return this.areas_conf[area][property];
    }
}
