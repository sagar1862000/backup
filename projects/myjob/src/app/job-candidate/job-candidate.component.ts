import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { isArray } from 'util';
import { DbService } from '../../../../../src/app/services/db.service';
declare var $: any;
// import { Loading12 } from '../loader/loading';
// import {Loading12} from '../loader/loading'
@Component({
  selector: 'app-job-candidate',
  templateUrl: './job-candidate.component.html',
  styleUrls: ['./job-candidate.component.scss']
})
export class JobCandidateComponent implements OnInit {


    comments: '';
    myjobid: string;
    candidatesearch: string;
    isinterview: number;
    jobitemselected: any;
    mainprocessnewvar: any;
    childprocessnewvar: any;
    gridheader: any;
    selectedjob: any;
    process: any;
    mainprocess: number;
    ShowCandidates: boolean;
    hidecols = ['id', 'recruiter_id', 'atj_updated_at', 'vendorname', 'onboardingid', 'test_result', 'source', 'ipAddress', 'cvstatus', 'data_source', 'referrerName'];
    selectedjoball: any;
    selectedjobunderreview: any;
    selectedjobinprocess: any;
    selectedjobselectedcandidate: any;
    selectedjobrejected: any;
    selectedjobininterview: any;
    downloadcv = false;
    download = false;
    gridOptionsloadcandidatesInPopUp: any = {};
    trackerlist: any;
    allids = [];
    sendtracker: any = {};
    nocv: any;
    resumesupload: any;
    withoutcv: any;
    cv_to_panel: any = {};
    ajid: any;
    startdatefilter = new Date();
    enddatefilter = new Date();
    rowData = [];
    commentstatus: { ajid: number; comment: any; status: any; };
    profiletoken: string;
    show_all_jobs: any;
    header: any;
    name1: any;
    datas: any;
    activities: any;
    Buttons: any[];
  
    setpage: any;
    limitstartIndex: any = 0;
    limitendIndex: any = 20;
    documentsvaluts: any;
    Getdownloadcandidatedata: any[];
    constructor(public db: DbService, public route: ActivatedRoute, private router: Router) { }
    DataDefinitions = [
      { headerName: 'Checkbox', field: 'id', type: 'checkbox', print: 'heading' },
      { headerName: 'candidate Name', field: 'candidate_name', type: 'text', style: 'font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft' },
      { headerName: 'Contact number', field: 'mobile_no', type: 'texticon', iconname: 'number.svg', size: 'col-md-4', tag: 'span', print: 'bodyleft' },
      { headerName: 'Email', field: 'email', type: 'texticon', iconname: 'Email.svg', tag: 'span', size: 'col-md-4', print: 'bodyleft' },
      { headerName: 'Current Salary', field: 'current_salary', type: 'texticon', iconname: 'Salary.svg', size: 'col-md-4', tag: 'span', print: 'bodyleft' },
      { headerName: 'currentOrganization', field: 'current_organization', type: 'texticon', iconname: 'organization.svg', size: 'col-md-4', print: 'bodyleft' },
      { headerName: 'Candidate Status', field: 'display_name', type: 'button', tag: 'button', class: 'btn btn-sm btn-outline-primary col', print: 'bodyright', size: 'col-md-12', },
      { headerName: 'Activity', field: 'display_name', type: 'showheader', tag: 'button', print: 'bodyright', size: 'col-md-12', class: 'btn btn-sm btn-outline-primary col-md-12' },
      { headerName: 'candidateProfile', field: 'candidate_name', type: 'iconimagesmall', iconname: 'Resume.svg', style: 'font-weight: bold; font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft', size: 'col-md-3' },
      // { headerName: 'Document Valut', field: 'ajid', type: 'iconimagesmall', iconname: 'document.svg', style: 'font-weight: bold; font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft', size: 'col-md-3' },
  
  
    ];
    coldef = [];
  
  
    ngOnInit() {
      this.db.checkLoginOrNot();
  
      this.startdatefilter.setDate(this.enddatefilter.getDate() - 2265);
  
      this.myjobid = this.route.snapshot.paramMap.get('job_id');
      // const jobitem = JSON.parse(this.route.snapshot.paramMap.get('job_id'));
  
      const job_id = this.route.snapshot.paramMap.get('job_id');
  
      const mainprocess = 'My Candidates';
  
      const childprocess = this.route.snapshot.paramMap.get('jobstatus');
  
      this.candidatesearch = this.route.snapshot.paramMap.get('candidate_name');
      // this.bindJob(jobid);
  
      // this.StartIndex = this.route.snapshot.paramMap.get('startIndex');
      // this.EndIndex = this.route.snapshot.paramMap.get('EndIndex');
      this.setpage = this.route.snapshot.paramMap.get('setpage');
      this.filterdrbytab(mainprocess, childprocess, job_id);
  
  
      const item = this.route.snapshot.paramMap.get('item');
      const Obj = JSON.parse(this.route.snapshot.paramMap.get('item'));
  
    }
  
    @Input()
    set _header(_header: any) {
      if (isArray(_header)) {
  
        this.header = _header;
  
        // this.pager = this.db.getPager(this._data.length);
  
      }
    }
    filterdrbytabs(mainprocess?, childprocess?, job_id?): void {
  
      this.filterdrbytab(mainprocess, childprocess, job_id);
  
      this.router.navigate(['job-candidate', { job_id, jobstatus: childprocess }]);
    }
  
    filterdrbytab(mainprocess?, childprocess?, job_id?): void {
  
  
  
  
      $('#activetaball').css('background-color', 'transparent');
      $('#activetabur').css('background-color', 'transparent');
      $('#activetabIP').css('background-color', 'transparent');
      $('#activetabisinterview').css('background-color', 'transparent');
      $('#activetabselected').css('background-color', 'transparent');
      $('#activetabRejected').css('background-color', 'transparent');
  
      if (childprocess === 'all') {
        $('#activetaball').css('background-color', 'skyblue');
      } else if (childprocess === 'Under Review') {
        $('#activetabur').css('background-color', 'skyblue');
      } else if (childprocess === 'In Process') {
        $('#activetabIP').css('background-color', 'skyblue');
      } else if (childprocess === 'isinterview') {
        $('#activetabisinterview').css('background-color', 'skyblue');
      } else if (childprocess === 'Selected') {
        $('#activetabselected').css('background-color', 'skyblue');
      } else if (childprocess === 'Rejected') {
        $('#activetabRejected').css('background-color', 'skyblue');
      }
  
      this.isinterview = 9;
      if (childprocess === 'isinterview') {
        childprocess = 'all';
        this.isinterview = 1;
      }
  
  
      // this.jobitemselected = job_id;
      if (mainprocess == null) {
        mainprocess = this.mainprocessnewvar;
      }
      if (childprocess == null) {
        childprocess = this.childprocessnewvar;
      }
      this.mainprocessnewvar = mainprocess;
      this.childprocessnewvar = childprocess;
      this.gridheader = childprocess;
      if (job_id != null) {
        this.selectedjob = job_id;
  
  
        // this.selectedjoball = jobitem.allcandidate;
        // this.selectedjobunderreview = jobitem.underreview;
        // this.selectedjobinprocess = jobitem.inprocess;
        // this.selectedjobselectedcandidate = jobitem.selectedcandidate;
        // this.selectedjobrejected = jobitem.rejected;
        // this.selectedjobininterview = jobitem.candidates_interview_count;
      }
      this.process = childprocess;
      if (mainprocess === 'My Referrals') {
        this.mainprocess = 1;
        //            $('#1b .nav li').removeClass('active');
        //            $('#1b .nav li').eq(0).addClass('active');
      } else {
        //            $('#2b .nav li').removeClass('active');
        //            $('#2b .nav li').eq(0).addClass('active');
        this.mainprocess = 0;
      }
  
      this.filterbyJob();
    }
  
  
  
  
  
    filterbyJob(): void {
  
      this.loadCandidate();
  
      this.ShowCandidates = true;
    }
  
    loadCandidate = function () {
  
  
      if (this.searchcandidatetext == undefined) {
        this.searchcandidatetext = '';
      }
      if (this.searchcandidate == undefined) {
        this.searchcandidate = '';
      }
      let start_date = '';
      if (this.startdatefilter == undefined) {
        start_date = '2000-01-01';
      } else {
        start_date = this.db.toYYMMDDTT(this.startdatefilter);
      }
  
      let end_date = '';
      if (this.enddatefilter == undefined) {
        end_date = '';
      } else {
        end_date = this.db.toYYMMDDTT(this.enddatefilter)
          ;
      }
      if (this.show_all_jobs === false) {
        let SelectedJob = '';
        if (this.isfirstload !== 1) {
          SelectedJob = this.db.SelectedCheckboxWithComma(this.jobslist);
        } else {
          SelectedJob = this.selectedjob;
        }
        SelectedJob = this.selectedjob;
        // const totalrow = this.selectednodes;
        // SelectedJob = this.db.SelectedWithComma(totalrow, 'id');
        this.db.globaljobid = SelectedJob;
        if (this.mainprocess === undefined) {
          this.mainprocess = '';
        }
        if (this.process === undefined) {
          this.process = '';
        }
  
        const Search = {
          filterdropdown: this.filterdropdown,
          process: this.process,
          mainprocess: this.mainprocess,
          searchcandidatetext: this.searchcandidatetext,
          selectedjob: SelectedJob,
          candidate: this.searchcandidate,
          showallcandidate: 0,
          start_date: '',
          end_date: '',
          isinterview: '',
          startindex: '',
          endindex: ''
  
        };
  
        if (this.isinterview !== undefined) {
          Search.isinterview = this.isinterview;
        }
  
  
        Search.startindex = this.limitstartIndex;
        Search.endindex = this.limitendIndex;
        this.rowData = [];
        // console.log(Search);
  
        this.db.list('job/candidates/', Search, ((response): void => {
  
          this.candidatedetails = response;
  
  
          this.rowData = response;
  
          this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
            return this.candidatedetails;
          };
          this.candidateinpopup = response;
        }));
      } else {
  
        let SelectedJob = '';
        if (this.isfirstload !== 1) {
          SelectedJob = this.db.SelectedCheckboxWithComma(this.jobslist);
        } else {
          SelectedJob = this.selectedjob;
        }
        SelectedJob = this.selectedjob;
        // const totalrow = this.selectednodes;
        // SelectedJob = this.db.SelectedWithComma(totalrow, 'id');
        this.db.globaljobid = SelectedJob;
        if (this.mainprocess === undefined) {
          this.mainprocess = '';
        }
        if (this.process === undefined) {
          this.process = '';
        }
  
        const Search = {
          filterdropdown: this.filterdropdown,
          process: this.process,
          mainprocess: this.mainprocess,
          searchcandidatetext: this.searchcandidatetext,
          selectedjob: SelectedJob,
          candidate: this.searchcandidate,
          showallcandidate: 1,
          start_date: '',
          end_date: '',
          isinterview: '',
          startindex: '',
          endindex: ''
        };
  
        Search.startindex = this.limitstartIndex;
        Search.endindex = this.limitendIndex;
        if (this.isinterview !== undefined) {
          Search.isinterview = this.isinterview;
        }
        if (this.isinterview == 1) {
          Search.showallcandidate = 2;
        }
  
        this.rowData = [];
        // console.log(Search);
        this.db.list('job/candidates/', Search, ((response): void => {
  
  
          this.candidatedetails = response;
          this.rowData = response;
          this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
            return this.candidatedetails;
          };
          this.candidateinpopup = response;
        }));
      }
  
    };
  
  
  
  
  
  
    datfromprgrid(evt) {
  
      this.limitstartIndex = evt.startIndex;
      this.limitendIndex = evt.pageSize;
      this.loadCandidate();
  
    }
  
  
  
    OnRowclicked(evt) {
      
      switch (evt.headername) {
        case 'candidateProfile':
          const url = '/candidate/' + evt.fulldata.id;
          window.open(url, '_blank');
          break;
  
        case 'Candidate Status':
          this.comment(evt.fulldata);
          break;
        case 'Activity':
          this.activity(evt.fulldata);
          break;
        case "Document Valut":
          this.documentvalut(evt.fulldata);
  
      }
    }
    // setTab1(data){
  
    // }
    // setTab2(data){
  
    // }
    documentvalut(data) {
      
      this.db.list('Candidatedocuments/', { 'id': data.ajid }, ((response): void => {
        if (!response) {
          alert('No Document Found');
        } else {
          $('#showDocuments').appendTo('body').modal('toggle');
          
          this.documentsvaluts = response;
          $('#resumeview').attr('src',
            'https://chat.botshreyasi.com/media/docs/'
            + this.documentsvaluts.document);
        }
  
      }));
    }
  
  
  
    RecruiterResponse(data) {
  
    }
  
    submitcv(download): void {
  
      this.allids = this.db.idscheckbox;
  
      if (download) {
        this.downloadcv = false;
      } else {
        this.downloadcv = true;
      }
      this.db.list('tracker/', null, ((response): void => {
  
  
        try {
          this.trackerlist = response;
          if (this.downloadcv) {
            $('#downloadtracker').appendTo('body').modal('toggle');
          } else {
            $('#myModal').appendTo('body').modal('toggle');
          }
        } catch (e) {
  
        }
  
      }));
    }
  
    extractDatas(getdata) {
      this.Getdownloadcandidatedata = [];
      for (var i = 0; i < this.db.idscheckbox?.length; i++) {
        let id = this.rowData.map(e => e.id).indexOf(this.db.idscheckbox[i]);
        this.Getdownloadcandidatedata.push(this.rowData[id]);
      }
      
      var ids = [];
      for (var i = 0; i < this.Getdownloadcandidatedata?.length; i++) {
        ids.push(this.Getdownloadcandidatedata[i][getdata]);
      }
      return ids;
    }
  
    sendtrackerdata(download): void {
  
      if (this.db.idscheckbox.length > 0) {
        const allrow = this.extractDatas('ajid');
        if (allrow.length === 0) {
          this.db.showMessage('Please select candidates');
          return;
        }
  
        const atjid = allrow.toString();
  
        this.sendtrackermsg(download, atjid);
      } else {
        this.db.showMessage('Please select candidates');
  
      }
    }
  
    sendtrackermsg(download, atjid): void {
  
      if (download) {
        this.download = true;
      } else {
        this.download = false;
      }
      $('#uploadresumesss').modal('hide');
      if (this.db.idscheckbox.length > 0) {
  
        // this.ids
        // const allrow = this.db.extractIDsData(this.db.ajids, 'ajid');
        // //const allrow = this.db.ids.ajid;
  
        // if (allrow.length === 0) {
        //   this.db.showMessage('Please select candidates');
        //   return;
        // }
        this.sendtracker.atjids = atjid; // allrow.toString();
        if (this.download) {
          this.sendtracker.download = true;
        } else {
          this.sendtracker.download = false;
        }
        this.db.store('sendtracker', this.sendtracker, ((r): void => {
          
          if (this.download) {
  
            if (r.No_Cv != undefined) {
              this.nocv = r.No_Cv;
              this.resumesupload = r.data;
              this.withoutcv = [];
              for (const k in this.resumesupload) {
                this.withoutcv.push(this.resumesupload[k].addtojob_id);
              }
              $('#uploadresumesss').appendTo('body').modal('show');
  
            } else {
              const resumes = r.resumes;
              let resumehtml = '';
              if (resumes.length > 0) {
                resumehtml = '</br> <h3>Resume List</h3> <div class="list-group">';
                for (const k in resumes) {
                  if (resumes[k]) {
                    resumehtml += '<a target="_blank" class="list-group-item" href="https://api.passivereferral.com/resumes/' + resumes[k].resume + '">' + resumes[k].name + '</a>';
                  }
                }
                resumehtml += '</div>';
              }
              this.db.showDialog(`Your excel is ready.<a href="https://api.passivereferral.com/trackers/`
                + r.excel
                + `">Click Here</a> to Download ` + resumehtml, 'Message');
  
            }
          } else {
  
            if (r.No_Cv != undefined) {
              this.nocv = r.No_Cv;
              this.resumesupload = r.data;
              this.withoutcv = [];
              for (const k in this.resumesupload) {
                this.withoutcv.push(this.resumesupload[k].addtojob_id);
              }
              $('#uploadresumesss').appendTo('body').modal('show');
  
            } else {
              this.db.addmessageandremove('tracker sent');
            }
          }
  
        }),
          ((r): void => {
  
            if (r.errormsg !== undefined) {
              this.db.addmessageandremove(r.errormsg);
            }//  else {
            //   this.db.addmessageandremove('Some error occured');
            // }
          }));
      } else {
        this.db.addmessageandremove('Please Select CV');
      }
    }
    Skipcandidate(download): void {
  
      const selectedcandidate = this.db.extractIDsData(this.db.ajids, 'ajid');
      const withoutresume = this.withoutcv;
      const withresume = selectedcandidate.filter(function (obj) { return withoutresume.indexOf(obj) == -1; });
  
  
      if (withresume.length === 0) {
        this.db.showMessage('Can\'t Send Empty Email');
        return;
      }
      const atjid = withresume.toString();
      this.sendtrackermsg(download, atjid);
      // withresume
    }
  
  
    uploadresume(files: FileList, updateid) {
      // alert('hii');
  
      const fileToUpload: any[] = [];
      fileToUpload.push({ filekey: 'resume', file: files.item(0) });
      this.db.storeupload('candidatedetail/update/' + updateid, null, (re) => {
        this.db.showNotification('Resume Uploaded');
        $('#uploadresume').modal('hide');
      }, (re) => {
        this.db.showNotification('uploaded'); $('#uploadresume').modal('hide');
      }, null, fileToUpload);
    }
  
  
    submit_cv_to_panel_status(): void {
  
      this.db.list('submit_cv_to_panel_status', {}, ((response): void => {
  
        this.cv_to_panel = { status: response };
        $('#submit_cv_to_panel_status').appendTo('body').modal('show');
  
      }), ((response): void => {
        if (response.msg) {
          alert(response.msg);
        }
      }));
  
    }
  
    sendCvToPanel(test): void {
      // if (!$('.validate').validate('#submit_cv_to_panel_status')) {
      //   //  $.fn.showMessage('Please fill values');
      //   return;
      // }
  
      const allrow = this.db.extractIDsData(this.db.ajids, 'ajid');
  
      if (allrow.length === 0) {
        this.db.showMessage('Please select candidates');
        return;
      }
  
      if (allrow.length === 0) {
        this.db.showMessage('Please select candidate to send to panel.');
      } else {
        this.cv_to_panel.allrow = allrow;
        this.db.store('sendtopanelcvemail', this.cv_to_panel, ((response) => {
          if (response.msg) {
            this.db.showMessage(response.msg);
          } else {
  
            for (const k in allrow) {
              if (allrow[k]) {
                this.ajid = allrow[k];
                this.commentstatus = {
                  ajid: parseInt(allrow[k], 0),
                  comment: this.cv_to_panel.comment,
                  status: this.cv_to_panel.status,
                };
  
                this.updatestatuscommentmyjob(false);
                this.db.addmessageandremove('Cv Submitted to panel.');
              }
  
            }
          }
        }), ((response): void => {
          this.db.showMessage('Try again.');
        })
        );
      }
  
    }
  
  
  
  
    updatestatuscommentmyjob = function (showpopup) {
  
      if (typeof showpopup === 'undefined') {
        showpopup = true;
      }
      if (this.commentstatus.date) {
        this.commentstatus.ajid = this.ajid;
        this.commentstatus.date = this.db.toYYMMDD(this.commentstatus.date);
      } else {
        this.commentstatus.ajid = this.ajid;
        // this.commentstatus.date = this.db.toYYMMDD(this.commentstatus.date);
      }
      // this.commentstatus.recruiterid=this.recruiterid;
      this.db.store('csr/', this.commentstatus, ((response): void => {
        $('#commentstatus').modal('hide');
        this.filterdrbytab();
        this.commentstatus = {};
  
  
        this.cancel();
        if (showpopup) {
          this.db.showMessage('Status changed successfully.');
        }
      }), ((response): void => {
        if (showpopup) {
          this.db.ShowPopUp('Please try again.');
        }
  
      })); this.loadCandidate();
    };
    openmodal(modalname) {
  
      $(modalname).appendTo('body').modal('show');
  
    }
  
    datafromprgridbuttondetails(evt) {
      for (const key1 in evt.buttondetails1) {
        {
  
          switch (evt.buttondetails1[key1].key) {
            case 'more':
              const url = this.router.serializeUrl(
                this.router.createUrlTree(['candidateDetails',]));
              window.open(url, '_blank');
  
              this.coldef.push({ data: evt.data, data_action_type: evt.buttondetails1[key1], data_root: evt.data.display_name });
  
  
              break;
            case 'Source':
  
              this.coldef.push({ data: evt.data, data_action_type: evt.buttondetails1[key1], data_root: evt.data.display_name });
  
  
              this.comment(evt.data);
  
              break;
            case 'Activity':
  
              this.activity(evt.data);
  
              this.coldef.push({ data: evt.data, data_action_type: evt.buttondetails1[key1], data_root: evt.data.display_name });
  
              break;
          }
        }
      }
    }
    comment(row): void {
  
      row.tempdate = new Date().getMilliseconds();
      this.comments = '';
      this.comments = row;
  
      $('#commentstatus').appendTo('body').modal('show');
  
    }
  
    public activity(data: any) {
  
      this.db.show('job/activity/', data.ajid, (response): void => {
  
  
        this.activities = response;
  
        //  this.rowdata.emit(this.activities);
  
        //  $('#activity').appendTo('body').modal('show');
        // jQuery.noConflict();
        $('#activity').appendTo('body').modal('show');
  
  
      });
  
  
    }
  
    emitdata(evt) {
      // alert(JSON.stringify(evt));
    }
  }
  

