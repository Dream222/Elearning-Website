import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleInstructionsComponent } from './example-instructions.component';

const routes: Routes = [
    { path: '', component: ExampleInstructionsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExampleInstructionsRoutingModule
{
}
