import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignFlowRoutingModule } from './campaign-flow-routing.module';
import { CampaignFlowComponent } from './campaign-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    CampaignFlowComponent, 
  ],
  imports: [
    CommonModule,
    CampaignFlowRoutingModule,
    CommonModule, FormsModule, MatButtonToggleModule, CKEditorModule, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatIconModule, ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule  
  ],
  providers:[DialogConfig]
})
export class CampaignFlowModule { }
