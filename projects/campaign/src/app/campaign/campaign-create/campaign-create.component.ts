import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DbService } from 'src/app/services/db.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss']
})

export class CampaignCreateComponent implements OnInit {
  campaign: any = { campaign_name: '', Published: 'No'};
  public Editor = ClassicEditor;
storedata: any;
  constructor(private db: DbService, public router: Router, private location: Location) { }

  ngOnInit(): void {
  }



  launchflow(){

    this.db.store('campaign/campaign/', this.campaign, (response): void => {

      this.storedata = response;

      this.router.navigate(['campaign/flow/' + btoa(response.id), {}]);

    });



  }

  onclickcampaigncreate()
  {
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
