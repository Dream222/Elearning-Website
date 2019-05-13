import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        backdropBackgroundColour: 'rgba(0, 0, 0, 0)',
    })
  ],
  exports : [ SpinnerComponent ],
  declarations: [SpinnerComponent]
})
export class SpinnerModule { }
