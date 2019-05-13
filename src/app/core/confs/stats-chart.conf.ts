export class StatsChartConf
{
    default_chart_view()
    {
        return {
            types : ['highlight', 'hide'],
            labels : ['Total'],
            highlight :
            {
                text : 'HIGHLIGHT',
                statu : [false,false,false,false]
            },
            hide :
            {
                text : 'HIDE',
                statu : [false,false,false,false]
            }
        };
    }

    default_chart_data ()
    {
        return {
           labels : [0],
           datasets: [
                { data: [0], label: '0', hidden : false, fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : '#EE2A7B'},
                { data: [0], label: '0', hidden : false, fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : '#00AC4E'},
                { data: [0], label: '0', hidden : false, fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : '#5EC8F3'},
                { data: [0], label: '0', hidden : false, fill: false, lineTension: 0 ,  borderWidth : 1, borderColor : '#FFCF01'}
            ]
        };
    }

    default_chart_options()
    {
        return {
            responsive: true,
            legend :{ display  : false, position : 'top' , labels : { fontColor : 'rgb(0,0,0)' }},
            scales:  {
                xAxes: [{ ticks: { min: 0 },gridLines: { display:false } }],
                yAxes: [{ ticks: { min: 0,  max: 100, stepSize: 10},gridLines: { display:false } } ]
            }
        };
    }
}
