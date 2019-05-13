import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/dashboard/services';
import { GetStudentInputModel } from '../models';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'el-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor( private activatedRoute : ActivatedRoute , private adminService : AdminService) { }

  input : GetStudentInputModel;

  ngOnInit() {
      const params = this.activatedRoute.snapshot.params;
      this.input = {
        class : 'Class 1a',
        school : params.schoolname
      };

      this.adminService.getStudents(params.username, this.input)
        .subscribe((res)=>{
            console.log(res);
        });

  }



  addStudent()
  {

  }

}
