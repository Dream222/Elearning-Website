import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquationModule, ModalModule } from '@app/primary';
import { MaterialDesignModule } from '@app/shared';
import { TestsRoutingModule } from './tests-routing.module';
import { ChooseAnswerComponent, LayoutComponent, WritingComponent } from './components';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ScrollToModule } from 'ng2-scroll-to-el';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialDesignModule,
        TestsRoutingModule,
        EquationModule,
        PerfectScrollbarModule,
        ScrollToModule.forRoot(),
        ModalModule
    ],
    declarations: [
        LayoutComponent,
        ChooseAnswerComponent,
        WritingComponent
    ],
    exports: [TestsRoutingModule]
})
export class TestsModule
{
}
