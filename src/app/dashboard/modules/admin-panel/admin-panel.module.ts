import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '@app/shared';
import { AdminPanelRoutingModule } from '@app/dashboard/modules/admin-panel/admin-panel-routing.module';

import { AdminPanelComponent } from '@app/dashboard/modules/admin-panel/admin-panel.component';
import { AdminSchoolsComponent } from '@app/dashboard/modules/admin-panel/admin-schools/admin-schools.component';
import { AdminUsersComponent } from '@app/dashboard/modules/admin-panel/admin-users/admin-users.component';
import { AdminCbcFremantleComponent } from '@app/dashboard/modules/admin-panel/admin-cbc-fremantle/admin-cbc-fremantle.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
    imports: [
      CommonModule,
      MaterialDesignModule,
      AdminPanelRoutingModule,
      FormsModule
  ],
    declarations: [
        AdminPanelComponent,
        AdminSchoolsComponent,
        AdminUsersComponent,
        AdminCbcFremantleComponent,
        AddSchoolComponent,
        StudentsComponent
    ],
    entryComponents: [
      AddSchoolComponent
    ],
    exports: [AdminPanelRoutingModule]
})
export class AdminPanelModule { }
