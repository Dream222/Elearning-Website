import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MaterialDesignModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  entryComponents :[
      ConfirmModalComponent
  ],
  declarations: [ConfirmModalComponent]
})
export class ModalModule { }
