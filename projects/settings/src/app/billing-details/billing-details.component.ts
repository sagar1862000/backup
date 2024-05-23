import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})

export class BillingDetailsComponent implements OnInit {
  billingdetail: any;
  bonuscandidate: any;
  profiletoken: string;
  currentPage = 0;
  pageSize = 10;
  showcols = [];
  Bonuscandidate: any;
  p: any;
  // d:any;
  hidecols = [];
  pager: any;
  pagesize: any;
  check_selected: boolean;
  pagechanged: boolean;
  pageno: number;
  _data: any;
  collection = [];
  counbalance: any;
  itemPerPage: any;
  gridcount: any;

  item: any;

  totalcandidates: any;
  constructor(public db: DbService, private router: Router) {

    for (let i = 1; i <= 200; i++) {

      const obj = { 'Added Credits': 'added_credits${i}', PreviousCredits: 'previous_credites${i}', 'Current Avialable Credits': 'current_avialable_credits${i}', 'Bonus Credits': 'bonus_credits${i}', 'Balance Credits': 'balance_credites${i}' };
      this.collection.push(obj);
    }

  }

  countbalance(): void {
    // this.isLoadingJobs = true;
    this.db.list('getbalancedashboard/', {}, ((response): void => {
      this.counbalance = response;
    })
    );
  }

  ngOnInit() {

    this.db.checkLoginOrNot();
    
    this.loadbillingdata();
  }

  loadbillingdata(): void {
    
    this.db.list('billingdetaillist/', null, ((response): void => {

      this.billingdetail = response;

    }));
  }

  GetBonusCandidate(month): void {

    this.db.list('bonuscandidate/', { months: month }, ((response): void => {

      $('#candidatesdatas').appendTo('body').modal('show');

      this.bonuscandidate = response;

    }));
  }


}