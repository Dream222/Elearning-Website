export class WritingConf
{
    baselines : any;
    sel_status : any;
    baseline_titles : any;
    btn_style_word_common : any;

    constructor(){
        this.baseline_titles = ['Spelling & Grammar', 'Structure & Rhythm', 'Writing Clarity'];
        this.baselines = {
            'Spelling & Grammar' : {
                title : 'Spelling & Grammar',
                images : ['assets/images/writing/spelling1.png', 'assets/images/writing/spelling2.png'],
                sel_status : 0,
                highlight_style : 'hl-sp',
                always_detail_show : false,
                word : [
                    {
                        text : 'very common word',
                        type : 'static',
                        value : 'very common',
                        class : 'cl-green'
                    },
                    {
                        text : 'common word',
                        type : 'static',
                        value : 'common',
                        class : 'cl-blue'
                    },
                    {
                        text : 'uncommon word',
                        type : 'static',
                        value : 'uncommon',
                        class : 'cl-pink'
                    }
                ],
                replacement : true,
                homophone_toggle : {
                    text : ['Show Homonphone', 'Hide Homonphone'],
                    type : 'toggle',
                    value : true
                },
                dictionary : true,
                practice : true
            },
            'Structure & Rhythm' : {
                title : 'Structure & Rhythm',
                images : ['assets/images/writing/grammar1.png','assets/images/writing/grammar2.png'],
                sel_status : 1,
                always_detail_show : true,
                highlight_style : 'hl-gr',
                types : [
                    {
                        text : 'View by sentence',
                        type : 'static',
                        value : 'SentenceNode'
                    },
                    {
                        text : 'View by paragraph',
                        type : 'static',
                        value : 'ParagraphNode'
                    }
                ],
                target : [
                    {
                        text : 'Complex - above target age',
                        type : 'static',
                        value : 'complex',
                        style : {
                            'background' : '#2ca9c4'
                        }
                    },
                    {
                        text : 'Simple - below target age',
                        type : 'static',
                        value : 'simple',
                        style : {
                            "background" : "#930000"
                        }
                    },
                    {
                        text : 'Correct - correct target age',
                        type : 'static',
                        value : 'correct',
                        style : {
                            "background" : "#3cb878"
                        }
                    }
                ],
                subs : {
                    sub_titles : ['Structure', 'Rhythm', 'Readability'],
                    styles : [['back-cl-primary', 'cl-white'], ['back-cl-light-blue', 'cl-black']],
                    'Structure' : {
                        style : 0,
                        value : ['highlights', 'readability'],
                        structure : [
                            {
                                text : 'Number of Sentences:',
                                type : 'dynamic',
                                value : ['sentences'],
                                tag : ' sentence'
                            },
                            {
                                text : 'Average Sentence Length:',
                                type : 'dynamic',
                                value : ['averageSentences'],
                                tag : ' word'
                            },
                            {
                                text : 'Number of Paragraphs:',
                                type : 'dynamic',
                                value : ['paragraphs'],
                                tag : ' paragraph'
                            },
                            {
                                text : 'Average Paragraph Length:',
                                type : 'dynamic',
                                value : ['averageParagraphs'],
                                tag : ' word'
                            }
                        ],
                    },
                    'Rhythm' : {
                        style : 1,
                        rhythm : true,
                        value : ['highlights', 'rhythm'],
                        sentence_breakdown : [
                            {
                                text : 'short sentences : ',
                                type : 'dynamic',
                                value : ['symbols', 'count', 'short'],
                                style : {
                                    'background' : '#fdb5fd'
                                }
                            },
                            {
                                text : 'medium sentences : ',
                                type : 'dynamic',
                                value : ['symbols', 'count', 'medium'],
                                style : {
                                    'background' : '#b5fdfd'
                                }
                            },
                            {
                                text : 'long sentences : ',
                                type : 'dynamic',
                                value : ['symbols', 'count', 'long'],
                                style : {
                                    'background' : '#fdfdb5'
                                }
                            }
                        ]
                    },
                    'Readability' : {
                        style : 1,
                        value : ['highlights', 'readability'],
                        readability : true,
                        ages : [
                            {
                                text : 'View by age 9',
                                type : 'static',
                                value : '9'
                            },
                            {
                                text : 'View by age 10',
                                type : 'static',
                                value : '10'
                            },
                            {
                                text : 'View by age 11',
                                type : 'static',
                                value : '11'
                            },
                            {
                                text : 'View by age 12',
                                type : 'static',
                                value : '12'
                            },
                            {
                                text : 'View by age 13',
                                type : 'static',
                                value : '13'
                            },
                        ],
                        reading_level : [
                            {
                                text : 'Grade ',
                                type : 'dynamic',
                                value : ['grade']
                            }
                        ]
                    }
                },
            },
            'Writing Clarity' : {
                title : 'Writing Clarity',
                images : ['assets/images/writing/clarify1.png','assets/images/writing/clarify2.png'],
                sel_status : 1,
                highlight_style : 'hl-wc',
                word : true,
                replacement : false,
                always_detail_show : false,
                writing_analysis : {
                    tones : {
                        text : '',
                        type : 'dynamic',
                        value : ['document_tone', 'tones']
                    },
                    tone_description : {
                        text : '',
                        type : 'dynamic',
                        value : ['document_tone', 'tones', '0']
                    },
                    sentiments : [
                        {
                            text : 'Positive',
                            type : 'dynamic',
                            value : ['sentiment', '0', 'SentimentScore', 'Positive']
                        },
                        {
                            text : 'Negative',
                            type : 'dynamic',
                            value : ['sentiment', '0', 'SentimentScore', 'Negative']
                        },
                        {
                            text : 'Neutral',
                            type : 'dynamic',
                            value : ['sentiment', '0', 'SentimentScore', 'Neutral']
                        },
                        {
                            text : 'Mixed',
                            type : 'dynamic',
                            value : ['sentiment', '0', 'SentimentScore', 'Mixed']
                        }
                    ],
                    sentiments_description :{
                        text : '',
                        type : 'dynamic',
                        value : ['sentiment', '0', 'description']
                    }
                },
            }
        };
        this.sel_status = [ ["back-cl-primary", "cl-white"], ["back-cl-white", "cl-black"] ];
    }
    get_config(baseline : string, config : string, sub : string = null, sub_config : string = null)
    {
        if(!baseline || !this.baselines[baseline].hasOwnProperty(config))
            return false;
        const property = this.baselines[baseline][config];
        if(!sub)
            return property;
        if(!property.hasOwnProperty(sub))
            return false;
        const sub_property = property[sub];
        if(sub_config == null)
            return sub_property;
        if(!sub_property.hasOwnProperty(sub_config))
            return false;
        return sub_property[sub_config];
    }
    set_config(value : any, baseline : string, config : string, sub : string = null, sub_config : string = null)
    {
        if(!baseline || !this.baselines[baseline].hasOwnProperty(config))
            return;
        let property = this.baselines[baseline][config];
        if(sub == null)
            this.baselines[baseline][config] = value;
        if(!property.hasOwnProperty(sub))
            return;
        let sub_property = this.baselines[baseline][config][sub];
        if(sub_config == null)
            this.baselines[baseline][config][sub] = value;
        if(!sub_property.hasOwnProperty(sub_config))
            return;
        this.baselines[baseline][config][sub][sub_config] = value;
    }
    show_section(baseline : string, section : string, sub : string = null)
    {
        if(sub)
            return this.get_config(baseline, 'subs', sub, section);
        return this.get_config(baseline, section);
    }

    image(baseline : string)
    {
        return this.get_config(baseline, 'images')[this.get_config(baseline,'sel_status')];
    }

    baseline_style(baseline : string )
    {
        return this.sel_status[this.get_config(baseline, 'sel_status')];
    }

    sub_style(baseline : string, sub : string)
    {
        const style =  this.get_config(baseline, 'subs', sub, 'style');
        return this.get_config(baseline, 'subs', 'styles', style);
    }

    activated_sub(baseline : string)
    {
        for ( let sub of this.get_config(baseline, 'subs', 'sub_titles'))
            if(this.get_config(baseline,'subs', sub, 'style') == 0)
                return sub;
        return null;
    }
}
