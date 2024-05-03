import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgridComponent } from 'projects/grid/src/app/grid/prgrid/prgrid.component';

import { MycampaignRoutingModule } from './mycampaign-routing.module';
import { MycampaignComponent } from './mycampaign.component';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { GridModule } from '../../../../../projects/grid/src/app/grid/grid.module'
import { GridModule } from 'projects/grid/src/app/grid/grid.module';
@NgModule({
  declarations: [
    MycampaignComponent,
    // PrgridComponent
  ],
  imports: [
    CommonModule,
    MycampaignRoutingModule,
    ComponentsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    GridModule
  ]
})
export class MycampaignModule { }
