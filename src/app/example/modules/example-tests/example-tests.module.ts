import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '@app/shared';
import { ExampleTestsRoutingModule } from './example-tests-routing.module';
import { CKEditorModule } from 'ngx-ckeditor';

import {
    ChooseAnswerComponent,
    LayoutComponent,
    WritingComponent
} from '@app/example/modules/example-tests/components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialDesignModule,
        ExampleTestsRoutingModule,
        CKEditorModule
    ],
    declarations: [
        LayoutComponent,
        ChooseAnswerComponent,
        WritingComponent
    ],
    exports: [ExampleTestsRoutingModule]
})
export class ExampleTestsModule
{
}
