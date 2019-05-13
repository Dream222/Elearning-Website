import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsComponent } from './components/choose-answer/results.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
    { path: ':attemptId', component: LayoutComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResultsRoutingModule
{
}
