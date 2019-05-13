import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingResultService } from '@app/example/services';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ExampleRoutingModule
    ],
    exports: [ExampleRoutingModule],
    providers:[WritingResultService]
})
export class ExampleModule
{
}
