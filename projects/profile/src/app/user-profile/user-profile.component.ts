import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service';
// import { Profile } from 'selenium-webdriver/firefox';
// import { MustMatch } from '../helpers/must-match.validator';

import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../../src/app/services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loginForm: UntypedFormGroup;
  errorMessages = {
    cpassword: [
      { type: 'required', message: 'Current password is required.' },
    ],
    newpassword: [
      { type: 'required', message: 'New password is required.' },
      { type: 'minlength', message: 'New password length.' },
      { type: 'maxlength', message: 'New password length.' },
      { type: 'pattern', message: 'Must contain at least one  number and one uppercase and lowercase letter,special letter, and at least 8 or more characters' }
    ],
    confirmpassword: [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'minlength', message: 'Confirm password length.' },
      { type: 'maxlength', message: 'Confirm password length.' },
    ],
  };
  ProfileTabs: any;
  updateprofie: any;
  showChangePassword = false;
  showProfile = false;
  profile: any = { id: 1 };
  changepassword: any = {};
  public barLabel = 'Password strength:';

  constructor(public db: DbService, public formBuilder: UntypedFormBuilder,public USR: UserService) {

    this.loginForm = this.formBuilder.group({
      cpassword: new UntypedFormControl('', Validators.compose([
        Validators.required,
      ])),
      newpassword: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/)
      ])),
      confirmpassword: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    });


  }

  ngOnInit(): any {

    this.USR.setProfile();
    this.LoadProfileData();
    this.editprofile();

  }



  public editprofile(): void {
    this.showChangePassword = false;
    this.showProfile = true;
  }

  public passwordchange(): void {
    this.showChangePassword = true;
    this.showProfile = false;
  }
  changepasswordfun(): void {
    if (this.changepassword.newpassword === this.changepassword.confirmpassword) {
      this.db.store('changepassword/', this.changepassword, ((response): void => {
        this.db.showMessage('Added Successfully');
      }));
    } else {
      this.db.showMessage('New Password and Confirm Password not match');

    }


  }
  LoadProfileData(): void {
    this.db.list('user/profile/', {}, ((response): void => {
      this.profile = response;


    }));
  }
  profileupdate(): void {
    this.db.update('user/profile/', this.profile.id, this.profile, ((response): void => {

      this.LoadProfileData();
      this.db.showMessage('Updated Successfully');

    }));
  }


}
