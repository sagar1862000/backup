import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateactionRoutingModule } from './createaction-routing.module';
import { CreateactionComponent } from './createaction.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CreateactionComponent
  ],
  imports: [
    CommonModule,
    CreateactionRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateactionModule { }
