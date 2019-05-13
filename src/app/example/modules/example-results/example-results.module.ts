import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '@app/shared';
import { ExampleResultsRoutingModule } from './example-results-routing.module';
import { ExampleChooseResultsComponent } from './components/example-choose-results/example-choose-results.component';
import { LayoutComponent } from './components/layout/layout.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialDesignModule,
        ExampleResultsRoutingModule,
        PerfectScrollbarModule,
        ChartsModule
    ],
    declarations: [ExampleChooseResultsComponent, LayoutComponent],
    exports: [ExampleResultsRoutingModule]
})
export class ExampleResultsModule
{
}
