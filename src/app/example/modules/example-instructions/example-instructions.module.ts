import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@app/shared';
import { ExampleInstructionsRoutingModule } from './example-instructions-routing.module';

import { ExampleInstructionsComponent } from './example-instructions.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialDesignModule,
        ExampleInstructionsRoutingModule
    ],
    declarations: [ExampleInstructionsComponent],
    exports: [ExampleInstructionsRoutingModule]
})
export class ExampleInstructionsModule
{
}
