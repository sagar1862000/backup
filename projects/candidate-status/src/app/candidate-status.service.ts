import { Injectable, OnChanges, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $: any;
type ICallback = (response: any) => void;
@Injectable({
  providedIn: 'root',
})
export class statusService {
  // rooturi = 'http://192.168.4.14:8000/';
  rooturi = 'http://192.168.4.108:8001/';

  ServiceURL = this.rooturi;
  ids12: any = [];
  loaderprogressbar = false;
  token: any;
  public previousUrl: string = undefined;
  CurrentURL = '';
  mp: any = {};
  resumeparser: boolean = true;
  profile: any = {};
  clientsdepartment = '';
  ajids: any;
  ids: any = [];
  nodetype: any;
  storedpageno: any;
  storedpageno1: any;
  idscheckbox: any = [];
  http_or_https = 'https';
  globaljobid = 0;
  call_id: any = [];

  public NodeType = {
    internaldatabase: 'internaldatabase',
    history: 'history',
    myjob: 'myjob',
  };
  private selectedNodes = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  buildFormData(formData: any, data: any, parentKey?: any) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      let value = data == null ? '' : data;
      if (typeof data === 'string') {
        if (value.indexOf('{') === -1) {
          value = value.replace(/['"]+/g, '');
        }
      }
      formData.append(parentKey, value);
    }
  }

  setToken(token: string, refresh: string): void {
    this.token = token;
    localStorage.setItem('token', this.token);
    localStorage.setItem('refresh', refresh);
  }

  addmessageandremove(message:any): void {
    this.showNotification(message);
  }

  //to get the previously
  public getPreviousUrl() {
    this.previousUrl = this.router.url;
    return this.previousUrl;
  }

  //to hide the loader
  hideLoaderfunction(loader: any): void {
    setTimeout(() => {
      this.loaderprogressbar = false;
    }, 100);
  }

  // format the data while sending in payload
  jsonToFormData(data: any) {
    const formData = new FormData();

    this.buildFormData(formData, data);

    return formData;
  }

  //to show loader function
  showloaderfunction(loader: any): void {
    console.log('h');
    this.loaderprogressbar = true;
  }

  //get the ip address
  getIpAddress(): any {
    this.http
      .get('https://api.ipify.org/?format=json')
      .subscribe((res: any) => {
        const ipAddress = res.ip;
        // console.log(ipAddress);
        return ipAddress;
      });
  }

  // post api to call the post method when its not authenticated
  post(
    url: string,
    data: any,
    success?: ICallback,
    fail?: ICallback,
    loader?: any
  ) {
    //  success('avc');
    console.log('h');
    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'POST',
      url: fullurl,
    };
    const headersfull = new HttpHeaders();
    headersfull
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('X-Forwarded-For', this.getIpAddress());
    // post data missing(here you pass email and password)
    const body = new FormData();

    for (const i in data) {
      if (data[i]) {
        body.append(i, data[i]);
      }
    }
    this.http.post(req.url, body, { headers: headersfull }).subscribe(
      (res) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },
      (err) => {
        debugger;
        this.showMessage(err);
        if (fail !== undefined) {
          fail(err);
        }
      }
    );
  }

  public isObject(val: any) {
    return typeof val === 'object';
  }

  public showNotification(message: any, timer?: any, from?: any, align?: any) {
    if (timer == null || timer === undefined) {
      timer = 3000;
    }

    if (from == null || from === undefined) {
      from = 'top';
    }

    if (align == null || align === undefined) {
      align = 'right';
    }

    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = 4; // Math.floor((Math.random() * 4) + 1);

    // $.notify("You have successfully created a plotting.", "success");
    $.notify(
      {
        // message1:alert("hello"),
        icon: 'notifications',
        message,
      },
      {
        type: type[color],
        timer,
        placement: {
          from,
          align,
        },

        template:
          '<div style="z-index:99999!important;" data-notify="container" ' +
          'class="col-xl-4 col-lg-4 col-11 zindex col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" ' +
          ' data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">' +
          message +
          '</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" ' +
          'aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }

  public showMessage(
    message: any,
    action?: string,
    durationMS?: number,
    loader?: any
  ): void {
    debugger;
    this.showloaderfunction(loader);
    this.hideLoaderfunction(loader);
    if (this.isObject(message) && message.status === 0) {
      message = 'Please check your internet.';
    } else if (this.isObject(message) && message.error && message.error.msg) {
      message = message.error.msg;
      this.showNotification(message);
    } else if (this.isObject(message) && message.error && message.error.error) {
      message = message.error.error;
      this.showNotification(message);
    } else if (
      message.status === 401 &&
      message.error.error == 'invalid_credentials'
    ) {
      message = 'Please Enter Valid Credentials';
    } else if (message.status === 429) {
      message = message.error.error;
    } else if (
      this.isObject(message) &&
      message.error &&
      message.error.errors &&
      message.error.errors.non_field_errors
    ) {
      message = message.error.errors.non_field_errors;
      const messages = [];
      for (const k in message) {
        if (message[k]) {
          this.showNotification(message);
        }
      }
    } else if (this.isObject(message) && message.status === 401) {
      message = 'Please authenticate to access secured resource.';
    } else if (this.isObject(message) && message.status >= 500) {
      message = 'Error Occured';
    } else if (this.isObject(message) && message.status === 422) {
      message = message.error;
      const messages = [];
      for (const k in message) {
        if (message[k]) {
          this.showNotification(message[k]);
        }
        // messages.push(message[k].toString());
      }
      message = 'Please Fill values';
    } else if (this.isObject(message) && message.status === 400) {
      message = message.error;
      const messages = [];
      for (const k in message) {
        if (message[k]) {
          this.showNotification(message[k]);
        }
        // messages.push(message[k].toString());
      }
      message = 'Please Fill Valid Details';
    }

    if (action === undefined) {
      action = 'Message';
    }

    if (durationMS === undefined) {
      durationMS = 1000;
    }
    const snackBarRef = this.snackBar.open(message, action, {
      duration: durationMS,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });

    // $rootScope.universal_errors = [];
    // if (response.status == 422) {
    //
    //   for (var k in response) {
    //     var message = response[k].toString();
    //     $rootScope.universal_errors.push({ message: message, data: true });
    //   }
    //   $('#errorMessage').modal('show');
    // }
  }

  goToLogin(response: any): any {
    // localStorage.removeItem('token');
    // localStorage.removeItem('refresh');
    // if (response && response && response.msg) {
    //   alert(response.msg);
    // }

    // Commented by sagar

    // if (this.CurrentURL === undefined || this.CurrentURL === '') {
    //   this.router.navigate(['login']);
    // } else {
    //   this.router.navigate(['login']);
    // }

    // Commented by sagar

    // this.SETUrl = this.router['location']._platformLocation.location.search;
    // this.SETUrl = (this.SETUrl + '').replace('?returnurl=', '');
    // if (this.SETUrl === undefined || this.SETUrl === '' || this.SETUrl === "null") {
    //   this.CurrentURL = this.router['location']._platformLocation.location.pathname;
    //   if (this.CurrentURL === undefined || this.CurrentURL === '' || this.CurrentURL === "/login" || this.CurrentURL === '/') {
    //     this.router.navigate(['login']);
    //   } else {
    //     window.top.location.href = this.LoginURL + '?returnurl=' + this.CurrentURL;
    //     return true;
    //   }
    // }
  }

  //method to call get api after authentication
  list(
    url: string,
    data?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?: any
  ): any {
    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'get',
      url: fullurl,
    };

    if (data === undefined || data === null) {
      data = {};
    }
    const token = this.getToken();

    const headersfull = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const requestOptions = { headers: headersfull, params: data };

    this.http
      .get(req.url, requestOptions) // Pass requestOptions as the second parameter

      .subscribe(
        (res) => {
          this.hideLoaderfunction(loader);
          if (success !== undefined) {
            success(res);
          }
        },
        (response) => {
          this.hideLoaderfunction(loader);
          this.showMessage(response);
          if (
            response.status === 401 ||
            response.status === 422 ||
            (response.hasOwnProperty('error') &&
              response.error === 'token_not_provided')
          ) {
            this.goToLogin(response);
          } else {
            if (fail !== undefined) {
              fail(response);
            }
          }
        }
      );
  }

  getToken(): any {
    if (localStorage['refresh']) {
      this.token = localStorage['token'];
      // localStorage['refresh'];
      return this.token;
    } else {
      this.goToLogin({});
    }
  }

  //time formats

  toYYMMDD(date: any) {
    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }
  toMMDDYY(date: any) {
    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + '-' + dd + '-' + yyyy;
  }
  toYYMMDDTT(date: any) {
    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const h = date.getHours();
    const mi = date.getMinutes();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + mi;
  }
  toTT(date: any) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const h = date.getHours();
    const mi = date.getMinutes();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return h + ':' + mi;
  }

  checkLoginOrNot(): void {
    return;
    // this.list('profile', null, ((response): void => {
    //   const profiletoken = response.token;
    //   // if (profiletoken !== localStorage.token) {
    //   //   localStorage.removeItem('token');
    //   //   this.router.navigate(['login']);
    //   //   this.addmessageandremove('already login more the one device');
    //   // }
    // }));
  }

  getdata(
    url: string,
    data?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?
  ): any {
    //  success('avc');

    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'get',
      url: fullurl,
    };
    if (data === undefined || data === null) {
      data = {};
    }
    const token = this.getToken();
    const headersfull = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );

    // headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)

    this.http.get(req.url, { headers: headersfull, params: data }).subscribe(
      (res) => {
        if (success !== undefined) {
          success(res);
        }
      },
      (response) => {
        this.showMessage(response);

        if (
          response.status === 401 ||
          response.status === 422 ||
          (response.hasOwnProperty('error') &&
            response.error === 'token_not_provided')
        ) {
          this.goToLogin(response);
        } else {
          if (fail !== undefined) {
            fail(response);
          }
        }
      }
    );
  }

  extractIDsData(data, id?): any {
    if (id === null || id === undefined) {
      id = 'id';
    }
    const ids1 = [];

    for (const i in data) {
      if (data[i]) {
        ids1.push(data[i].ajid);
      }
    }

    return ids1;
  }

  textTospeech(textdata): void {
    // var audio = null;
    this.list('textspeech', { text: textdata }, (response): void => {
      let audio = new Audio();
      audio.currentTime = 0;
      audio.load();
      // audio.src = "http://localhost:8000/recroding/" + response.audio;
      audio.src =
        'https://api.passivereferral.com/apicontentpassivereferral/python/ats_tts/recordings/' +
        response.audio;
      audio.load();
      audio.play();
      audio.currentTime = 0;

      // // audio.duration;

      // let audio = new Audio('https://api.passivereferral.com/apicontentpassivereferral/python/ats_tts/recordings/' + response.audio)
      // audio.play()
      // audio.delete;
    });
  }

  show(
    url: string,
    id?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?: any,
    data?: any
  ) {
    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url + id + '/';
    }

    let token = this.getToken();
    const headersfull = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + token);

    this.http.patch(fullurl, data, { headers: headersfull }).subscribe(
      (res: any) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },
      (error: any) => {
        this.hideLoaderfunction(loader);
        this.showMessage(error);
        if (
          error.status === 401 ||
          (error.error && error.error === 'token_not_provided')
        ) {
          this.goToLogin(error);
        } else {
          if (fail !== undefined) {
            fail(error);
          }
        }
      }
    );
  }

  update(
    url: string,
    id?: any,
    data?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?: any
  ) {

    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url + id + '/';
    }

    const req = {
      method: 'put',
      url: fullurl,
    };
    if (data === undefined) {
      data = {};
    }

    const token = this.getToken();
    const headersfull = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );

    // .append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)
    let body = new FormData();

    body = this.jsonToFormData(data);

    this.http.put(req.url, body, { headers: headersfull }).subscribe(
      (res) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },
      (response) => {
        this.hideLoaderfunction(loader);
        this.showMessage(response);

        if (
          response.status === 401 ||
          (response.hasOwnProperty('error') &&
            response.error === 'token_not_provided')
        ) {
          this.goToLogin(response);
        } else {
          if (fail !== undefined) {
            fail(response);
          }
        }
      }
    );
  }

  store(
    url: string,
    data?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?: any
  ): any {
    debugger;
    // success('avc');

    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url;
    }

    const req = {
      method: 'post',
      url: fullurl,
    };
    if (data === undefined) {
      data = {};
    }

    const token = this.getToken();
    const headersfull = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );

    // headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)
    let body = new FormData();
    body = this.jsonToFormData(data);
    this.http.post(req.url, body, { headers: headersfull }).subscribe(
      (res) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },

      (response) => {
        this.hideLoaderfunction(loader);
        this.showMessage(response);

        if (
          response.status === 401 ||
          (response.hasOwnProperty('error') &&
            response.error === 'token_not_provided')
        ) {
          this.goToLogin(response);
        } else {
          if (fail !== undefined) {
            fail(response);
          }
        }
      }
    );
  }

  extractSelectedSingleIds(
    obj,
    selected = 'selected',
    key = 'id',
    ajid = 'ajid'
  ): any {
    const selectedonebyone = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedonebyone.push({ id: obj[i][key], ajid: obj[i][ajid] });
      }
    }

    this.ajids = selectedonebyone;
    return this.ajids;
  }
  extractallselectedids(
    obj,
    selected = 'selected',
    key = 'id',
    ajid = 'ajid'
  ): any {
    const selectedids = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedids.push({ id: obj[i][key], ajid: obj[i][ajid] });
      }
    }

    this.ajids = selectedids;
    return selectedids;
  }

  SelectedSingleIds(obj: any, selected = 'selected', key = 'id'): any {
    const selectedonebyone = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedonebyone.push(obj[i][key]);
        //  sessionStorage.setItem('deletedItems', JSON.stringify(obj))
        //  var a= JSON.parse(sessionStorage.getItem('deletedItems'))
      }
    }

    this.ids = selectedonebyone;

    return this.ids;
  }

  getIDs(nodetype?, id?): any {
    if (id === null || id === undefined) {
      id = 'id';
    }
    const ids = [];

    if (nodetype === this.nodetype) {
      for (const i in this.selectedNodes) {
        if (this.selectedNodes[i]) {
          ids.push(this.selectedNodes[i].data[id]);
        }
      }
    }

    return ids;
  }

  extractCallId(data, call_id?): any {
    if (call_id === null || call_id === undefined) {
      call_id = 'call_id';
    }
    const ids = [];
    for (const i in data) {
      if (data[i]) {
        ids.push(data[i].data[call_id]);
      }
    }

    return ids;
  }

  setSelectedNodeType(type?: any): void {
    this.nodetype = type;
  }

  public showDialog(messsage, title?) {
    if (title === null || title === undefined) {
      title = 'Message';
    }
    $('#messagepopup').modal('show');
    $('#messagetitle').html(title);
    $('#messagebody').html(messsage);
  }

  ConvertToFormData(obj, form, namespace) {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File,
        // use recursivity.
        if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File)
        ) {
          this.ConvertToFormData(obj[property], fd, property);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;

    /*
        const body = new FormData();

        for (const i in data) {
          if (data[i]) {
            if (!isArray(data[i])) {
              body.append(i, data[i]);
            } else {
              const alldata = data[i];
              let iterator = 0;
              for (const k in alldata) {
                if (alldata[k]) {
                  const currow = alldata[k];
                  for (const keycur in currow) {
                    if (currow[keycur]) {

                      body.append(i + '[' + iterator + '][' + keycur + ']', currow[keycur]);
                    }
                  }
                  iterator++;
                }


              }
            }
          }
        }
        return body;*/
  }

  destroy(
    url: string,
    id?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?
  ): any {
    //  success('avc');

    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url + id + '/';
    }
    const req = {
      method: 'post',
      url: fullurl,
    };
    let data;
    if (data === undefined) {
      data = {};
    }
    const token = this.getToken();
    const headersfull = new HttpHeaders()
      // headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
      .append('Authorization', 'Bearer ' + token);

    // post data missing(here you pass email and password)
    const body = this.ConvertToFormData(data, '', '');

    this.http.delete(req.url, { headers: headersfull }).subscribe(
      (res) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },
      (response) => {
        this.hideLoaderfunction(loader);
        this.showMessage(response);

        if (
          response.status === 401 ||
          (response.hasOwnProperty('error') &&
            response.error === 'token_not_provided')
        ) {
          this.goToLogin(response);
        } else {
          if (fail !== undefined) {
            fail(response);
          }
        }
      }
    );
  }

  upload(
    url: string,
    data?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?
  ): any {
    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'post',
      url: fullurl,
    };
    if (data === undefined) {
      data = {};
    }
    const token = this.getToken();
    const headersfull = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );

    let body = new FormData();

    body = this.jsonToFormData(data);
    this.http.post(req.url, body, { headers: headersfull }).subscribe(
      (res) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },
      (response) => {
        this.hideLoaderfunction(loader);
        this.showMessage(response);

        if (
          response.status === 401 ||
          (response.hasOwnProperty('error') &&
            response.error === 'token_not_provided')
        ) {
          this.goToLogin(response);
        } else {
          if (fail !== undefined) {
            fail(response);
          }
        }
      }
    );
  }

  storeupload(
    url: string,
    data?: any,
    success?: ICallback,
    fail?: ICallback,
    loader?: any,
    fileToUpload?: any[]
  ): any {
    this.showloaderfunction(loader);
    let fullurl = url;
    if (url.indexOf('http') === -1) {
      fullurl = this.ServiceURL + url;
    }
    const req = {
      method: 'post',
      url: fullurl,
    };
    if (data === undefined || data === null) {
      data = {};
    }

    const token = this.getToken();

    const headersfull = new HttpHeaders().append(
      'Authorization',
      'Bearer ' + token
    );

    // headersfull.append('Content-Type', 'application/x-www-form-urlencoded');
    // post data missing(here you pass email and password)
    let body = new FormData();

    body = this.jsonToFormData(data);
    if (fileToUpload != null) {
      for (const i in fileToUpload) {
        if (fileToUpload[i]) {
          let filekey = 'file';
          if (fileToUpload[i].filekey) {
            filekey = fileToUpload[i].filekey;
          }

          body.append(filekey, fileToUpload[i].file, fileToUpload[i].file.name);
        }
      }
    }
    this.http.post(req.url, body, { headers: headersfull }).subscribe(
      (res) => {
        this.hideLoaderfunction(loader);
        if (success !== undefined) {
          success(res);
        }
      },
      (response) => {
        this.hideLoaderfunction(loader);
        this.showMessage(response);

        if (
          response.status === 401 ||
          (response.hasOwnProperty('error') &&
            response.error === 'token_not_provided')
        ) {
          this.goToLogin(response);
        } else {
          if (fail !== undefined) {
            fail(response);
          }
        }
      }
    );
  }

  SelectedCheckbox(obj, selected = 'selected', key = 'id'): any {
    const selectedmanager = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedmanager.push(obj[i][key]);
      }
    }
    return selectedmanager;
  }

  getPager12(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 4
  ) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    this.storedpageno1 = parseInt(localStorage.getItem('page'), 10);

    let startPage: number, endPage: number;
    if (totalPages <= 4) {
      // less than 10 total pages so show all

      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (this.storedpageno1 <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (this.storedpageno1 + 4 >= totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = this.storedpageno1 - 1;
        endPage = this.storedpageno1 + 2;
      }
    }

    if (this.storedpageno1 > endPage) {
      this.storedpageno1 = endPage;
    }

    // calculate start and end item indexes
    const startIndex = (this.storedpageno1 - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => +i
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage: this.storedpageno1,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 4) {
    debugger;
    const totalPages = Math.ceil(totalItems / pageSize);
    this.storedpageno = parseInt(localStorage.getItem('page'), 10);
    if (this.storedpageno == 'NaN' || Number.isNaN(this.storedpageno)) {
      this.storedpageno = 1;
    }
    let startPage: number, endPage: number;
    if (totalPages <= 4) {
      // less than 10 total pages so show all

      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages

      if (this.storedpageno <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (this.storedpageno + 4 >= totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = this.storedpageno - 1;
        endPage = this.storedpageno + 2;
      }
    }

    if (this.storedpageno > endPage) {
      this.storedpageno = endPage;
    }

    // calculate start and end item indexes

    const startIndex = (this.storedpageno - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    debugger;
    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => +i
    );
    debugger;
    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage: this.storedpageno,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  allselectedids(obj: any, selected = 'selected', key = 'id'): any {
    const selectedids = [];
    for (const i in obj) {
      if (obj[i][selected] === true) {
        selectedids.push(obj[i][key]);
      }
    }
    this.idscheckbox = selectedids;

    return this.idscheckbox;
  }

  SelectedWithComma(obj, key = 'id'): any {
    let selectedcheckbox = '';
    for (const i in obj) {
      if (obj[i]) {
        selectedcheckbox += obj[i][key] + ',';
      }
    }
    return selectedcheckbox.substring(0, selectedcheckbox.lastIndexOf(','));
    // creturn selectedcheckbox;
  }

  SelectedCheckboxWithComma(obj, key = 'id'): any {
    let selectedcheckbox = '';
    for (const i in obj) {
      if (obj[i]) {
        selectedcheckbox += obj[i][key] + ',';
      }
    }
    return selectedcheckbox.substring(0, selectedcheckbox.lastIndexOf(','));
    // creturn selectedcheckbox;
  }

  extractCallIDData(data, id?): any {
    if (id === null || id === undefined) {
      id = 'id';
    }
    const ids1 = [];

    for (const i in data) {
      if (data[i]) {
        // ids1.push(data[i].call_id);
        ids1.push(data[i]);
      }
    }

    this.ids12 = ids1;
    // return ids1;

    return this.ids12;
  }

  sl(): void {
    // $rootScope.ShowLoader = true;
  }
}