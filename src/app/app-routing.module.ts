import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'welcome', loadChildren: './landing-page/landing-page.module#LandingPageModule' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'example', loadChildren: './example/example.module#ExampleModule' },
    { path: 'wrong-page', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
    { path: '', redirectTo: '/dashboard/my-account', pathMatch: 'full' },
    { path: '**', redirectTo: '/wrong-page', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
        })],
    exports: [RouterModule]
})
export class AppRoutingModule
{
}
