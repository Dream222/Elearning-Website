import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats.component';
import { AreaComponent } from './area/area.component';

const routes: Routes = [
    {
        path: '',
        component: StatsComponent
    },
    {
        path: ':id',
        component : StatsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule
{
}
