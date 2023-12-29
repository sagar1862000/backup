import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';



@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.scss']
})
export class HeadbarComponent implements OnInit, OnDestroy {

  @Input() collapsed = false;

  @Input() screenWidth = 0;


  private routerSubscription: Subscription; 

  activePath: string = '';
  currentUrlEndPoint: string = ''

  constructor(public db: DbService, private router: Router) {

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url;
        // console.log(this.router.url);
        // console.log(window.location.pathname);
        this.currentUrlEndPoint = window.location.pathname;
        this.makeHeaderName()
      }
    });

  }

  pageTitle = ''
  makeHeaderName() {
    switch (this.currentUrlEndPoint) {
      case '/dashboard':
        this.pageTitle = 'Dashboard'
        break;
      case '/history':
        this.pageTitle = 'History'
        break;
      case '/internaldatabase':
        this.pageTitle = 'Internal Database'
        break;
      case '/call-detail':
        this.pageTitle = 'Call Details'
        break;
      case '/managerole':
        this.pageTitle = 'User Management'
        break;
      case '/managerole/permissions':
        this.pageTitle = 'Create Areas'
        break;
      case '/managerole/create-user-roles':
        this.pageTitle = 'Create User Roles'
        break;
      case '/managerole/create-permission':
        this.pageTitle = 'Create Permissions'
        break;
      case '/candidate-status':
        this.pageTitle = 'Candidate Status'
        break;
      case '/candidate-status/add-candidate':
        this.pageTitle = 'Add Candidates'
        break;
      case '/candidate-status/build-status-relation':
        this.pageTitle = 'Build Status Relation'
        break;
      case '/myjob':
        this.pageTitle = 'My Jobs'
        break;
      case '/new-job':
        this.pageTitle = 'New Jobs'
        break;
      case '/call_detail_report':
        this.pageTitle = 'Candidte Call Reports'
        break;
      case '/recent-activity':
        this.pageTitle = 'Recent Activity'
        break;
      case '/billing-detail':
        this.pageTitle = 'Billing Activity'
        break;
      case '/billing-detail':
        this.pageTitle = 'Billing Activity'
        break;
      case '/department':
        this.pageTitle = 'Departments'
        break;
      case '/agency':
        this.pageTitle = 'Agencies'
        break;
      case '/tracker':
        this.pageTitle = 'Tracker Fields'
        break;
      case '/new-trackers':
        this.pageTitle = 'Add New Tracker'
        break;
      case '/user-profile':
        this.pageTitle = 'Profile'
        break;

      default:
        this.pageTitle = ''
        break;
    }
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }


  getHeadClass() {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    }
    else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }



  iscomputerMenu() {
    if (window.innerWidth < 991) {
      return false;
    }
    return true;
  }

  

  openmodal(modalname) {


    // $(modalname).appendTo('body').modal('show');

  }


}
