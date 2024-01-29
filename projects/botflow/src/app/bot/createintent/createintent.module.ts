import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateintentRoutingModule } from './createintent-routing.module';
import { CreateintentComponent } from './createintent.component';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from '../../../../../component/src/app/components/components.module';
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    CreateintentComponent
  ],
  imports: [
    CommonModule,
    CreateintentRoutingModule,
    MatInputModule,
    FormsModule, ReactiveFormsModule ,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ComponentsModule,
    MatButtonModule
  ]
})
export class CreateintentModule { }
