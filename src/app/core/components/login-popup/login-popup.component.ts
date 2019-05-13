import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { LoginModel } from '@app/core/models';

@Component({
  selector: 'el-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginPopupComponent>) { }

  loginModel : LoginModel;

  ngOnInit() {
      this.loginModel = {
          password : "",
          email : "",
          client : "front"
      }
  }

  login()
  {
      this.dialogRef.close(this.loginModel);
  }

}
