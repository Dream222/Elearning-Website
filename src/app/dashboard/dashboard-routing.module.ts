import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, IsAreaExistsGuard } from '@app/core/guards';
import { IsUserHaveAccessGuard } from '@app/dashboard/guards';

import { AllQuestionsComponent } from '@app/dashboard/modules/all-questions/all-questions.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            { path: 'my-account', loadChildren: './modules/my-account/my-account.module#MyAccountModule' },
            { path: 'admin-panel', loadChildren: './modules/admin-panel/admin-panel.module#AdminPanelModule' },
            { path: 'stats', loadChildren: './modules/stats/stats.module#StatsModule' },
            { path: 'all-questions', component: AllQuestionsComponent},
            {
                path: ':areaTitle',
                canActivate: [IsAreaExistsGuard, IsUserHaveAccessGuard],
                children: [
                    { path: 'instructions', loadChildren: './modules/instructions/instructions.module#InstructionsModule'},
                    { path: 'tests', loadChildren: './modules/tests/tests.module#TestsModule' },
                    { path: 'results', loadChildren : './modules/results/results.module#ResultsModule'},
                    { path:  'tours', loadChildren: './modules/tours/tours.module#ResultsModule'},
                    { path: '', redirectTo: 'instructions', pathMatch: 'full' }
                ]
            },
            { path: '', redirectTo: 'my-account', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule
{
}
