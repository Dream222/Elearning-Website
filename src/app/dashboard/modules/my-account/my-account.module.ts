import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@app/shared';
import { MyAccountRoutingModule } from './my-account-routing.module';

import { MyAccountComponent } from './my-account.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialDesignModule,
        MyAccountRoutingModule
    ],
    declarations: [MyAccountComponent],
    exports: [MyAccountRoutingModule]
})
export class MyAccountModule
{
}
