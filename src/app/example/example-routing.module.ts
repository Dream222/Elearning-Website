import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsAreaExistsGuard } from '@app/core/guards';

const routes: Routes = [
    {
        path: ':areaTitle',
        canActivate: [IsAreaExistsGuard],
        children: [
            {
                path: 'instructions', loadChildren:'./modules/example-instructions/example-instructions.module#ExampleInstructionsModule'
            },
            {
                path: 'results',
                loadChildren: './modules/example-results/example-results.module#ExampleResultsModule'
            },
            {
                path: 'tests',
                loadChildren: './modules/example-tests/example-tests.module#ExampleTestsModule'
            },
            {
                path: '', redirectTo: 'instructions', pathMatch: 'full'
            }
        ]
    },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExampleRoutingModule
{
}
