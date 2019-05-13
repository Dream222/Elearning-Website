export class TestConf
{
    tests : any;
    constructor()
    {
        this.tests = [
                {
                    title : 'Full Test',
                    questions : 45,
                    time : 50,
                    type : 'full',
                    disable : 'writing'
                },
                {
                    title : 'Mini Test',
                    questions : 15,
                    time : 17,
                    type : 'mini',
                    disable : 'writing'
                }
        ];
    }
}
