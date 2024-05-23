import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignCreateRoutingModule } from './campaign-create-routing.module';
import { CampaignCreateComponent } from './campaign-create.component';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    CampaignCreateComponent
  ],
  imports: [
    CommonModule,
    CampaignCreateRoutingModule,
    ComponentsModule, FormsModule, MatButtonToggleModule, CKEditorModule, MatSelectModule, MatFormFieldModule, MatInputModule
  ]
})
export class CampaignCreateModule { }
