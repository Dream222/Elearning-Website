import { Component, ViewChild , OnInit} from '@angular/core';
import { AreaConf } from '@app/core/confs';
import { MdcTab } from '@angular-mdc/web';

@Component({
    selector: 'el-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],

})

export class HeaderComponent implements OnInit
{
    constructor() {}

    showStudentsForm = true;
    switchViews : number;
    areaConf = new AreaConf();

    public images: string[] = [
     'assets/images/home-header-bg.jpg',
     'assets/images/home-header-bg2.png',
    ];

    ngOnInit()
    {
        this.switchViews = 0;
    }

    formChange(data: { index: number, tab: MdcTab })
    {
        this.showStudentsForm = !this.showStudentsForm;
    }

    onSwitch(index : number)
    {
        if(this.switchViews == 0)
        {
            var area = document.getElementById("area");
            area.style.maxHeight = 600 + "px";
        }
        this.switchViews = index;
    }
}
