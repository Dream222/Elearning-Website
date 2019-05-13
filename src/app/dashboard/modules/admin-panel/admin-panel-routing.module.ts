import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from '@app/dashboard/modules/admin-panel/admin-panel.component';
import { AdminSchoolsComponent } from '@app/dashboard/modules/admin-panel/admin-schools/admin-schools.component';
import { AdminUsersComponent } from '@app/dashboard/modules/admin-panel/admin-users/admin-users.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
    { path: '', component: AdminPanelComponent},
    { path: 'schools', component: AdminSchoolsComponent },
    { path: 'users', component: AdminUsersComponent },
    { path: 'students/:username/:schoolname', component: StudentsComponent },

    /*{ path: '',
        component: AdminPanelComponent,
        children: [
            { path: 'schools', component: AdminSchoolsComponent }
        ] },*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
