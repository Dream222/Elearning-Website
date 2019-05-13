import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MaterialDesignModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports : [
    ChatComponent  
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
