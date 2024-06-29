import { Component, OnInit } from '@angular/core';
// import { NodeService } from './campaign.service';
import { jsPlumb } from 'jsplumb';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})

export class CampaignComponent implements OnInit {
  nodes = [];
  connections = [];

  constructor() {

  }

  ngOnInit(): void {
    $('app-footer').hide();
  }

}

