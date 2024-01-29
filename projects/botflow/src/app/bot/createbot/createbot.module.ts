import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatebotRoutingModule } from './createbot-routing.module';
import { CreatebotComponent } from './createbot.component';

import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CreatebotComponent
  ],
  imports: [
    CommonModule,
    CreatebotRoutingModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CKEditorModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule
  ]
})
export class CreatebotModule { }
