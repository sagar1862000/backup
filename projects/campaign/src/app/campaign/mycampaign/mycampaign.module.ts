import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MycampaignRoutingModule } from './mycampaign-routing.module';
import { MycampaignComponent } from './mycampaign.component';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MycampaignComponent
  ],
  imports: [
    CommonModule,
    MycampaignRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class MycampaignModule { }
