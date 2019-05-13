import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ResultsComponent } from './components/choose-answer/results.component';
import { WritingResultComponent } from './components/writing/writing.component';
import { DetailPopupComponent } from './components/writing/components/detail-popup/detail-popup.component';
import { EquationModule, SelectModule , ChatModule } from '@app/primary';

import { ResultsRoutingModule } from './results-routing.module';
import { MaterialDesignModule } from '@app/shared';
import { ChartsModule } from 'ng2-charts';
import { LayoutComponent } from './components/layout/layout.component';
import { VarDirective } from './components/writing/components/detail-popup/detail-popup.component';
import { SectionComponent } from './components/writing/components/section/section.component';
import { ScrollToModule } from 'ng2-scroll-to-el';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialDesignModule,
        ResultsRoutingModule,
        EquationModule,
        PerfectScrollbarModule,
        ChartsModule,
        SelectModule,
        ChatModule,
        ScrollToModule.forRoot()
    ],
    declarations: [ ResultsComponent, WritingResultComponent, DetailPopupComponent, LayoutComponent, VarDirective, SectionComponent],
    exports: [ResultsRoutingModule]
})
export class ResultsModule
{
}
