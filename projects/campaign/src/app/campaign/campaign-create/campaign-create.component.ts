import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DbService } from 'src/app/services/db.service';
import { Location } from '@angular/common';
import {  Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss']
})

export class CampaignCreateComponent implements OnInit {
  campaign: any = { campaign_name: '', Published: 'No'};
  public Editor = ClassicEditor;

storedata: any;
  constructor(private db: DbService, public router: Router, private location: Location,private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // this.checkOverflow();
  }
  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   this.checkOverflow();
  // }
  
  // private checkOverflow() {
  //   const body = this.renderer.selectRootElement('body');
  
  //   if (body.scrollHeight > window.innerHeight) {
  //     this.renderer.addClass(body, 'overflow-hidden');
  //   } else {
  //     this.renderer.removeClass(body, 'overflow-hidden');
  //   }
  // }


  launchflow(){

    // this.db.store('campaign/campaign/', this.campaign, (response): void => {

    //   this.storedata = response;

    //   this.router.navigate(['campaign/flow/' + btoa(response.id), {}]);

    // });


    this.db.store('camapign_details', this.campaign, (response): void => {

      this.storedata = response;

      this.router.navigate(['campaign/flow/' + btoa(response.id), {}]);

    });
  }

  onclickcampaigncreate()
  {
    console.log('campiagn');
    this.db.store('campaign/campaign/', this.campaign, (response): void => {

      // this.router.navigate(['campaign/flow/' + response.id , {}]);
  });

}

onclickSaveAndClose()
{
  this.db.store('campaign/campaign/', this.campaign, (response): void => {

    this.router.navigate(['campaign/flow/' + response.id , {}]);
});

  this.location.back();
}

onclickcancel()
{
  this.location.back();
}

}
