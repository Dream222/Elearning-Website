import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@app/shared';
import { InstructionsRoutingModule } from './instructions-routing.module';

import { InstructionsComponent } from './instructions.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialDesignModule,
        InstructionsRoutingModule
    ],
    declarations: [InstructionsComponent],
    exports: [InstructionsRoutingModule]
})
export class InstructionsModule
{
}
