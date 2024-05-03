import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
declare var $: any;
import { DbService } from 'src/app/services/db.service';
import { SaltService } from 'src/app/services/salt.service';
import { Location } from '@angular/common';
import { debug } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  islogin: any;
  returnurl: any;
  Previousurl: any;
  barLabel: any;
  Url: string;
  showOtp = false;
  showChangepassword = false;
  showSpinner = false;

  loginData: any = {
    username: '',
    password: '',
    remember: false,
    cpatchaTextBox: '',
  };
  fp: any = { emailormobile: '', isemail: '', cpatchaTextBox: '' };
  resetpassword: any = {
    otp: '',
    newpassword: '',
    confirmpassword: '',
    emailormobile: '',
  };
  otp = { otp: '' };
  currentUrl: string;

  loginForm: UntypedFormGroup;
  error_messages = {
    newpassword: [
      { type: 'required', message: 'New password is required.' },
      { type: 'minlength', message: 'New password length.' },
      { type: 'maxlength', message: 'New password length.' },
      {
        type: 'pattern',
        message:
          'Must contain at least one  number and one uppercase and lowercase letter,special letter, and at least 8 or more characters',
      },
    ],
    confirmpassword: [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'minlength', message: 'Confirm password length.' },
      { type: 'maxlength', message: 'Confirm password length.' },
    ],
  };

  isLoginForm = false;
  showForgetPassword = false;
  isshow1 = false;
  Captchacode: string;
  salt: string;
  constructor(
    private router: Router,
    public db: DbService,
    public formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private saltService: SaltService,
    private location: Location
  ) {
    this.loginForm = this.formBuilder.group({
      newpassword: new UntypedFormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/
          ),
        ])
      ),
      confirmpassword: new UntypedFormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ])
      ),
    });
  }
  ForgetPasswordClick() {
    // $('#pass').addClass('otp');
    this.isLoginForm = false;
    this.showForgetPassword = true;
    this.showOtp = false;
    setTimeout(() => {
      this.createCaptcha();
    }, 100);

    // $('#myStaticDialog').appendTo('body').modal('show');
  }

  showErrorMessage = true;
  errorMessageDuration = 1000;

  async login() {
    debugger;
    if (this.returnurl == undefined || this.returnurl == 'logout') {
      this.returnurl = 'dashboard';
    }
    const id = this.returnurl;
    // this.logininothertab();
    this.showSpinner = true;
    // var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    // // var encryptedPassword = btoa(rsa.encrypt(this.loginData.password));

    // const salt = forge.random.getBytesSync(16);
    // const encryptedPassword = btoa(rsa.encrypt(this.loginData.password + salt, 'RSA-OAEP'));

    if (this.loginData.cpatchaTextBox == this.Captchacode) {
      debugger;
      const key = await this.saltService
        .getSalt()
        .then((salt) => (this.salt = salt));
      const encryptedPassword = await this.saltService.encryptPassword(
        key,
        this.loginData.password
      ); //this.loginData.password;//
      // this.loginData.password = btoa(this.loginData.password);
      debugger;
      const data = {
        email: this.loginData.username,
        password: encryptedPassword,
        remember: this.loginData.remember,
      };

      this.db.post(
        'api/authenticate/',
        data,
        (response): void => {
          debugger;
          this.db.setToken(response.token.access, response.token.refresh);
          debugger;
          if (id == null || id == undefined || id == '/login') {
            localStorage.removeItem('islogin');
            window.location.href = 'dashboard';
          } else if (id !== null && id !== undefined) {
            if (response.token !== null) {
              window.location.href = id;
            }
          }
          this.showSpinner = false;
        },
        (response): void => {
          debugger;
          if (response.data && response.data.msg) {
            this.db.showMessage(response.data.msg);
            this.createCaptcha();
          } else if (
            response.status === 401 ||
            (response.data === null &&
              response.data.hasOwnProperty('error') &&
              response.data.error === 'token_not_provided')
          ) {
            this.logininothertab();
            this.createCaptcha();
            this.db.showMessage('Please enter valid credentials');
          }
          this.showSpinner = false;
        }
      );
    } else {
      debugger;
      if (
        this.loginData.username === '' ||
        this.loginData.username === null ||
        this.loginData === undefined
      ) {
        this.db.showMessage('Please enter valid credentials');
      } else if (
        this.loginData.username === '' ||
        this.loginData.username === null ||
        this.loginData === undefined
      ) {
        this.db.showMessage('Please enter valid credentials');
      } else {
        debugger;
        this.db.showMessage('Please enter valid credentials');
        // this.db.showMessage('Invalid Captcha. Try Again');
        
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, this.errorMessageDuration);

        setTimeout(() => {
          this.createCaptcha();
        }, this.errorMessageDuration);
      }
    }
  }

  HandleRemember() {
    // console.log('h');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const cookieOptions = `expires=${expirationDate.toUTCString()}; path=/`;

    document.cookie = `MyCookieName=${this.loginData.username}; ${cookieOptions}`;
    document.cookie = `MyCookiePass=${this.loginData.password}; ${cookieOptions}`;
  }

  logininothertab() {
    if (localStorage.getItem('token') !== null) {
      window.location.href = this.returnurl;
    }
  }
  onKeydown(event: any): void {
    if (event.keyCode == 13) {
      this.login();
    }
  }
  ForgetPassword(): void {
    debugger;

    if (this.isemail(this.fp.emailormobile)) {
      this.fp.isemail = '1';
      // } else if (this.ismobile(this.fp.emailormobile)) {
      //   this.fp.isemail = '0';
    } else {
      this.db.showMessage('Please enter valid email');
      return;
    }

    if (this.fp.cpatchaTextBox == this.Captchacode) {
      const data = {
        // isemail: 1, emailormobile: this.fp.emailormobile
        isemail: 1,
        email: this.fp.emailormobile,
      };
      this.db.post('api/send-reset-password-email/', data, (response): void => {
        this.showForgetPassword = false;
        this.showOtp = true;
        this.showChangepassword = false;
      });
    } else {
      this.db.showMessage('Invalid Captcha. try Again');
      this.createCaptcha();
    }
    // }
  }

  isemail(value: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailPattern.test(value);
  }

  ismobile(input: string): boolean {
    const mobilePattern = /^[1-9]\d{9}$/;
    return mobilePattern.test(input);
  }
  //   myStaticDialog(): {

  //     $mdDialog.show({
  //     contentElement: '#myStaticDialog',
  //     parent: angular.element(document.body),
  //       fullscreen: true,
  //         disableParentScroll: false
  //     });
  // };

  createCaptcha(): void {
    //clear the contents of captcha div first
    this.loginData.cpatchaTextBox = null;
    document.getElementById('captcha').innerHTML = '';
    var charsArray = '0123456789abdefghijklmnqrtuABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement('canvas');
    canv.id = 'captcha';
    canv.width = 100;
    canv.height = 30;
    var ctx = canv.getContext('2d');
    ctx.fillStyle = '#a64eed';
    ctx.font = '25px Georgia';
    ctx.strokeText(captcha.join(''), 0, 22);
    this.Captchacode = captcha.join('');
    document.getElementById('captcha').appendChild(canv);
  }

  async checkotp() {
    const key = await this.saltService
      .getSalt()
      .then((salt) => (this.salt = salt));
    const encryptedOTP = await this.saltService.encryptPassword(
      key,
      this.otp.otp
    );
    const data = { otp: encryptedOTP, emailormobile: this.fp.emailormobile };
    this.db.post('checkotp/', data, (response): void => {
      this.db.addmessageandremove('otp submitted');
      this.showOtp = false;
      this.showForgetPassword = false;
      this.showChangepassword = true;
    });
  }
  async changepasswordFN() {
    if (
      this.resetpassword.newpassword.length >= 6 &&
      this.resetpassword.confirmpassword == this.resetpassword.newpassword
    ) {
      // this.resetpassword.emailormobile = this.fp.emailormobile;
      this.resetpassword.otp = this.otp.otp;

      const key = await this.saltService
        .getSalt()
        .then((salt) => (this.salt = salt));
      const newencryptedPassword = await this.saltService.encryptPassword(
        key,
        this.resetpassword.newpassword
      );
      const confirmencryptedPassword = await this.saltService.encryptPassword(
        key,
        this.resetpassword.confirmpassword
      );
      const encryptedOTP = await this.saltService.encryptPassword(
        key,
        this.resetpassword.otp
      );

      const data = {
        // emailormobile: this.fp.emailormobile,
        // otp: encryptedOTP,
        // newpassword: newencryptedPassword,
        // confirmpassword: confirmencryptedPassword
        password1: newencryptedPassword,
        password2: confirmencryptedPassword,
      };

      this.db.post(
        'api/reset-password/' + this.uid + '/' + this.token + '/',
        data,
        (response): void => {
          this.fp.emailormobile = null;
          this.otp.otp = null;
          this.showChangepassword = false;
          this.isLoginForm = true;
          this.db.addmessageandremove('password changed');
          setTimeout(() => {
            this.createCaptcha();
          }, 100);
        }
      );
    } else if (
      (this.resetpassword.confirmpassword! = this.resetpassword.newpassword)
    ) {
      alert('password not matched');
    } else if (this.resetpassword.newpassword.length < 6) {
      alert('password length must be at least 6');
    }
  }
  // $scope.cancel = function () {
  //   $mdDialog.hide();
  // };
  uid: string;
  token: string;

  ngOnInit() {
    // console.log(document.cookie);
    this.getCookieData();
    // this.route.queryParams.subscribe(params => {
    //   this.returnurl = params.returnurl;
    // });

    // const check = localStorage.getItem('token');
    // if (check !== null || check !== undefined) {
    //   this.login();
    // }
    // this.Url = this.route.snapshot.queryParamMap.get('returnurl');

    // $('.main-panel').css('width', '100%');

    this.islogin = true;
    this.isLoginForm = true;

    setTimeout(() => {
      this.createCaptcha();
    }, 100);

    this.route.params.subscribe((params) => {
      this.uid = params['uid'];
      this.token = params['token'];
      console.log(this.uid, this.token);
      if (this.uid && this.token) {
        this.showChangepassword = true;
        this.isLoginForm = false;
        this.showForgetPassword = false;
        this.showOtp = false;
        // You may perform additional checks/validation here if needed
      }

      this.currentUrl = this.router.url;
      console.log('Current URL:', this.currentUrl);
    });
  }

  getCookieData() {
    const username = this.getCookie('MyCookieName');
    const password = this.getCookie('MyCookiePass');

    if (username && password) {
      // Do something with the extracted username and password
      // console.log('Username:', username);
      // console.log('Password:', password);

      this.loginData.username = username;
      this.loginData.password = password;
    } else {
      console.log('Username or password not found in cookies.');
    }
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  ngOnDestroy(): void {}
  openmodal(modalname) {
    $(modalname).appendTo('body').modal('show');
  }
  BackToLogin() {
    this.isLoginForm = true;
    this.showForgetPassword = false;
    this.showChangepassword = false;
    this.showOtp = false;
    this.loginData = {
      username: '',
      password: '',
      remember: false,
      cpatchaTextBox: '',
    };
    this.fp = { emailormobile: '', isemail: '', cpatchaTextBox: '' };
    this.resetpassword = {
      otp: '',
      newpassword: '',
      confirmpassword: '',
      emailormobile: '',
    };
    this.otp = { otp: '' };
    setTimeout(() => {
      this.createCaptcha();
    }, 100);
  }

  ShowMsg = false;
  FormValidation(event: any) {
    const PressedKey = event.key;
    console.log(PressedKey);
    const alphanumericRegex = /[!#$%^&*()_+{}\[\]:;<>,?~\\/-]/;

    const isShiftPressed = event.shiftKey;

    if (alphanumericRegex.test(PressedKey)) {
      this.ShowMsg = true;
    } else {
      this.ShowMsg = false;
    }
  }

  onPaste(event: any) {
    event.preventDefault();
  }
}
