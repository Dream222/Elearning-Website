import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquationComponent } from './equation.component';
import { KatexModule } from 'ng-katex';

@NgModule({
  imports: [
    CommonModule,
    KatexModule
  ],
  exports :[
    EquationComponent
  ],
  declarations: [ EquationComponent ]
})
export class EquationModule { }
