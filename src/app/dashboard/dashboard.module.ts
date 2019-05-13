import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { QuestionService, StatsService, UserResultService , AdminService , PracticeService, AllQuestionsService, WritingResultService } from '@app/dashboard/services';
import { IsUserHaveAccessGuard } from '@app/dashboard/guards';

import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '@app/shared';
import { EquationModule } from '@app/primary';
import { AllQuestionsComponent } from './modules/all-questions/all-questions.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        EquationModule,
        FormsModule,
        MaterialDesignModule,
        PerfectScrollbarModule
    ],
    exports: [DashboardRoutingModule],
    providers: [
        IsUserHaveAccessGuard,
        QuestionService,
        UserResultService,
        StatsService,
        AdminService,
        PracticeService,
        AllQuestionsService,
        WritingResultService
    ],
    declarations : [
        AllQuestionsComponent
    ]
})
export class DashboardModule
{
}
