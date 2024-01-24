import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { MycampaignComponent } from './mycampaign/mycampaign.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CampaignComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    CampaignRoutingModule,
    MatExpansionModule, MatSelectModule, MatInputModule, FormsModule, MatIconModule, MatCheckboxModule,
    MatSlideToggleModule, MatCardModule, MatButtonToggleModule, CKEditorModule,
    MatDatepickerModule,
    ReactiveFormsModule, MatFormFieldModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatProgressBarModule, MatRadioModule, MatTabsModule,
    MatAutocompleteModule, MatChipsModule,
    MatMenuModule, MatDialogModule, ComponentsModule, DragDropModule,


  ]
})
export class CampaignModule { }
