import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { MaterialDesignModule } from '@app/shared';
import { StatsComponent } from './stats.component';
import { ChartsModule } from 'ng2-charts';
import { AreaComponent } from './area/area.component';
import { WritingComponent } from './writing/writing.component';
import { ChatModule, SpinnerModule } from '@app/primary';
import { ScrollToModule } from 'ng2-scroll-to-el';

// --------------Add Header-------------
@NgModule({
    imports: [
        CommonModule,
        MaterialDesignModule,
        StatsRoutingModule,
        ChartsModule,
        ChatModule,
        SpinnerModule,
        ScrollToModule
    ],
    declarations: [StatsComponent, AreaComponent, WritingComponent],
    exports: [StatsRoutingModule]
})
export class StatsModule
{
}
