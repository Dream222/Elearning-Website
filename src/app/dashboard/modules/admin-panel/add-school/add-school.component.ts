import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { SchoolModel } from '../models';

@Component({
  selector: 'el-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddSchoolComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  name : string;
  school_admin : string;
  email : string;
  school : SchoolModel;

  ngOnInit() {
  }

  onSave(): void {
      this.school = {
          name : this.name,
          school_admin : this.school_admin,
          email : this.email,
          description : ""
      };
      console.log(this.school);
      this.dialogRef.close(this.school);
  }

}
