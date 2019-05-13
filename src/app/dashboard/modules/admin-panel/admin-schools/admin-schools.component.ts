import { Component,  OnInit , OnDestroy } from '@angular/core';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { MatDialog } from '@angular/material';
import { AdminService } from '@app/dashboard/services';
import { Subject } from 'rxjs/Subject';
import { finalize, takeUntil } from 'rxjs/operators';
import { RouteHandlerService, ErrorHandlerService, LoadingHandlerService, LocalStorageService } from '@app/core/services';
import { ErrorModel } from '@app/core/models';
import { SchoolModel, AddSchoolModel , AddSchoolResponseModel} from '../models';

@Component({
  selector: 'el-admin-schools',
  templateUrl: './admin-schools.component.html',
  styleUrls: ['./admin-schools.component.scss']
})
export class AdminSchoolsComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog, private errorHandlerService : ErrorHandlerService, private adminService : AdminService) { }

  private ngUnsubscribe = new Subject();

  schools : SchoolModel[];

  add_school : SchoolModel;

  ngOnInit() {
      this.updateSchoolsList();
  }

  ngOnDestroy()
  {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  addSchool()
  {
      const dialogRef = this.dialog.open(AddSchoolComponent);
      dialogRef.afterClosed()
      .subscribe(result => {
        this.add_school = result;
        var temp : AddSchoolModel = { admin : this.add_school.school_admin , name : this.add_school.name };
        if(temp.admin == null && temp.name == null)
            return;
        this.createSchool(temp);
      });
  }

  createSchool(temp)
  {
      LoadingHandlerService.show();
      this.adminService.createSchool(temp)
          .pipe(
              finalize(() => LoadingHandlerService.hide()),
              takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
              (res : AddSchoolResponseModel)=>
              {
                  console.log(res);
                  this.updateSchoolsList();
              }
          );
  }

  updateSchoolsList()
  {
      LoadingHandlerService.show();
      this.adminService.getSchools()
          .pipe(
              finalize(() => LoadingHandlerService.hide()),
              takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
              (schools: SchoolModel[]) =>
              {
                  console.log(schools);
                  this.schools = schools;
              },
              (error: ErrorModel) =>
              {
                  this.errorHandlerService.showError(error);
              }
          );
  }
}
