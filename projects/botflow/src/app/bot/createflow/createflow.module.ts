import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateflowRoutingModule } from './createflow-routing.module';
import { CreateflowComponent } from './createflow.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ComponentsModule } from '../../../../../component/src/app/components/components.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CreateflowComponent
  ],
  imports: [
    CommonModule,
    CreateflowRoutingModule,
    FormsModule, ReactiveFormsModule ,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    ComponentsModule,
    MatInputModule
  ]
})
export class CreateflowModule { }
